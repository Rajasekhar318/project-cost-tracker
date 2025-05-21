// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
        path="/ForgotPassword"
        element={<ForgotPassword />}
      />
      </Routes>
    </Router>
  );
};

export default App;