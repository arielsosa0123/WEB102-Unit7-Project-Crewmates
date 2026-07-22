import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Card from '../components/Card'
import { supabase } from '../client'
import './CurrentCrew.css'

// Verdict on the crew's heist odds, based on their average sneak level.
const getCrewMessage = (avg) => {
  if (avg < 5) return 'This crew needs a miracle to succeed 😰'
  if (avg < 10) return "They'll have to get real lucky 🤞"
  if (avg < 20) return 'Decent odds — this heist might just work 😏'
  if (avg < 50) return 'A seasoned crew, the heist looks promising 🕵️'
  return 'Unstoppable — this heist is already in the bag 💰👑'
}

const CurrentCrew = () => {
  const [crewmates, setCrewmates] = useState([])

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data } = await supabase
        .from('Crewmate')
        .select()

      setCrewmates(data)
    }

    fetchCrewmates()
  }, [])

  const average =
    crewmates.length > 0
      ? crewmates.reduce((sum, c) => sum + Number(c.SneakLVL), 0) / crewmates.length
      : 0

  // One bar per crewmate for the chart below.
  const chartData = crewmates.map((c) => ({
    name: c.name,
    sneak: Number(c.SneakLVL),
  }))

  return (
    <>
      <h1 className="page-title">Current Heist Crew</h1>

      {crewmates && crewmates.length > 0 ? (
        <>
          <div className="stats-panel">
            <h2 className="section-title">Sneakiness Stats</h2>
            <p className="stats-average">
              Average Sneak Level: <strong>{average.toFixed(1)}</strong>
            </p>
            <p className="stats-message">{getCrewMessage(average)}</p>

            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#b7b9c0" />
                  <YAxis stroke="#b7b9c0" allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      background: '#1c1d22',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="sneak" name="Sneak Level" fill="#3b93ff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Newest crewmates first */}
          <div className="crew-list">
            {[...crewmates]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((crewmate) => (
                <Card
                  key={crewmate.id}
                  id={crewmate.id}
                  name={crewmate.name}
                  SneakLVL={crewmate.SneakLVL}
                  color={crewmate.color}
                />
              ))}
          </div>
        </>
      ) : (
        <h2 className="section-title">No Crewmates Yet 😞</h2>
      )}
    </>
  )
}

export default CurrentCrew
