import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but keep current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if roles are provided
  if (roles.length > 0 && !roles.includes(user?.role)) {
    // Redirect to unauthorized or dashboard if role doesn't match
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
