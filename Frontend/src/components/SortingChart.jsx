import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { SortingContext } from "../contexts/SortingContext.jsx";
import algorithmInfos from "../data/algorithmInfos.js";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import AppHeader from "./AppHeader";

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />

function SortingChart() {
    const { sortingState, generateSortingArray, startVisualizing, changeSortingSpeed, changeAlgorithm } = useContext(SortingContext);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        generateSortingArray();
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark");
            document.body.classList.remove("bg-gray-50", "text-slate-800");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark");
            document.body.classList.add("bg-gray-50", "text-slate-800");
        }
    }, [isDark]);

    return (
        <div className="mt-4 mb-4 flex flex-col items-center">
            {/* Header */}
            <AppHeader isDark={isDark} setIsDark={setIsDark} />
            <hr className="w-full border-t border-gray-300 dark:border-gray-600 my-4" />

            <div className="flex flex-col items-left mb-4">
                <ul className="list-disc list-inside flex flex-col gap-2 text-gray-600 dark:text-white-light text-left">
                    <li>Sorting a large amount of data can take a substantial amount of computing resources and time if we use an inefficient algorithm to sort.</li>
                    <li>The efficiency of the algorithm is proportional to the number of items to be sorted.</li>
                    <li>For a small amount of data, a complex sorting method may be more trouble than it is worth.</li>
                    <li>On the other hand, for larger amounts of data, we want to increase the efficiency and speed as far as possible.</li>
                </ul>
               <br />
                
                <div className="w-full mx-auto rounded-lg overflow-hidden border-2 border-turquoise-dark shadow-lg">
                <img 
                src="/pp.png" 
                alt="Sorting Illustration" 
                className="w-full h-full object-cover transition-transform hover:scale-105" />
                            
                            </div>
                        </div>
     <p className="text-center text-gray-600 dark:text-white-light mt-4">
                    We will now discuss the several sorting techniques and compare them with respect to their time complexity.
                </p><br />

            {/* Algorithm Buttons */}
            <div className="flex flex-wrap justify-center gap-3 my-6">
                {["bubble_sort", "insertion_sort", "selection_sort", "merge_sort", "quick_sort", "bucket_sort"].map((algo) => (
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
                        <div key={i} className="bar-container flex flex-col items-center">
                            <p className="mb-1 text-xs font-bold text-slate-700 dark:text-white">{bar.value}</p>
                            <div
                                className={`select-none bar bar-${bar.state} w-full`}
                                style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}
                            />
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
                    <h1 className="font-bold text-2xl md:text-4xl text-slate-800 dark:text-white 
    tracking-wide uppercase border-b-4 border-turquoise-dark dark:border-cyan-400 
    pb-2 mb-6 text-center drop-shadow-sm">{algorithmInfos[sortingState.algorithm].name}</h1>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-4 tracking-wide border-l-4 border-turquoise-dark dark:border-cyan-400 pl-3">Definition</h2>
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
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light font-semibold tracking-wide text-gray-900 dark:text-white`}
  style={{ fontFamily: "'Inter', sans-serif" }}>{algorithmInfos[key].name}</td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].time_complexity.best[1]}`}>{algorithmInfos[key].time_complexity.best[0]}</span></td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].time_complexity.average[1]}`}>{algorithmInfos[key].time_complexity.average[0]}</span></td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].time_complexity.worst[1]}`}>{algorithmInfos[key].time_complexity.worst[0]}</span></td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}><span className={`px-1.5 py-0.5 rounded-md bg-${algorithmInfos[key].space_complexity[1]}`}>{algorithmInfos[key].space_complexity[0]}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                       </div>
                       <div className="flex justify-center ">
                        <Link to="/PracticePage">
                            
                           <button
                                    className="
                                        px-8 py-3
                                        bg-gradient-to-r from-blue-600 to-cyan-500
                                        text-white font-semibold
                                        rounded-full
                                        shadow-lg
                                        hover:from-blue-700 hover:to-cyan-600
                                        focus:outline-none focus:ring-4 focus:ring-cyan-300
                                        transition
                                        duration-300
                                        ease-in-out
                                        transform
                                        hover:scale-105
                                    "
                                    >  Go to Practice Page
                            </button>
                              </Link>
                            </div>
                    </div>
            </div>
            

        </div>
    );
}

export default SortingChart;
