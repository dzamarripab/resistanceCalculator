const baseColors = [
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
];
const preciousMetals = ['Gold', 'Silver'];

export const colorSets = {
  baseColors: baseColors,
  multiplierColors: [...baseColors, ...preciousMetals],
  toleranceColors: baseColors
    .filter((color) => color !== 'Black' && color !== 'White')
    .concat(preciousMetals),
};
