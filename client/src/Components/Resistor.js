function Resistor({ bandAColor, bandBColor, bandCColor, bandDColor }) {
  const height = 30;
  return (
    <svg width="300" height="100" viewBox="0 0 300 100">
      {/* Resistor body */}
      <rect
        x="50"
        y="40"
        width="200"
        height={height}
        fill="#e5e5e5"
        rx="10"
        ry="10"
      />

      {/* Resistor connectors */}
      <line x1="0" y1="55" x2="50" y2="55" stroke="#000" strokeWidth="3" />
      <line x1="250" y1="55" x2="300" y2="55" stroke="#000" strokeWidth="3" />

      {/* Color bands */}
      <rect
        x="70"
        y="40"
        width="15"
        height={height}
        fill={bandAColor || 'transparent'}
      />
      <rect
        x="95"
        y="40"
        width="15"
        height={height}
        fill={bandBColor || 'transparent'}
      />
      <rect
        x="120"
        y="40"
        width="15"
        height={height}
        fill={bandCColor || 'transparent'}
      />
      <rect
        x="145"
        y="40"
        width="15"
        height={height}
        fill={bandDColor || 'transparent'}
      />
    </svg>
  );
}

export default Resistor;
