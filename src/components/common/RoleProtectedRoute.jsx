import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem('access_token');

  if (!token || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized or appropriate dashboard if role not allowed
    // For now, redirecting to their own dashboard based on role
    const dashboardMap = {
      super_admin: '/super-admin',
      admin: '/admin',
      agent: '/staff',
      csr: '/staff',
      user: '/dashboard'
    };
    return <Navigate to={dashboardMap[user.role] || '/'} replace />;
  }

  return children;
};

export default RoleProtectedRoute;
