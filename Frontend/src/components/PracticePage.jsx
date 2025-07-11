import { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import MergeSortGame from "./MergeSortGame";
import SelectionSortGame from "./SelectionSortGame";
import SortTheMess from "./SortTheMess";
import Timergame from "./Timergame";

import { Link } from "react-router-dom";
import PythonEditor from "./PythonEditor";

function PracticePage() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div>
      {/* Header Section with Timer */}
      <div className="w-full mt-8 mb-6">
        <div className="flex items-center justify-between w-full mb-6 relative">
          {/* Left side: Stopwatch Icon */}
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="Chronometer Icon"
              className="w-8 h-10"
            />
          </div>

          {/* Center: Title */}
          <h1 className="text-2xl font-bold text-[#2B7A70]">
            Searching & Sorting Algorithms Practice
          </h1>

          {/* Right side: Timer and Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTimer}
              className="flex items-center gap-2 px-4 py-2 bg-[#2B7A70] text-white rounded-full hover:bg-[#D93025] transition text-sm"
            >
              <img
                src="/chrono.png"
                alt="Chrono Icon"
                className="inline w-4 h-4 mr-2"
              />
              {isRunning ? "Stop" : "Start "} ({seconds}s)
            </button>

            <button
              onClick={resetTimer}
              className="p-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-xl"
              title="Refresh Timer"
            >
              🔄
            </button>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300 mb-6 w-full" />
      </div>

      {/* Description */}
      <p
        className="list-disc list-inside flex flex-col gap-2 text-gray-700 dark:text-white-light text-left text-base leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        🎮 Ready to level up your logic? Dive into fun coding games and
        interactive editors that turn Python and sorting algorithms into pure
        brain fuel. Want an extra challenge? ⏱️ Use the timer and race against
        the clock to beat your best time!
      </p>

      {/* 🧩 Interactive Sorting Games Section */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-[#2B7A70] text-center mb-2">
          🧩 Interactive Sorting Games
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Drag, swap, race the clock — practice sorting like never before.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Merge Sort Game Card */}
          <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-[#2B7A70] mb-4 flex items-center gap-2">
              🧬 Merge Sort Challenge
            </h3>
            <MergeSortGame />
          </div>

          {/* Selection Sort Game Card */}
          <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-[#2B7A70] mb-4 flex items-center gap-2">
              🎯 Selection Sort Challenge
            </h3>
            <SelectionSortGame />
          </div>

          {/* Timer Game Card */}
          <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-[#2B7A70] mb-4 flex items-center gap-2">
              ⏳ Beat The Clock!
            </h3>
            <Timergame />
          </div>
        </div>
      </section>

      {/* Code Editor and Extra Panel Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-xl font-bold text-[#2B7A70] mb-6 text-center">
          ✨Explore Sorting Logic — Write Code, Test Ideas!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SortTheMess />
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default PracticePage;
