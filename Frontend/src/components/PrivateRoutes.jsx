import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();

  // If not logged in, redirect to Sign In
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, show the requested page
  return children;
}

export default PrivateRoute;
