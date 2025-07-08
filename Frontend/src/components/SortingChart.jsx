import { useContext, useEffect, useState } from "react";
import { SortingContext } from "../contexts/SortingContext.jsx";
import algorithmInfos from "../data/algorithmInfos.js";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";


function SortingChart() {
    const { sortingState, generateSortingArray, startVisualizing, changeSortingSpeed, changeAlgorithm } = useContext(SortingContext);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        generateSortingArray();
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark:bg-carbon", "dark:text-white");
            document.body.classList.remove("bg-gray-50", "text-slate-800");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark:bg-carbon", "dark:text-white");
            document.body.classList.add("bg-gray-50", "text-slate-800");
        }
    }, [isDark]);

    return (
        <div className="mt-4 mb-4 flex flex-col items-center px-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="AlgoViz Logo" className="h-12 w-12 object-contain" />
                    <h1 className="text-3xl sm:text-5xl font-semibold tracking-wide text-slate-800 dark:text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        Sorting Algorithm Visualizer
                    </h1>
                </div>
                <button
    onClick={() => setIsDark(!isDark)}
    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition mx-4"
    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
>
    {isDark ? (
        <SunIcon className="h-6 w-6" />
    ) : (
        <MoonIcon className="h-6 w-6" />
    )}
</button>

            </div>

            {/* Algorithm Buttons */}
            <div className="flex flex-wrap justify-center gap-3 my-6">
                {["bubble_sort", "insertion_sort", "selection_sort", "merge_sort", "quick_sort", "radix_sort"].map((algo) => (
                    <button
                        key={algo}
                        onClick={() => changeAlgorithm(algo)}
                        className={`bg-carbon text-white px-5 py-3 rounded-3xl transition-all ${sortingState.algorithm === algo ? "bg-turquoise-dark" : "hover:bg-carbon-light"}`}
                    >
                        {algo.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                    </button>
                ))}
            </div>

            {/* Sorting Visual */}
            <div className="max-w-3xl w-full">
                <div className="mb-4 chart-container">
                    <div className="base"></div>
                    {sortingState.array.map((bar, i) => (
                        <div key={i} className="bar-container">
                            <div
                                className={`select-none bar bar-${bar.state}`}
                                style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}
                            >
                                <p className={`pl-1.5 ${bar.state === "idle" ? "text-white" : "text-white"}`}>{bar.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 max-w-3xl mb-8">
                    <button
                        disabled={sortingState.sorting}
                        onClick={startVisualizing}
                        className="px-4 py-2 push-btn text-white-light disabled:brightness-75"
                    >
                        Start
                    </button>
                    <button
                        disabled={sortingState.sorting}
                        onClick={() => generateSortingArray()}
                        className="text-gray-700 dark:text-white-light disabled:brightness-75"
                    >
                        New Array
                    </button>
                    <select
                        disabled={sortingState.sorting}
                        onChange={changeSortingSpeed}
                        defaultValue="slow"
                        className="ml-auto bg-gray-200 dark:bg-carbon px-2 py-2 rounded-md cursor-pointer outline-none focus:ring ring-turquoise-dark disabled:brightness-75 disabled:cursor-default"
                    >
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                    </select>
                </div>

                <div className="w-full h-0.5 bg-carbon-light mb-4" />

                {/* Info Table */}
                <div>
                    <h1 className="font-bold text-2xl md:text-4xl text-slate-800 dark:text-white">{algorithmInfos[sortingState.algorithm].name}</h1>
                    <p className="whitespace-pre-line mb-6 text-slate-600 dark:text-white-light">{algorithmInfos[sortingState.algorithm].description}</p>
                    <div className="w-full h-0.5 bg-carbon-light mb-6" />
                    <div className="overflow-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 border-r border-carbon-light" rowSpan={2}>Algorithm</th>
                                    <th className="px-4 border-r border-carbon-light" colSpan={3}>Time Complexity</th>
                                    <th className="px-4">Space Complexity</th>
                                </tr>
                                <tr className="border-b border-carbon-light">
                                    <th className="px-4 pb-2">Best</th>
                                    <th className="px-4 pb-2">Average</th>
                                    <th className="px-4 pb-2 border-r border-carbon-light">Worst</th>
                                    <th className="px-4 pb-2">Worst</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(algorithmInfos).map((key, i) => (
                                    <tr key={i} className="hover:bg-carbon-light whitespace-nowrap">
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light`}>{algorithmInfos[key].name}</td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].time_complexity.best[1]}`}>{algorithmInfos[key].time_complexity.best[0]}</span></td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].time_complexity.average[1]}`}>{algorithmInfos[key].time_complexity.average[0]}</span></td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].time_complexity.worst[1]}`}>{algorithmInfos[key].time_complexity.worst[0]}</span></td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].space_complexity[1]}`}>{algorithmInfos[key].space_complexity[0]}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortingChart;
