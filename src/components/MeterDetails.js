import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { generateMockData, generateHistoricalData } from '../utils/mockDataGenerator';
import { gsap } from 'gsap';

function MeterDetails({ meter }) {
  const [usage, setUsage] = useState(0);
  const [historical, setHistorical] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUsage = generateMockData();
      setUsage(newUsage);
      setHistorical(prev => [...prev.slice(-19), newUsage]);
    }, 1000);

    setHistorical(generateHistoricalData());

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.to(".gauge-fill", { rotation: usage * 18, duration: 1, ease: "power2.out" });
  }, [usage]);

  const gaugeData = {
    labels: ['Usage', 'Available'],
    datasets: [{
      data: [usage, 10 - usage],
      backgroundColor: ['#4CAF50', '#E0E0E0'],
      borderWidth: 0,
      cutout: '80%'
    }]
  };

  const lineData = {
    labels: Array.from({ length: 20 }, (_, i) => i + 1),
    datasets: [{
      label: 'Usage Over Time',
      data: historical,
      borderColor: '#2196F3',
      tension: 0.1,
      fill: true,
      backgroundColor: 'rgba(33, 150, 243, 0.2)'
    }]
  };

  return (
    <div className="meter-details">
      <h3>Meter ID: {meter.id}</h3>
      <p className="status" data-status={meter.status}>
        Status: {meter.status}
      </p>
      <div className="usage-gauge">
        <Doughnut data={gaugeData} options={{ responsive: true, maintainAspectRatio: false }} />
        <div className="gauge-needle">
          <div className="gauge-fill"></div>
        </div>
        <div className="current-usage">{usage.toFixed(2)} kWh</div>
      </div>
      <div className="historical-chart">
        <h4>Usage Over Time</h4>
        <Line data={lineData} options={{ scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
}

export default MeterDetails;