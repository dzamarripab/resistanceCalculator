import { colorSets } from '../constants';

function ColorDropdown({ label, value, onChange, colors }) {
  const colorOptions = colorSets[colors] || [];

  return (
    <div className="band-select">
      <label>{label}</label>
      <select className="select" value={value} onChange={onChange}>
        <option value="">Select Color</option>
        {colorOptions.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ColorDropdown;
