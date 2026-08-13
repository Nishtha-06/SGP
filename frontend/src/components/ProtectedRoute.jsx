import { Navigate } from 'react-router-dom';
import { getStoredUser } from '../services/authApi';

export default function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = getStoredUser();

  if (!isAuthenticated || !user) {
    return <Navigate to="/role-selection" replace />;
  }

  // If specific roles are required and the user's role doesn't match
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const destinations = {
      STUDENT: '/dashboard',
      FACULTY: '/faculty-dashboard',
      CC_FACULTY: '/cc-faculty-dashboard',
      ADMIN: '/admin-dashboard'
    };
    
    return <Navigate to={destinations[user.role] || '/'} replace />;
  }

  return children;
}
