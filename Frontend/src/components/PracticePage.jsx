import { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { Link } from "react-router-dom";
import SelectionSortGame from "./SelectionSortGame";
import MergeSortGame from "./MergeSortGame";

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
      {/* ⏱ Timer and Header */}
      <div className="w-full mt-8 mb-6">
        <div className="flex items-center justify-between w-full mb-6 relative">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="Chronometer Icon"
              className="w-8 h-10"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#2B7A70]">
            Searching & Sorting Algorithms Practice
          </h1>
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

      {/* 📝 Paragraph */}
      <p
        className="list-disc list-inside flex flex-col gap-2 text-gray-600 dark:text-white-light text-left px-8"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Practice makes perfect in everything, and this is especially true when
        learning Python or sorting algorithms. Use the games and editors below
        to sharpen your logic!
      </p>

      {/* 🧩 Games Section */}
      <div className="px-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <MergeSortGame />
        </div>
        <div className="w-full">
          <SelectionSortGame />
        </div>
      </div>

      {/* 💻 Code Editor (Bottom full width) */}
      <div className="px-8 mt-12 mb-16">
        <h2 className="text-xl font-bold text-[#2B7A70] mb-4 text-center">
          Try Writing Sorting Code
        </h2>
        <div className="w-full max-w-4xl mx-auto">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default PracticePage;
