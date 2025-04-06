import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'

import Navbar from './components/navbar/Navbar'
import Dash from './components/views/Dash'
import Instruments from './components/instruments/Instruments'
import Packs from './components/packs/Packs'
import Procedure from './components/procedures/Procedure'
import Procedures from './components/procedures/Procedures'
import PacksAndInstruments from './components/packs/PacksAndInstruments';
import Users from './components/users/users';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("usertoken");

  if (!usertoken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Dash />} />

          {/* Protected Routes */}
          <Route path="/instruments" element={
            <ProtectedRoute><Instruments /></ProtectedRoute>
          } />
          <Route path="/packs" element={
            <ProtectedRoute><Packs /></ProtectedRoute>
          } />
          <Route path="/procedures" element={
            <ProtectedRoute><Procedures /></ProtectedRoute>
          } />
          <Route path="/procedures/:id" element={
            <ProtectedRoute><Procedure /></ProtectedRoute>
          } />
          <Route path="/packs/:id/instruments" element={
            <ProtectedRoute><PacksAndInstruments /></ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute><Users /></ProtectedRoute>
          } />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;