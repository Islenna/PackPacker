import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext'

import Navbar from './components/navbar/Navbar'
import Dash from './components/views/Dash'
import Instruments from './components/instruments/Instruments'
import Packs from './components/packs/Packs'
import Procedure from './components/procedures/Procedure'
import Procedures from './components/procedures/Procedures'
import PacksAndInstruments from './components/packs/PacksAndInstruments';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/procedures/:id" element={<Procedure />} />
          <Route path="/packs/:id/instruments" element={<PacksAndInstruments />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App;
