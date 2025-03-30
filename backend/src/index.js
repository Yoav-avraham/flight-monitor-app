const express = require('express'); //import of express for running a server
const mongoose = require('mongoose'); //improt of mongoose for using momngoDB
const Metric = require('./models/Metric'); //import of the mongoDB object model
const cors = require('cors');  //import cors for connection between backend and frontend
require('dotenv').config(); //loading .env data

const app = express(); //creating express application
app.use(cors());  //for all requests use cors
app.use(express.json());//allowing reading json requests

const mongoURI = process.env.MONGO_URI; //loading the .env data into variables
const port = process.env.PORT || 5000;

//connecting to mongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

//route for adding new flight metrics
app.post('/add-metrics', async (req, res) => {
  const { altitude, his, adi } = req.body;

  //checking if all metrics were sent
  if (!altitude || !his || !adi) {
    return res.status(400).json({ message: 'Missing required fields: altitude, his, adi' });
  }

  const newMetric = new Metric({
    altitude,
    his,
    adi,
    timestamp: new Date(),
  });

  //trying to add the data into the DB
  try {
    await newMetric.save();
    res.status(201).json({ message: 'Metric data added successfully', data: newMetric });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data', error });
  }
});

//running the server and listening for requests
app.listen(port,'0.0.0.0' ,() => {
  console.log(`Server is running on port ${port}`);
});
