import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { colorHex } from '../colors'
import stick from '../assets/Stick.png'
import './DetailCrewmate.css'

// Turn a sneak level into a fun rating shown on the detail page.
const getSneakiness = (level) => {
  if (level < 5) return 'Not very sneaky at all 🐢'
  if (level < 10) return 'Sneaky, but needs work 🧦'
  if (level < 20) return 'Pretty sneaky 🥷'
  if (level < 50) return 'A real sneaking pro 🕵️'
  return 'A God at sneaking 👑'
}

const DetailCrewmate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase
        .from('Crewmate')
        .select()
        .eq('id', id)
        .single()

      setCrewmate(data)
    }

    fetchCrewmate()
  }, [id])

  if (!crewmate) {
    return <h1 className="page-title">Loading…</h1>
  }

  return (
    <div className="detail-row">
      {/* The PNG is used as a mask, so the background color tints the figure */}
      <div
        className="stick"
        role="img"
        aria-label={`${crewmate.color} crewmate`}
        style={{
          maskImage: `url(${stick})`,
          WebkitMaskImage: `url(${stick})`,
          backgroundColor: colorHex(crewmate.color),
        }}
      />

      <div className="detail-info">
          <h1 className="detail-name">{crewmate.name}</h1>
          <p className="detail-line">
            <strong>Sneak Level:</strong> {crewmate.SneakLVL}
          </p>
          <p className="detail-line">
            <strong>Color:</strong> {crewmate.color}
          </p>
          <p className="sneakiness">{getSneakiness(Number(crewmate.SneakLVL))}</p>

          <button className="submit-btn" onClick={() => navigate(`/edit/${crewmate.id}`)}>
            Edit this Crewmate
          </button>
      </div>
    </div>
  )
}

export default DetailCrewmate
