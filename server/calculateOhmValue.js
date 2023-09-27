const db = require('./db');

async function calculateOhmValue(
  bandAColor,
  bandBColor,
  multiplierColor,
  toleranceColor
) {
  const [bandA, bandB, multiplier, tolerance] = await Promise.all([
    db('resistor_colors').where('color', bandAColor).first(),
    db('resistor_colors').where('color', bandBColor).first(),
    db('resistor_colors').where('color', multiplierColor).first(),
    db('resistor_colors').where('color', toleranceColor).first(),
  ]);

  if (!bandA || !bandB || !multiplier || !tolerance) {
    throw new Error('Invalid color bands');
  }

  const ohmValue = (bandA.value * 10 + bandB.value) * multiplier.multiplier;

  return { ohmValue, tolerance: tolerance.tolerance };
}

module.exports = calculateOhmValue;
