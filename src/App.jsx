import './App.css'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import CurrentCrew from './pages/CurrentCrew'
import EditCrewmate from './pages/EditCrewmate'
import DetailCrewmate from './pages/DetailCrewmate'

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crew" element={<CurrentCrew />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
          <Route path="/crewmate/:id" element={<DetailCrewmate />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
