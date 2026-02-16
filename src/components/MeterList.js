import React from 'react';
import meterData from '../data/meterData.json';

function MeterList({ region, onMeterSelect }) {
  const meters = meterData.filter(meter => meter.region === region);

  return (
    <div className="meter-list">
      <h3>{region} - Smart Meters</h3>
      <ul>
        {meters.map(meter => (
          <li key={meter.id} onClick={() => onMeterSelect(meter)}>
            {meter.id} - {meter.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeterList;
