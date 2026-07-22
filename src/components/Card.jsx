import { useNavigate } from 'react-router-dom'
import stick from '../assets/Stick.png'
import { colorHex } from '../colors'
import './Card.css'

const Card = (props) => {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate(`/crewmate/${props.id}`)}>
      {/* The PNG is used as a mask, so the background color tints the figure */}
      <div
        className="card-stick"
        role="img"
        aria-label={`${props.color} crewmate`}
        style={{
          maskImage: `url(${stick})`,
          WebkitMaskImage: `url(${stick})`,
          backgroundColor: colorHex(props.color),
        }}
      />
      <h3 className="card-name">{props.name}</h3>
      <p className="card-detail">Sneak Level: {props.SneakLVL}</p>
      <p className="card-detail">Color: {props.color}</p>
      <button
        className="card-edit-btn"
        onClick={(e) => {
          e.stopPropagation() // stop the click from also opening the detail page
          navigate(`/edit/${props.id}`)
        }}
      >
        Edit
      </button>
    </div>
  )
}

export default Card
