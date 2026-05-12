import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem('access_token');

  if (token && user) {
    // If already logged in, redirect to the home page as requested
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
