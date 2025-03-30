import React from 'react';
import './AircraftMonitor.css';

const AircraftMonitor = ({ metricsData }) => {
  // Safely extract and convert values
  const altitude = Number(metricsData.altitude) || 0;
  const his = Number(metricsData.his) || 0;
  const adi = Number(metricsData.adi) || 0;

  // Calculate altitude position with precise scaling
  const calculateAltitudePosition = (alt) => {
    return Math.min(Math.max((alt / 4000) * 300, 0), 300);
  };

  // Precise color calculation for pitch to create a sliding effect
  const calculatePitchColor = (adiBand) => {
    // Ensure the value is between 0 and 100
    const normalizedAdi = Math.min(Math.max(adiBand, 0), 100);
    
    // Calculate the vertical shift based on the ADI value
    // At 0, no shift. At 100, full shift from top
    const verticalShift = normalizedAdi;
    
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      clipPath: `polygon(0 0, 100% 0, 100% ${verticalShift}%, 0 ${verticalShift}%)`,
      backgroundColor: 'blue',
      zIndex: 2
    };
  };

  const altitudePosition = calculateAltitudePosition(altitude);
  const pitchColorStyle = calculatePitchColor(adi);

  return (
    <div className="aircraft-monitor-container">
      <div className="aircraft-monitor">
        <div className="instrument-panel">
          {/* Altitude Indicator */}
          <div className="altitude-indicator">
            <div className="altitude-bar">
              <div className="altitude-scale">
                <div className="altitude-marker" style={{top: '0%'}}>4000</div>
                <div className="altitude-marker" style={{top: '25%'}}>3000</div>
                <div className="altitude-marker" style={{top: '50%'}}>2000</div>
                <div className="altitude-marker" style={{top: '75%'}}>1000</div>
                <div className="altitude-marker" style={{top: '100%'}}>0</div>
              </div>
              <div
                className="altitude-arrow"
                style={{
                  top: `${300 - altitudePosition}px`,
                }}
              />
            </div>
            <div className="altitude-value">{altitude.toFixed(0)}m</div>
          </div>
          
          {/* Horizontal Situation Indicator (HSI) */}
          <div className="hsi-indicator">
            <div className="compass-rose">
              <div className="compass-markers">
                <div className="marker-0">0</div>
                <div className="marker-45">45</div>
                <div className="marker-90">90</div>
                <div className="marker-135">135</div>
                <div className="marker-180">180</div>
                <div className="marker-225">225</div>
                <div className="marker-270">270</div>
                <div className="marker-315">315</div>
              </div>
              <div
                className="hsi-dynamic-arrow"
                style={{
                  transform: `rotate(${his}deg)`
                }}
              />
              <div className="hsi-fixed-arrow" />
            </div>
            <div className="hsi-value">{his}°</div>
          </div>
          
          {/* Attitude Direction Indicator (ADI) */}
          <div className="adi-indicator">
            {/* Green background */}
            <div 
              className="pitch-bands green-band"
            >
              <div className="pitch-markers">
                {[-30, -20, -10, 0, 10, 20, 30].map((angle) => (
                  <div
                    key={angle}
                    className="pitch-line"
                    style={{ bottom: `${50 + angle}%` }}
                  />
                ))}
              </div>
            </div>
            
            {/* Blue overlay */}
            <div
              className="pitch-bands blue-band"
              style={pitchColorStyle}
            />
            
            <div className="adi-value">{adi}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftMonitor;