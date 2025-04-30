const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.get('/getAzimuth', async (req, res) => {
  const url = 'https://www.suncalc.org/#/13.0355,77.5892,13/2025.04.30/15:15/1/3';
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const azimuth = $('#azimuth-value').text();  // Modify this selector based on SunCalc page structure

    if (!azimuth) {
      res.status(500).send("Azimuth not found.");
      return;
    }

    res.json({ azimuth: parseFloat(azimuth) });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send("Error fetching azimuth.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
