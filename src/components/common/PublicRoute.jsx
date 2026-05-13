import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem('access_token');

  if (token && user) {
    // If already logged in, redirect to the appropriate dashboard based on role
    const role = user.role;
    if (role === 'super_admin') return <Navigate to="/super-admin" replace />;
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'agent') return <Navigate to="/agent" replace />;
    if (role === 'csr') return <Navigate to="/csr" replace />;
    return <Navigate to="/dashboard" replace />; // Default for 'user' role
  }

  return children;
};

export default PublicRoute;
