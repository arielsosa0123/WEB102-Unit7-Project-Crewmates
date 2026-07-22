import CrewmateForm from '../components/CrewmateForm'
import banner from '../assets/Hiest.png'

const Home = () => {
  return (
    <>
      <h1 className="page-title">Heist Crew</h1>
      <img className="banner" src={banner} alt="Stickman bank heist" />
      <h2 className="section-title">Recruit a new Crewmate</h2>
      <CrewmateForm />
    </>
  )
}

export default Home
