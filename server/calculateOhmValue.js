const db = require('./db');

async function calculateOhmValue(
  bandAColor,
  bandBColor,
  bandCColor,
  bandDColor
) {
  const [bandA, bandB, bandC, bandD] = await Promise.all([
    db('resistor_colors').where('color', bandAColor).first(),
    db('resistor_colors').where('color', bandBColor).first(),
    db('resistor_colors').where('color', bandCColor).first(),
    db('resistor_colors').where('color', bandDColor).first(),
  ]);

  if (!bandA || !bandB || !bandC || !bandD) {
    throw new Error('Invalid color bands');
  }

  const ohmValue = (bandA.value * 10 + bandB.value) * bandC.multiplier;

  return { ohmValue, tolerance: bandD.tolerance };
}

module.exports = calculateOhmValue;
