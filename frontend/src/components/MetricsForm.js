import React, { useState } from 'react';
import axios from 'axios';
import AircraftMonitor from './AircraftMonitor';
import './MetricForm.css';

const MetricForm = () => {
  const [altitude, setAltitude] = useState('');
  const [his, setHis] = useState('');
  const [adi, setAdi] = useState('');
  const [metricsSubmitted, setMetricsSubmitted] = useState(false);
  const [metricsData, setMetricsData] = useState(null);
  const [viewMode, setViewMode] = useState('text');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    //range validation
    if (altitude < 0 || altitude > 4000) {
      setErrorMessage('Altitude must be between 0 and 4000 meters.');
      return;
    }
    if (his < 0 || his > 360) {
      setErrorMessage('HIS value must be between 0 and 360.');
      return;
    }
    if (adi < 0 || adi > 100) {
      setErrorMessage('ADI value must be between 0 and 100.');
      return;
    }

    setErrorMessage(''); //reset error if the range is ok
     
    //sending the data to the route adding it to the db
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_IP}/add-metrics`, {
        altitude,
        his,
        adi,
      });

      setMetricsData({ altitude, his, adi });
      setMetricsSubmitted(true);
      setAltitude('');
      setHis('');
      setAdi('');
    } catch (error) {
      console.error('There was an error!', error);
      alert('Error submitting metrics. Please try again.');
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleAddNewMetrics = () => {
    setMetricsSubmitted(false);
    setAltitude('');
    setHis('');
    setAdi('');
  };

  return (
    <div className="form-container">
      {!metricsSubmitted ? (
        <form onSubmit={handleSubmit} className="metric-form">
          <div className="form-group">
            <label>Altitude (m):</label>
            <input
              type="number"
              value={altitude}
              onChange={(e) => setAltitude(e.target.value)}
              className="form-input"
              placeholder="Enter altitude"
              required
            />
          </div>
          <div className="form-group">
            <label>HIS Value:</label>
            <input
              type="number"
              value={his}
              onChange={(e) => setHis(e.target.value)}
              className="form-input"
              placeholder="Enter HIS value"
              required
            />
          </div>
          <div className="form-group">
            <label>ADI Value:</label>
            <input
              type="number"
              value={adi}
              onChange={(e) => setAdi(e.target.value)}
              className="form-input"
              placeholder="Enter ADI value"
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="submit-button">Submit Metrics</button>
        </form>
      ) : (
        <div className="metrics-display">
          <div className="button-container-top">
            <button onClick={handleAddNewMetrics}>+</button>
            <button onClick={() => handleViewChange('text')}>Text</button>
            <button onClick={() => handleViewChange('visual')}>Visual</button>
          </div>

          {viewMode === 'text' ? (
            <div className="metrics-row">
              <div className="metric-box">
                <h2>Altitude:</h2>
                <p>{metricsData.altitude} m</p>
              </div>
              <div className="metric-box">
                <h2>HIS Value:</h2>
                <p>{metricsData.his}</p>
              </div>
              <div className="metric-box">
                <h2>ADI Value:</h2>
                <p>{metricsData.adi}</p>
              </div>
            </div>
          ) : (
            <AircraftMonitor metricsData={metricsData} />
          )}
        </div>
      )}
    </div>
  );
};

export default MetricForm;
