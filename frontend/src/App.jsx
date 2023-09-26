import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/navbar/Navbar'
import Dash from './components/views/Dash'
import Instruments from './components/instruments/Instruments'
import Instrument from './components/instruments/Instrument'
import Pack from './components/packs/Pack'
import Packs from './components/packs/Packs'
import PackEdit from './components/packs/PackEdit'
import Procedures from './components/procedures/Procedures'
import Procedure from './components/procedures/Procedure'
import ProcedureEdit from './components/procedures/ProcedureEdit'

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
          <Route path="/pack/:id" element = {<Pack />} />
          <Route path="/pack/:id/edit" element = {<PackEdit />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/procedures/:id" element={<Procedure />} />
          <Route path="/procedures/:id/edit" element={<ProcedureEdit />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
