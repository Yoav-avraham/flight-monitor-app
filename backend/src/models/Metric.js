// src/models/Metric.js
const mongoose = require('mongoose');

//creating new schema for the flight metric
const MetricSchema = new mongoose.Schema({
  altitude: { type: Number, required: true },
  his: { type: Number, required: true },
  adi: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Metric = mongoose.model('Metric', MetricSchema);

module.exports = Metric;
