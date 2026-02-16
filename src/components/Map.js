import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, Typography, Tag, List, Collapse, Modal, Button } from 'antd';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle, Text } = Typography;
const { Panel } = Collapse;

// Function to generate mock daily usage data
const generateDailyUsage = (totalUsage) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const usage = Math.round(Math.random() * (totalUsage / 20));
    return usage;
  });
};

// Sample meter data
const meterData = [
  { id: 1, profileName: "Home 1", location: [7.2906, 80.6337], status: "active", usageSoFar: 150, meterType: "Smart", installationDate: "2023-01-15", region: "Central Province", district: "Kandy" },
  { id: 2, profileName: "Office 1", location: [6.9271, 79.8612], status: "active", usageSoFar: 500, meterType: "Smart", installationDate: "2023-02-20", region: "Western Province", district: "Colombo" },
  { id: 3, profileName: "Store 1", location: [7.4818, 80.3609], status: "inactive", usageSoFar: 50, meterType: "Smart", installationDate: "2023-03-10", region: "Central Province", district: "Matale" },
  { id: 4, profileName: "Restaurant", location: [6.8430, 79.9712], status: "active", usageSoFar: 800, meterType: "Smart", installationDate: "2023-01-05", region: "Western Province", district: "Colombo" },
  { id: 5, profileName: "School", location: [7.8731, 80.7718], status: "active", usageSoFar: 1200, meterType: "Smart", installationDate: "2022-12-10", region: "Central Province", district: "Nuwara Eliya" },
  { id: 6, profileName: "Hotel", location: [6.0174, 80.2489], status: "active", usageSoFar: 2500, meterType: "Smart", installationDate: "2023-03-01", region: "Southern Province", district: "Galle" },
  { id: 7, profileName: "Apartment 1", location: [7.5554, 80.7489], status: "active", usageSoFar: 75, meterType: "Smart", installationDate: "2023-04-15", region: "Central Province", district: "Kandy" },
  { id: 8, profileName: "Factory", location: [7.1824, 79.8864], status: "active", usageSoFar: 5000, meterType: "Industrial", installationDate: "2022-11-30", region: "Western Province", district: "Gampaha" },
  { id: 9, profileName: "Hospital", location: [6.9019, 79.8618], status: "active", usageSoFar: 3000, meterType: "Smart", installationDate: "2022-10-25", region: "Western Province", district: "Colombo" },
  { id: 10, profileName: "Home 2", location: [7.9228, 81.5618], status: "active", usageSoFar: 200, meterType: "Smart", installationDate: "2023-05-01", region: "Eastern Province", district: "Batticaloa" },
  { id: 11, profileName: "Mall", location: [6.8965, 79.8829], status: "active", usageSoFar: 4000, meterType: "Smart", installationDate: "2023-01-10", region: "Western Province", district: "Colombo" },
];

// Organize meters by region and district
const sriLankaRegions = meterData.reduce((acc, meter) => {
  if (!acc[meter.region]) acc[meter.region] = {};
  if (!acc[meter.region][meter.district]) acc[meter.region][meter.district] = [];
  acc[meter.region][meter.district].push(meter.id);
  return acc;
}, {});

const Map = () => {
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMeterSelect = (meterId) => {
    const meter = meterData.find(m => m.id === meterId);
    setSelectedMeter(meter);
    setIsModalVisible(true);
  };

  const markerElements = useMemo(
    () =>
      meterData.map(meter => (
        <CircleMarker
          key={meter.id}
          center={meter.location}
          radius={10}
          fillColor={meter.status === 'active' ? '#4CAF50' : '#F44336'}
          color={meter.status === 'active' ? '#2E7D32' : '#D32F2F'}
          weight={2}
          fillOpacity={0.8}
          eventHandlers={{
            
            click: () => handleMeterSelect(meter.id),
          }}
        >
          <Popup>
            <div>
              <strong>{meter.profileName}</strong>
              <br />
              <strong>Status:</strong> <Tag color={meter.status === 'active' ? 'green' : 'red'}>{meter.status}</Tag>
              <br />
              <strong>Usage:</strong> {meter.usageSoFar} kWh
            </div>
          </Popup>
        </CircleMarker>
      )),
    [meterData]
  );

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const chartData = useMemo(() => {
    if (!selectedMeter) return null;

    const dailyUsage = generateDailyUsage(selectedMeter.usageSoFar);
    return {
      labels: dailyUsage.map((_, index) => index + 1),
      datasets: [
        {
          label: 'Daily Usage (kWh)',
          data: dailyUsage,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  }, [selectedMeter]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ position: 'fixed', top: 0, right: 0, width: '25%', height: '100%', overflowY: 'auto' }}>
  <Card style={{ height: '100%', padding: '0' }}>
    <AntTitle level={4} style={{ padding: '16px' }}>Provinces & Districts</AntTitle>
    <Collapse accordion>
      {Object.entries(sriLankaRegions).map(([province, districts]) => (
        <Panel header={province} key={province}>
          <List
            dataSource={Object.entries(districts)}
            renderItem={([district, meterIds]) => (
              <List.Item key={district}>
                {district}
                {meterIds.map(meterId => (
                  <Tag
                    key={meterId}
                    color={meterData.find(m => m.id === meterId).status === 'active' ? 'green' : 'red'}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                    onClick={() => handleMeterSelect(meterId)}
                  >
                    {meterId}
                  </Tag>
                ))}
              </List.Item>
            )}
          />
        </Panel>
      ))}
    </Collapse>
  </Card>
</div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer
          center={[7.8731, 80.7718]}
          zoom={8}
          style={{ height: '100%', width: '140%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markerElements}
        </MapContainer>
      </div>

      <Modal
        title={selectedMeter ? `${selectedMeter.profileName} - Meter Details` : ''}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        {selectedMeter && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Text>
                  <strong>Meter ID:</strong> {selectedMeter.id}
                </Text>
                <br />
                <Text>
                  <strong>Meter Type:</strong> {selectedMeter.meterType}
                </Text>
                <br />
                <Text>
                  <strong>Status:</strong> <Tag color={selectedMeter.status === 'active' ? 'green' : 'red'}>{selectedMeter.status}</Tag>
                </Text>
                <br />
                <Text>
                  <strong>Installation Date:</strong> {selectedMeter.installationDate}
                </Text>
              </div>
              <div>
                <Text>
                  <strong>Usage So Far:</strong> {selectedMeter.usageSoFar} kWh
                </Text>
                <br />
                <Text>
                  <strong>Last Reading Date:</strong> {selectedMeter.lastReading}
                </Text>
                <br />
                <Text>
                  <strong>Billing Cycle:</strong> {selectedMeter.billingCycle}
                </Text>
                <br />
                <Text>
                  <strong>Tariff Plan:</strong> {selectedMeter.tariffPlan}
                </Text>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <AntTitle level={5}>Daily Usage for {currentMonth}</AntTitle>
              {chartData && (
                <div style={{ height: '300px' }}>
                  <Line data={chartData} options={{
                    scales: {
                      y: { title: { display: true, text: 'Usage (kWh)' } },
                      x: { title: { display: true, text: 'Day of Month' } }
                    },
                    maintainAspectRatio: false,
                  }} />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Map;
