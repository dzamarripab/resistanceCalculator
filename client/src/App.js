import React, { useState } from 'react';
import axios from 'axios';
import Resistor from './Components/Resistor';
import './App.css';

const colors = [
  'Black',
  'Brown',
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Violet',
  'Gray',
  'White',
  'Gold',
  'Silver',
];

function ColorDropdown({ label, value, onChange }) {
  return (
    <div className="band-select">
      <label>{label}</label>
      <select className="select" value={value} onChange={onChange}>
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
}

function App() {
  const [bandAColor, setBandAColor] = useState('');
  const [bandBColor, setBandBColor] = useState('');
  const [bandCColor, setBandCColor] = useState('');
  const [bandDColor, setBandDColor] = useState('');
  const [ohmValue, setOhmValue] = useState(null);
  const [tolerance, setTolerance] = useState(null);
  const [error, setError] = useState(null);

  const calculateOhmValue = () => {
    axios
      .post('/calculate', { bandAColor, bandBColor, bandCColor, bandDColor })
      .then((response) => {
        const { ohmValue, tolerance } = response.data;
        if (ohmValue && tolerance) {
          setOhmValue(ohmValue);
          setTolerance(tolerance);
          setError(null);
        } else {
          setError(
            'Failed to calculate Ohm value, check the correct combination of colors'
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.error || err.response?.statusText);
      });
  };

  console.log('tolerance and ohmvalue', tolerance, ohmValue);

  const bandConfigurations = [
    { label: 'Band A Color:', value: bandAColor, setter: setBandAColor },
    { label: 'Band B Color:', value: bandBColor, setter: setBandBColor },
    { label: 'Band C Color:', value: bandCColor, setter: setBandCColor },
    { label: 'Band D Color:', value: bandDColor, setter: setBandDColor },
  ];

  return (
    <div className="main-container">
      <div className="container">
        <div className="header">
          <h1>Resistor Ohm Value Calculator</h1>
        </div>

        {bandConfigurations.map((band, index) => (
          <React.Fragment key={index}>
            <ColorDropdown
              label={band.label}
              value={band.value}
              onChange={(e) => band.setter(e.target.value)}
            />
          </React.Fragment>
        ))}

        <div className="color-bands">
          <Resistor
            bandAColor={bandAColor}
            bandBColor={bandBColor}
            bandCColor={bandCColor}
            bandDColor={bandDColor}
          />
        </div>

        <button className="button" onClick={calculateOhmValue}>
          Calculate
        </button>

        {error ? <div className="error">{error}</div> : null}
        {ohmValue && tolerance && (
          <div className="results">
            <p>Ohm Value: {ohmValue} ohms</p>
            <p>Tolerance: {tolerance}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
