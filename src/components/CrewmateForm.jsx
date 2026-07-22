import { useState } from 'react'
import './CrewmateForm.css'
import stick from '../assets/Stick.png'
import { supabase } from '../client'
import { COLORS } from '../colors'

function CrewmateForm() {
  // One object holds every form field.
  const [crewmate, setCrewmate] = useState({ name: '', SneakLVL: '', color: '' })

  // Update whichever field matches the input's `name`.
  const handleChange = (event) => {
    const { name, value } = event.target
    setCrewmate((prev) => ({ ...prev, [name]: value }))
  }

  const createCrewmate = async (event) => {
    event.preventDefault()

    await supabase
      .from('Crewmate')
      .insert({
        name: crewmate.name,
        SneakLVL: Number(crewmate.SneakLVL),
        color: crewmate.color,
      })
      .select()

    window.location = '/'
  }

  // Hex of the chosen color, used to tint the live preview.
  const selectedHex = COLORS.find((c) => c.name === crewmate.color)?.hex

  return (
    <div className="form-row">
      <form className="crewmate-form">
        <label className="field">
          <span className="field-label">Name</span>
          <input
            id="crewmate-name"
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

        <button type="submit" className="submit-btn" onClick={createCrewmate}>
          Create Crewmate
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
  )
}

export default CrewmateForm
