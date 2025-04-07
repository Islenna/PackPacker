import { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import { useIdleLogout } from './utils/idleLogout'

import Navbar from './components/navbar/Navbar'
import Dash from './components/views/Dash'
import Instruments from './components/instruments/Instruments'
import Packs from './components/packs/Packs'
import Procedure from './components/procedures/Procedure'
import Procedures from './components/procedures/Procedures'
import PacksAndInstruments from './components/packs/PacksAndInstruments'
import AdminDashboard from './components/admin/AdminDashboard'

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function AppRoutes() {
  const navigate = useNavigate()
  const isIdle = useIdleLogout({ timeout: 20 * 1000 }); // 20 seconds for testing
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const { logout } = useAuth();
  console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);


  useEffect(() => {
    if (isIdle && !hasLoggedOut) {
      logout(); // clears token + user from context & storage
      toast.info("Logged out due to inactivity.");
      navigate("/");
      setHasLoggedOut(true);
    }
  }, [isIdle, hasLoggedOut, logout, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dash />} />
        <Route path="/instruments" element={<ProtectedRoute><Instruments /></ProtectedRoute>} />
        <Route path="/packs" element={<ProtectedRoute><Packs /></ProtectedRoute>} />
        <Route path="/procedures" element={<ProtectedRoute><Procedures /></ProtectedRoute>} />
        <Route path="/procedures/:id" element={<ProtectedRoute><Procedure /></ProtectedRoute>} />
        <Route path="/packs/:id/instruments" element={<ProtectedRoute><PacksAndInstruments /></ProtectedRoute>} />
        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
      </Routes>
      <ToastContainer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
