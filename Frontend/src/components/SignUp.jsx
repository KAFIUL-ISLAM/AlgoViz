import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faUser,
  faArrowRight,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!userInfo.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }

    if (!userInfo.email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }

    if (!userInfo.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (userInfo.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-carbon px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-carbon-light rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-white mb-6">
          Create an account on <span className="text-turquoise-dark">AlgoViz</span>
        </h2>

        <button
          onClick={handleGoogleSignUp}
          className="w-full py-2 mb-6 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition"
        >
          <FontAwesomeIcon icon={faGoogle} />
          Sign up with Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className={`pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring ${error.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Full Name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
            {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className={`pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring ${error.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              className={`pl-10 pr-10 py-2 w-full border rounded focus:outline-none focus:ring ${error.password ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Password"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-turquoise-dark text-white font-semibold rounded hover:bg-teal-700 transition"
            disabled={loading}
          >
            {loading ? 'Signing up...' : (
              <>
                Sign Up <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm mt-4 text-slate-600 dark:text-white-light">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
