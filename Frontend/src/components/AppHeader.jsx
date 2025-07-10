import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function AppHeader({ isDark, setIsDark }) {
    return (
        <div className="flex items-center justify-between py-3 w-full">
            <div className="flex-shrink-0">
                <img
                    src="/logo.png"
                    alt="AlgoViz Logo"
                    className="h-20 w-20 object-contain"
                />
            </div>
            <div className="flex-1 text-center">
                <h1
                    className="text-3xl sm:text-5xl font-semibold tracking-wide text-slate-800 dark:text-white"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                    Sorting Algorithm Visualizer
                </h1>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDark ? (
                        <SunIcon className="h-6 w-6" />
                    ) : (
                        <MoonIcon className="h-6 w-6" />
                    )}
                </button>
                <Link to="/signin">
                    <button
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 
                                   dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                        title="Sign In"
                    >
                        <img
                            src="/login.png"
                            alt="Sign In"
                            className="h-6 w-6 object-contain filter dark:invert dark:brightness-150"
                        />
                    </button>
                </Link>
                <Link to="/signup">
                    <button
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 
                                   dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                        title="Sign Up"
                    >
                        <img
                            src="/sign.png"
                            alt="Sign Up"
                            className="h-6 w-6 object-contain filter dark:invert dark:brightness-150"
                        />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default AppHeader;