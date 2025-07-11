import { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor"; 
import { Link } from "react-router-dom";
import PythonEditor from "./PythonEditor";
function PracticePage() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);



  const resetTimer = () => {
  clearInterval(intervalRef.current); // stop the interval
  setIsRunning(false);             
  setSeconds(0);                      
  }

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

      <div className="my-4 border-t border-gray-300 w-full"></div>
      <p
        className="list-disc list-inside flex flex-col gap-2 text-gray-600 dark:text-white-light text-left"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
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
          <div className="border rounded p-6 shadow bg-white dark:bg-carbon">
            <h2 className="text-lg font-bold text-[#2B7A70] mb-4 text-center">
              Try Writing Sorting Code
            </h2>
            <CodeEditor />

            {/* 🤖 AI Assistant Toggle */}
            <div className="mt-6">
              {!showAIBox ? (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowAIBox(true)}
                    className="p-3 bg-[#2B7A70] text-white rounded-full hover:bg-[#1E293B] shadow-lg"
                    title="Ask AI for help"
                  >
                    <FaRobot size={24} />
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <AIBox />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PracticePage;
