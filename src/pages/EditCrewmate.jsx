import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import { COLORS } from '../colors'
import stick from '../assets/Stick.png'
import '../components/CrewmateForm.css'

const EditCrewmate = () => {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState({ name: '', SneakLVL: '', color: '' })

  // Pre-fill the form with the crewmate's saved values.
  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase
        .from('Crewmate')
        .select()
        .eq('id', id)
        .single()

      if (data) {
        setCrewmate({ name: data.name, SneakLVL: data.SneakLVL, color: data.color })
      }
    }

    fetchCrewmate()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setCrewmate((prev) => ({ ...prev, [name]: value }))
  }

  const updateCrewmate = async (event) => {
    event.preventDefault()

    await supabase
      .from('Crewmate')
      .update({
        name: crewmate.name,
        SneakLVL: Number(crewmate.SneakLVL),
        color: crewmate.color,
      })
      .eq('id', id)

    window.location = '/crew'
  }

  const deleteCrewmate = async (event) => {
    event.preventDefault()

    await supabase
      .from('Crewmate')
      .delete()
      .eq('id', id)

    window.location = '/crew'
  }

  const selectedHex = COLORS.find((c) => c.name === crewmate.color)?.hex

  return (
    <>
      <h1 className="page-title">Update Crewmate</h1>
      <div className="form-row">
        <form className="crewmate-form">
          <label className="field">
            <span className="field-label">Name</span>
            <input
              type="text"
              name="name"
              value={crewmate.name}
              onChange={handleChange}
              placeholder="Crewmate name"
            />
          </label>

          <label className="field">
            <span className="field-label">Sneak Level</span>
            <input
              type="number"
              name="SneakLVL"
              min="0"
              step="1"
              inputMode="numeric"
              value={crewmate.SneakLVL}
              onChange={handleChange}
              placeholder="0"
            />
          </label>

          <fieldset className="field color-field">
            <legend className="field-label">Color</legend>
            <div className="color-options">
              {COLORS.map((c) => (
                <label key={c.name} className="color-option">
                  <input
                    type="radio"
                    name="color"
                    value={c.name}
                    checked={crewmate.color === c.name}
                    onChange={handleChange}
                  />
                  <span className="color-bubble" style={{ background: c.hex }} />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="submit-btn" onClick={updateCrewmate}>
            Update Crewmate
          </button>
          <button type="button" className="delete-btn" onClick={deleteCrewmate}>
            Delete Crewmate
          </button>
        </form>

        {/* Preview that recolors as a color is selected */}
        <div
          className="stick"
          role="img"
          aria-label="Crewmate preview"
          style={{
            maskImage: `url(${stick})`,
            WebkitMaskImage: `url(${stick})`,
            backgroundColor: selectedHex,
          }}
        />
      </div>
    </>
  )
}

export default EditCrewmate
