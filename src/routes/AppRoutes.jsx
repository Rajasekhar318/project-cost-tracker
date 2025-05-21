// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import { useAuth } from '../hooks/useAuth';
import ForgotPassword from '../pages/ForgotPassword';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route
        path="/ForgotPassword"
        element={user ? <Navigate to="/" /> : <ForgotPassword />}
      />
    </Routes>
  );
};

export default AppRoutes;
