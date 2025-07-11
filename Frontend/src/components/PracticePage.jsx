import { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import CodeEditor from "./CodeEditor";
import SelectionSortGame from "./SelectionSortGame";
import MergeSortGame from "./MergeSortGame";
import AIBox from "./AIBox";

function PracticePage() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showAIBox, setShowAIBox] = useState(false);
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
    <div className="px-4 md:px-8">
      {/* ⏱ Timer and Header */}
      <div className="mt-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="Chronometer Icon"
              className="w-8 h-10"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#2B7A70] text-center flex-grow">
            Searching & Sorting Algorithms Practice
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTimer}
              className="flex items-center gap-2 px-4 py-2 bg-[#2B7A70] text-white rounded-full hover:bg-[#D93025] text-sm"
            >
              <img
                src="/chrono.png"
                alt="Chrono Icon"
                className="w-4 h-4 mr-2"
              />
              {isRunning ? "Stop" : "Start"} ({seconds}s)
            </button>
            <button
              onClick={resetTimer}
              className="text-xl p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Reset Timer"
            >
              🔄
            </button>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-6" />
      </div>

      {/* 📝 Description */}
      <p className="text-gray-700 dark:text-white-light text-left text-base mb-10">
        Practice makes perfect in everything, and this is especially true when
        learning Python or sorting algorithms. Use the games and editors below
        to sharpen your logic!
      </p>

      {/* 🧩 Games Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <MergeSortGame />
        <SelectionSortGame />
      </div>

      {/* 💻 Code Editor and Extra Panel */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-xl font-bold text-[#2B7A70] mb-6 text-center">
          Try Writing Sorting Code and Explore More
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Placeholder */}
          <div className="border rounded p-6 shadow bg-white dark:bg-carbon flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-4 text-[#2B7A70] text-center">
              Another Exercise
            </h3>
            <p className="text-gray-700 dark:text-white-light text-center">
              This space is reserved for a future exercise or challenge.
            </p>
          </div>

          {/* Right: Code Editor with AI Helper */}

          <CodeEditor />

          {/* 🤖 AI Assistant Toggle */}
        </div>
      </div>
    </div>
  );
}

export default PracticePage;
