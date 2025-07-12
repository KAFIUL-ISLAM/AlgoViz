import { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import MergeSortGame from "./MergeSortGame";
import SelectionSortGame from "./SelectionSortGame";
import SortTheMess from "./SortTheMess";
import Timergame from "./Timergame";
import GameCard from "./GameCard"
import { Link } from "react-router-dom";
import PythonEditor from "./PythonEditor";
import Footer from "./Footer";
import {
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";


function PracticePage() {


  const [isDark, setIsDark] = useState(() => {
      // Initialize from localStorage, default to false if not set
      const saved = localStorage.getItem("darkMode");
      return saved === "true";
  });
   useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls on component mount
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

  return (
    <div>
      <div className="mx-12">
        {/* Header Section with Timer */}
        <div className="flex items-center justify-between py-3 w-full mb-8">
          {/* Left: Chronometer Icon (matches logo style) */}
          <div className="flex-shrink-0">
            <img
              src={isDark ? "/logo_dark.png" : "/logo.png"}
              alt="AlgoViz Logo"
              className="h-20 w-20 object-contain"
            />
          </div>

          {/* Center: Page Title (same font as AppHeader) */}
          <div className="flex-1 text-center">
            <h1
              className="text-3xl sm:text-5xl font-semibold tracking-wide text-slate-800 dark:text-white"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Searching & Sorting Practice
            </h1>
          </div>

          {/* Right: Navigation and Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Go Back Button */}
            <Link to="/">
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-800 
                 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                title="Go Back to Home"
              >
                <HomeIcon className="h-6 w-6" />
              </button>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-800 
               dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center mb-12 px-4">
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
            🎮 Ready to level up your logic? Dive into fun coding games and
            interactive editors that turn Python and sorting algorithms into
            pure brain fuel.
            <br />
            ⏱️ Want an extra challenge? Use the timer and race against the clock
            to beat your best time!
          </p>
        </div>

        {/* 🧩 Interactive Sorting Games Section */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B7A70] mb-3 tracking-tight">
              🧩 Interactive Sorting Games
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              Drag, swap, race the clock — practice sorting like never before.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            {/* Merge Sort Game Card */}
            <GameCard title="Merge Sort Challenge" icon="🧬">
              <MergeSortGame />
            </GameCard>

            {/* Selection Sort Game Card */}
            <GameCard title="Selection Sort Challenge" icon="🎯">
              <SelectionSortGame />
            </GameCard>

            {/* Timer Game Card */}
            <GameCard title="⏳ Beat The Clock!" icon="⏳">
              <Timergame />
            </GameCard>

            <GameCard title="Sort the Mess (Simple)!" icon="⏳">
              <SortTheMess />
            </GameCard>
            <div className="lg:col-span-2">
              <GameCard title="Code Editor" icon="🧠">
                <CodeEditor />
              </GameCard>
            </div>
          </div>
        </section>

        <h2 className="text-xl font-bold text-[#2B7A70] mb-6 text-center">
          ✨Explore Sorting Logic — Write Code, Test Ideas!
        </h2>

        {/* Code Editor and Extra Panel Section */}
        <div className=""></div>
      </div>
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

export default PracticePage;
