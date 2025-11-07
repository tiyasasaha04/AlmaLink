import React, { Suspense, lazy } from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Spinner from './components/common/Spinner'; // A simple loading spinner component

// --- Import Route Guards ---
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// --- Lazy Loading Pages for Performance ---
// We lazy-load pages so the app starts faster
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const MentorSearchPage = lazy(() => import('./pages/MentorSearchPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
const MessagingPage = lazy(() => import('./pages/MessagingPage'));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Spinner />}> {/* Shows a loader while pages load */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* --- PROTECTED USER ROUTES --- */}
            {/* These routes can only be seen if you are logged in */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/mentors" element={<MentorSearchPage />} />
              <Route path="/profile/me/edit" element={<EditProfilePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/messaging" element={<MessagingPage />} />
              {/* You can add your /jobs route here later */}
            </Route>

            {/* --- PROTECTED ADMIN ROUTE --- */}
            {/* This route can only be seen by an admin */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
            </Route>

          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;