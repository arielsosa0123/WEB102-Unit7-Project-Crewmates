// Color choices shared by the form and the cards (name is stored, hex is displayed).
export const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Sky Blue', hex: '#4fc3f7' },
  { name: 'Lava Red', hex: '#e53935' },
  { name: 'Lime Green', hex: '#7cff3f' },
  { name: 'Yellow', hex: '#ffdd00' },
  { name: 'Purple', hex: '#9c27b0' },
  { name: 'Pink', hex: '#ff5fa2' },
]

// Turn a stored color name into its hex value (e.g. "Sky Blue" -> "#4fc3f7").
export const colorHex = (name) => COLORS.find((c) => c.name === name)?.hex
