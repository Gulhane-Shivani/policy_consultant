import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem('access_token');

  if (token && user) {
    // If already logged in, redirect to their respective dashboard
    const dashboardMap = {
      super_admin: '/super-admin',
      admin: '/admin',
      agent: '/staff',
      csr: '/staff',
      user: '/dashboard'
    };
    return <Navigate to={dashboardMap[user.role] || '/dashboard'} replace />;
  }

  return children;
};

export default PublicRoute;
