import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const RegionChart = ({ data, options }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RegionChart;
