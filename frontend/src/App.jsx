import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './navbar/Navbar'
import Dash from './views/Dash'
import Instruments from './views/Instruments'
import Packs from './views/Packs'
import Procedures from './views/Procedures'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/procedures" element={<Procedures />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
