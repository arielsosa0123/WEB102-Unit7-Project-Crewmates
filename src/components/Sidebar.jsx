import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  // Home: go to the main page and scroll to the top
  const goHome = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Recruit: go to the main page, then scroll to the form and focus the Name box
  const goToForm = () => {
    navigate('/')
    // Wait for the Home page to render before scrolling to and focusing the input
    setTimeout(() => {
      const nameInput = document.getElementById('crewmate-name')
      if (nameInput) {
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        nameInput.focus({ preventScroll: true })
      }
    }, 100)
  }

  // Current Heist Crew: go to the summary page
  const goToCrew = () => navigate('/crew')

  return (
    <div className="sidebar">
      <button className="sidebar-link" onClick={goHome}>
        Home
      </button>
      <button className="sidebar-link" onClick={goToForm}>
        Recruit New Crewmate
      </button>
      <button className="sidebar-link" onClick={goToCrew}>
        Current Heist Crew
      </button>
    </div>
  )
}

export default Sidebar
