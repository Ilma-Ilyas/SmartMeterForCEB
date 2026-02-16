import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ data, options }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryChart;
