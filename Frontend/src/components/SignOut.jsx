import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SignOut() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local user state
    setUser(null);

    // Optional: Call backend logout API
    fetch('http://localhost:8000/api/signout/', {
      method: 'POST',
      credentials: 'include'  // Required for session cookies
    }).catch(err => console.error('Logout failed:', err));
  }, [setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-carbon px-4">
      <div className="bg-white dark:bg-carbon-light rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          You've been logged out of <span className="text-teal-600 dark:text-teal-400">AlgoViz</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Want to visualize again?{' '}
          <Link to="/" className="text-teal-600 hover:underline dark:text-teal-400">
            Go back to visualizer
          </Link>
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Or <Link to="/signin" className="underline hover:text-teal-500">sign in</Link> again.
        </p>
      </div>
    </div>
  );
}

export default SignOut;
