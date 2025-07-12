import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SignOut() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

   const [isDark, setIsDark] = useState(() => {
      // Initialize from localStorage, default to false if not set
      const saved = localStorage.getItem("darkMode");
      return saved === "true";
    });
  
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-white/80 dark:bg-carbon-light/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 dark:border-gray-700/50 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={
              localStorage.getItem("darkMode") === "true"
                ? "/logo_dark.png"
                : "/logo.png"
            }
            alt="AlgoViz Logo"
            className="h-20 w-20 object-contain"
          />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          You've been logged out of{" "}
          <span className="text-teal-600 dark:text-teal-400">AlgoViz</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Want to visualize again?{" "}
          <Link
            to="/"
            className="text-teal-600 hover:underline dark:text-teal-400"
          >
            Go back to visualizer
          </Link>
        </p>

        <p className="text-sm text-slate-400 dark:text-slate-500">
          Or{" "}
          <Link to="/signin" className="underline hover:text-teal-500">
            sign in
          </Link>{" "}
          again.
        </p>
      </div>
    </div>
  );
}

export default SignOut;
