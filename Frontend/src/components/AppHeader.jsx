import { Link } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  UserPlusIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

function AppHeader({ isDark, setIsDark, user }) {
  return (
    <div className="flex items-center justify-between py-3 w-full">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src={isDark ? "/logo_dark.png" : "/logo.png"}
          alt="AlgoViz Logo"
          className="h-20 w-20 object-contain"
        />
      </div>

      {/* Title */}
      <div className="flex-1 text-center">
        <h1
          className="text-3xl sm:text-5xl font-semibold tracking-wide text-slate-800 dark:text-white"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Sorting Algorithm Visualizer
        </h1>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-2">
        {user ? (
          <Link to="/signout" title="Profile">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition">
              <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            </button>
          </Link>
        ) : (
          <>
            <Link to="/signin" title="Sign In">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition">
                <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
              </button>
            </Link>
            <Link to="/signup" title="Sign Up">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition">
                <UserPlusIcon className="h-6 w-6" />
              </button>
            </Link>
          </>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
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
  );
}

export default AppHeader;
