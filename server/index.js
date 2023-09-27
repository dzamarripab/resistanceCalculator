require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const calculateOhmValueModule = require('./calculateOhmValue');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/calculate', async (req, res) => {
  const { bandAColor, bandBColor, bandCColor, bandDColor } = req.body;

  if (!bandAColor || !bandBColor || !bandCColor || !bandDColor) {
    return res.status(400).json({ error: 'All color bands must be provided' });
  }

  try {
    const result = await calculateOhmValueModule(
      bandAColor,
      bandBColor,
      bandCColor,
      bandDColor
    );
    res.json(result);
  } catch (error) {
    console.error('Error calculating Ohm value:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the React app's build files
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle any other requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
