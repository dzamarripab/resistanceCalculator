require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const calculateOhmValueModule = require('./calculateOhmValue');

const app = express();

app.use(bodyParser.json());

app.post('/calculate', async (req, res) => {
  const { bandAColor, bandBColor, multiplierColor, toleranceColor } = req.body;

  if (!bandAColor || !bandBColor || !multiplierColor || !toleranceColor) {
    return res.status(400).json({ error: 'All color bands must be provided' });
  }

  try {
    const result = await calculateOhmValueModule(
      bandAColor,
      bandBColor,
      multiplierColor,
      toleranceColor
    );
    res.json(result);
  } catch (error) {
    console.error('Error calculating Ohm value:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the React app's build files
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle any other requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
