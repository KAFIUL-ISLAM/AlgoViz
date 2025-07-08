import { Link } from 'react-router-dom';

function SignOut() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-carbon px-4">
      <div className="bg-white dark:bg-carbon-light rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Thanks for using <span className="text-teal-600 dark:text-teal-400">AlgoViz</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Forgot anything?{' '}
          <Link to="/" className="text-teal-600 hover:underline dark:text-teal-400">
            Go back to the visualizer
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignOut;
