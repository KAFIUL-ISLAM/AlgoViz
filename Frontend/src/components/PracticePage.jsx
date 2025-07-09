import { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor"; // Adjust path if needed

function PracticePage() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

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
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-[#2B7A70]">
          Searching & Sorting Algorithms Practice
        </h1>
        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 px-4 py-2 bg-[#2B7A70] text-white rounded-full hover:bg-[#25665d] transition text-sm"
        >
          <img
            src="/chrono.png"
            alt="Chrono Icon"
            className="inline w-4 h-4 mr-2"
          />
          {isRunning ? "Stop Timer" : "Start Timer"} ({seconds}s)
        </button>
      </div>
       <div className="my-4 border-t border-gray-300 w-full"></div>
      <p
        className="list-disc list-inside flex flex-col gap-2 text-gray-600 dark:text-white-light text-left"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Practice makes perfect in everything, and this is especially true when
        learning Python. If you're a beginner, regularly practicing Python
        exercises will build your confidence and sharpen your skills. To help
        you improve, try these Python exercises with solutions to test your
        knowledge.
      </p>
     <div className="my-8">
  <CodeEditor />
</div>
    </div>
  );
}
export default PracticePage;
