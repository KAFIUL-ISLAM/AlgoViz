import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "", general: "" });

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ email: "", password: "", general: "" });

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}
/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // assuming email is used as username
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const { access, refresh } = data;

        // Store tokens
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // Decode access token to get user info
        const decoded = jwtDecode(access);
        setUser({ username: decoded.username, email: decoded.email });

        navigate("/PracticePage");
      } else {
        setError((prev) => ({
          ...prev,
          general: data?.detail || "Login failed. Check credentials.",
        }));
      }
    } catch (err) {
      setError((prev) => ({
        ...prev,
        general: "Server error. Please try again later.",
      }));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-white/80 dark:bg-carbon-light/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 dark:border-gray-700/50">
        <div className="flex-shrink-0 flex justify-center mb-3">
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
        <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-white mb-6">
          Welcome to <span className="text-turquoise-dark">AlgoViz</span>
        </h2>

        {error.general && (
          <p className="text-red-500 text-center mb-4">{error.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="email"
              className={`pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring bg-white/50 dark:bg-gray-700/50 text-slate-700 dark:text-white ${
                error.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              className={`pl-10 pr-10 py-2 w-full border rounded focus:outline-none focus:ring bg-white/50 dark:bg-gray-700/50 text-slate-700 dark:text-white ${
                error.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-turquoise-dark text-white font-semibold rounded hover:bg-teal-700 transition"
            disabled={loading}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                Log in <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm mt-4 text-slate-600 dark:text-white-light">
          <Link to="/ForgotPassword" className="hover:underline">
            Forgot password?
          </Link>
          <p className="mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to Visualizer Link */}
        <div className="mt-4 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition font-medium shadow-sm text-sm"
          >
            <FontAwesomeIcon icon={faArrowRight} className="mr-1 rotate-180" />
            Back to Visualizer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
