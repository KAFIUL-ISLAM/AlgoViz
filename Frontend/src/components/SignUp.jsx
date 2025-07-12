import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!userInfo.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!userInfo.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (!userInfo.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (userInfo.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // 1. Signup the user
      const signupRes = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userInfo.email,
          email: userInfo.email,
          password: userInfo.password,
        }),
      });

      const signupData = await signupRes.json();

      if (!signupRes.ok) {
        setGeneralError(signupData.error || "Signup failed");
        setLoading(false);
        return;
      }

      // 2. Immediately login after signup (get tokens)
      const loginRes = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userInfo.email,
          password: userInfo.password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setGeneralError(loginData.detail || "Auto-login failed");
        setLoading(false);
        return;
      }

      const { access, refresh } = loginData;

      // 3. Store tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // 4. Decode access token and set user
      const decoded = jwtDecode(access);
      setUser({ username: decoded.username, email: decoded.email });

      navigate("/practicepage");
    } catch (err) {
      setGeneralError("Server error. Please try again.");
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
          Create an account on{" "}
          <span className="text-turquoise-dark">AlgoViz</span>
        </h2>

        {generalError && (
          <p className="text-red-500 text-center mb-4">{generalError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              className={`pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring bg-white/50 dark:bg-gray-700/50 text-slate-700 dark:text-white ${
                error.name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Full Name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>

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
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
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
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
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
              "Signing up..."
            ) : (
              <>
                Sign Up <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm mt-4 text-slate-600 dark:text-white-light">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold hover:underline">
            Log in
          </Link>
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

export default SignUp;
