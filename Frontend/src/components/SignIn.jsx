import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../contexts/AuthContext'; 

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '', general: '' });

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/signin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })  // Using email as username
      });

      const data = await res.json();

      if (res.ok) {
        setUser({ username: email });  // Set login state
        navigate('/dashboard');        // Redirect
      } else {
        setError(prev => ({ ...prev, general: data.error || 'Login failed' }));
      }
    } catch (err) {
      setError(prev => ({ ...prev, general: 'Server error. Try again later.' }));
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-carbon px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-carbon-light rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-white mb-6">
          Welcome to <span className="text-turquoise-dark">AlgoViz</span>
        </h2>

        {error.general && (
          <p className="text-red-500 text-center mb-4">{error.general}</p>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 mb-6 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition"
        >
          <FontAwesomeIcon icon={faGoogle} />
          Login with Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className={`pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring ${
                error.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              className={`pl-10 pr-10 py-2 w-full border rounded focus:outline-none focus:ring ${
                error.password ? 'border-red-500' : 'border-gray-300'
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
            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-turquoise-dark text-white font-semibold rounded hover:bg-teal-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : (
              <>
                Log in <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm mt-4 text-slate-600 dark:text-white-light">
          <Link to="/dashboard" className="hover:underline">
            Forgot password?
          </Link>
          <p className="mt-2">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
