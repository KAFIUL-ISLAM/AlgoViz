import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { SortingContext } from "../contexts/SortingContext.jsx";
import algorithmInfos from "../data/algorithmInfos.js";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

function SortingChart() {
  console.log("Rendering SortingChart");
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    sortingState,
    generateSortingArray,
    startVisualizing,
    stopVisualizing,
    changeSortingSpeed,
    changeAlgorithm,
  } = useContext(SortingContext);

  console.log("sortingState:", sortingState);

  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage, default to false if not set
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  // Generate initial array on mount
  useEffect(() => {
    generateSortingArray();
  }, []);

  // Dark mode toggle effect
  useEffect(() => {
    // Update localStorage when dark mode changes
    localStorage.setItem("darkMode", isDark);

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

  // Handle Practice button click
  const handlePracticeClick = () => {
    if (user) {
      navigate("/PracticePage");
    } else {
      const goSignup = window.confirm(
        "You need to be logged in to access the Practice Page. Do you want to sign up now?"
      );
      if (goSignup) {
        navigate("/signup");
      }
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      {/* Header */}
      <AppHeader isDark={isDark} setIsDark={setIsDark} />
      <hr className="w-full border-t border-gray-300 dark:border-gray-600 my-4" />

      <h2 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Understanding Sorting Algorithms
      </h2>
      <div className="flex flex-col items-center mb-4">
        {/* Hero Section */}
        <div className="w-full max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-6 flex flex-col justify-center h-full">
              <div className="space-y-4">
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">
                      Sorting a large amount of data can take a substantial
                      amount of computing resources and time if we use an
                      inefficient algorithm to sort.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">
                      The efficiency of the algorithm is proportional to the
                      number of items to be sorted.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">
                      For a small amount of data, a complex sorting method may
                      be more trouble than it is worth.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span className="leading-relaxed">
                      On the other hand, for larger amounts of data, we want to
                      increase the efficiency and speed as far as possible.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative lg:pl-8 lg:py-10 flex justify-center">
              <div
                className="relative overflow-hidden rounded-xl shadow-2xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 transform scale-125 hover:scale-145 transition-all duration-500 ease-out hover:shadow-3xl"
                style={{ height: "240px", width: "90%" }}
              >
                <img
                  src="/pp.png"
                  alt="Sorting Illustration"
                  className="w-50 h-50 object-cover transition-all duration-500 hover:scale-200 hover:brightness-110 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent hover:from-black/5 transition-all duration-500"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/20 rounded-full blur-xl transition-all duration-500 hover:w-36 hover:h-36 hover:bg-blue-500/35"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-cyan-500/20 rounded-full blur-xl transition-all duration-500 hover:w-40 hover:h-40 hover:bg-cyan-500/35"></div>
            </div>
          </div>

          <hr className="w-full border-t border-gray-300 dark:border-gray-600 mt-8 mb-4" />

          <div className="flex justify-center">
            <p className="text-md text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-2xl">
              We will now discuss the several sorting techniques and compare
              them with respect to their time complexity.
            </p>
          </div>
        </div>
      </div>

      {/* Algorithm Buttons */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {[
          "bubble_sort",
          "insertion_sort",
          "selection_sort",
          "merge_sort",
          "quick_sort",
          "bucket_sort",
        ].map((algo) => (
          <button
            key={algo}
            onClick={() => changeAlgorithm(algo)}
            className={`
              relative px-6 py-3 rounded-2xl font-semibold text-sm
              transition-all duration-300 ease-out transform
              backdrop-blur-sm border
              hover:scale-105 hover:shadow-xl active:scale-95
              ${
                sortingState.algorithm === algo
                  ? `
                      bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500
                      dark:from-cyan-500 dark:via-teal-400 dark:to-emerald-400
                      text-white shadow-lg shadow-cyan-500/25
                      border-cyan-400/50 dark:border-cyan-300/50
                      hover:from-cyan-700 hover:via-teal-600 hover:to-emerald-600
                      dark:hover:from-cyan-600 dark:hover:via-teal-500 dark:hover:to-emerald-500
                    `
                  : `
                      bg-gradient-to-r from-gray-100 via-white to-gray-100
                      dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
                      text-gray-800 dark:text-gray-200
                      border-gray-300/50 dark:border-gray-600/50
                      shadow-sm shadow-gray-500/10 dark:shadow-gray-900/20
                      hover:from-gray-50 hover:via-gray-100 hover:to-gray-50
                      dark:hover:from-gray-700 dark:hover:via-gray-600 dark:hover:to-gray-700
                      hover:border-gray-400/60 dark:hover:border-gray-500/60
                    `
              }
            `}
          >
            <span className="relative z-10">
              {algo.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
            {sortingState.algorithm === algo && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-600/20 to-emerald-500/20 dark:from-cyan-400/20 dark:to-emerald-300/20 blur-sm"></div>
            )}
          </button>
        ))}
      </div>

      {/* Sorting Visual */}
      <div className="max-w-4xl w-full px-4">
        <div className="mb-4 chart-container">
          <div className="base"></div>
          {sortingState.array.map((bar, i) => (
            <div key={i} className="bar-container flex flex-col items-center">
              <p className="mb-1 text-xs font-bold text-slate-700 dark:text-white">
                {bar.value}
              </p>
              <div
                className={`select-none bar bar-${bar.state} w-full`}
                style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 w-full mb-8">
          {/* Start/Stop Button */}
          <button
            onClick={() => {
              if (sortingState.sorting) {
                stopVisualizing();
              } else {
                startVisualizing();
              }
            }}
            disabled={sortingState.stopSort}
            className={`group relative px-6 py-3 rounded-xl font-semibold text-white 
              ${
                sortingState.sorting
                  ? "bg-gradient-to-br from-rose-500 to-red-500 dark:from-rose-400 dark:to-red-400"
                  : "bg-gradient-to-br from-cyan-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400"
              }
              shadow-lg hover:shadow-xl 
              transform hover:scale-105 transition-all duration-200
              border border-cyan-300/20 dark:border-cyan-300/30
              backdrop-blur-sm
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            <span className="relative z-10">
              {sortingState.sorting ? "Stop Sort" : "Start Sort"}
            </span>
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br 
                ${
                  sortingState.sorting
                    ? "from-rose-600 to-red-600"
                    : "from-cyan-600 to-emerald-600"
                }
                opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
            />
          </button>

          {/* New Array Button */}
          <button
            disabled={sortingState.sorting}
            onClick={generateSortingArray}
            className="font-medium
              text-slate-700 dark:text-white
              bg-transparent border-none shadow-none rounded-none
              hover:underline hover:scale-105 hover:bg-transparent
              cursor-pointer transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            New Array
          </button>

          {/* Speed Select */}
          <div className="ml-auto">
            <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">
              Speed
            </label>
            <select
              disabled={sortingState.sorting}
              onChange={changeSortingSpeed}
              defaultValue="normal"
              className="px-4 pr-8 py-3 rounded-xl font-medium
                bg-white/80 dark:bg-gray-800/80 
                text-slate-700 dark:text-white
                border border-slate-200 dark:border-gray-600
                shadow-md backdrop-blur-sm
                cursor-pointer outline-none 
                focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
                transition-all duration-200
                hover:bg-white dark:hover:bg-gray-700
                disabled:opacity-50 disabled:cursor-not-allowed
                appearance-none bg-no-repeat bg-[right_1rem_center]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundSize: "1.25rem",
              }}
            >
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </div>
        </div>

        <div className="w-full h-0.5 bg-carbon-light mb-4" />

        {/* Info Table */}
        <div className="overflow-x-auto w-full mt-6">
          <h1 className="font-bold text-2xl md:text-4xl text-center text-slate-800 dark:text-white mb-6 border-b-4 border-cyan-500 pb-2">
            {algorithmInfos[sortingState.algorithm].name}
          </h1>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 border-l-4 border-cyan-500 pl-3">
            Definition
          </h2>
          <p className="mb-6 text-slate-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {algorithmInfos[sortingState.algorithm].description}
          </p>

          <div className="overflow-x-auto rounded-xl shadow-md border border-gray-300 dark:border-gray-700 bg-slate-100 dark:bg-[#1e293b]">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
                    Algorithm
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
                    Best Case
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
                    Average Case
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
                    Worst Case
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
                    Space Complexity
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(algorithmInfos).map(([key, algo]) => (
                  <tr
                    key={key}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {algo.name}
                    </td>
                    {["best", "average", "worst"].map((type) => (
                      <td key={type} className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-md text-xs font-semibold bg-${algo.time_complexity[type][1]} text-white`}
                        >
                          {algo.time_complexity[type][0]}
                        </span>
                      </td>
                    ))}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs font-semibold bg-${algo.space_complexity[1]} text-white`}
                      >
                        {algo.space_complexity[0]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Practice Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handlePracticeClick}
            className="px-8 py-3 rounded-full font-bold bg-gradient-to-r from-cyan-600 to-emerald-500 text-white
              hover:from-cyan-700 hover:to-emerald-600 transition-all duration-300 shadow-lg"
          >
            Go to Practice
          </button>
        </div>
      </div>
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

export default SortingChart;
