import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // <-- FIX: Removed {} braces
import Spinner from './Spinner'; // We'll need a loading spinner

const AdminRoute = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Spinner />; // Show loading spinner while user is being checked
  }

  // Check if authenticated AND user is an admin
  if (isAuthenticated && user?.isAdmin) {
    return <Outlet />; // Render the child component (e.g., AdminDashboardPage)
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but NOT admin, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;