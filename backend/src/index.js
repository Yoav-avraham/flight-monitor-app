const express = require('express');
const mongoose = require('mongoose');
const Metric = require('./models/Metric');
const cors = require('cors');  // הוספת CORS
require('dotenv').config(); 

const app = express();
app.use(cors());  // הפעלת CORS
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

app.post('/add-metrics', async (req, res) => {
  const { altitude, his, adi } = req.body;

  if (!altitude || !his || !adi) {
    return res.status(400).json({ message: 'Missing required fields: altitude, his, adi' });
  }

  const newMetric = new Metric({
    altitude,
    his,
    adi,
    timestamp: new Date(),
  });

  try {
    await newMetric.save();
    res.status(201).json({ message: 'Metric data added successfully', data: newMetric });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
