import React, { useState } from 'react';
import axios from 'axios';
import Resistor from './Components/Resistor';
import './App.css';
import ColorDropdown from './Components/ColorDropdown';

function App() {
  const [bandAColor, setBandAColor] = useState('');
  const [bandBColor, setBandBColor] = useState('');
  const [multiplierColor, setMultiplierColor] = useState('');
  const [toleranceColor, setToleranceColor] = useState('');
  const [ohmValue, setOhmValue] = useState(null);
  const [tolerance, setTolerance] = useState(null);
  const [error, setError] = useState(null);

  const calculateOhmValue = () => {
    axios
      .post('/calculate', {
        bandAColor,
        bandBColor,
        multiplierColor,
        toleranceColor,
      })
      .then((response) => {
        const { ohmValue, tolerance } = response.data;
        if (ohmValue != null && tolerance != null) {
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

  const bandConfigurations = [
    {
      label: 'Band A Color:',
      value: bandAColor,
      setter: setBandAColor,
      colors: 'baseColors',
    },
    {
      label: 'Band B Color:',
      value: bandBColor,
      setter: setBandBColor,
      colors: 'baseColors',
    },
    {
      label: 'Multiplier Color:',
      value: multiplierColor,
      setter: setMultiplierColor,
      colors: 'multiplierColors',
    },
    {
      label: 'Tolerance Color:',
      value: toleranceColor,
      setter: setToleranceColor,
      colors: 'toleranceColors',
    },
  ];

  return (
    <div className="main-container">
      <div className="container">
        <div className="header">
          <h1>Resistor Ohm Value Calculator</h1>
        </div>

        <div className="selectors-wrapper">
          {bandConfigurations.map((config, index) => (
            <React.Fragment key={index}>
              <ColorDropdown
                key={config.label}
                label={config.label}
                value={config.value}
                onChange={(e) => config.setter(e.target.value)}
                colors={config.colors}
              />
            </React.Fragment>
          ))}
        </div>

        <div className="resistor-div">
          <Resistor
            bandAColor={bandAColor}
            bandBColor={bandBColor}
            multiplierColor={multiplierColor}
            toleranceColor={toleranceColor}
          />
        </div>

        <button className="button" onClick={calculateOhmValue}>
          Calculate
        </button>

        {error ? <div className="error">{error}</div> : null}
        {ohmValue != null && tolerance != null ? (
          <div className="results">
            <p>Ohm Value: {ohmValue} ohms</p>
            <p>Tolerance: {tolerance}%</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
