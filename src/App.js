// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faChartLine, faCog, faHeadset, faTachometerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import MeterList from './components/MeterList';
import MeterDetails from './components/MeterDetails';
import Analytics from './components/Analytics';
import SystemManagement from './components/SystemManagement';
import Support from './components/Support';
import Customers from './components/Customers';
import './styles.css';

function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedMeter, setSelectedMeter] = useState(null);

  return (
    <Router>
      <div className="app">
        <nav className="side-nav">
          <div className="logo">SmartGrid</div>
          <ul>
            <li><Link to="/"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Link></li>
            <li><Link to="/map"><FontAwesomeIcon icon={faBolt} /> Smart Meters</Link></li>
            <li><Link to="/analytics"><FontAwesomeIcon icon={faChartLine} /> Analytics</Link></li>
            <li><Link to="/customers"><FontAwesomeIcon icon={faUsers} /> Customers</Link></li>
            <li><Link to="/system"><FontAwesomeIcon icon={faCog} /> System</Link></li>
            <li><Link to="/support"><FontAwesomeIcon icon={faHeadset} /> Support</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={
              <div className="map-layout">
                <Map onRegionSelect={setSelectedRegion} />
                {selectedRegion && <MeterList region={selectedRegion} onMeterSelect={setSelectedMeter} />}
                {selectedMeter && <MeterDetails meter={selectedMeter} />}
              </div>
            } />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/system" element={<SystemManagement />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;