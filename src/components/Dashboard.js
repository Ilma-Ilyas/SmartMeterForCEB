import React, { useState, useEffect } from 'react';
import RegionChart from './charts/RegionChart';
import CategoryChart from './charts/CategoryChart';
import { Card, Row, Col, Statistic, Carousel, Typography } from 'antd';
import { BulbOutlined, ThunderboltOutlined, FireOutlined, CloudOutlined } from '@ant-design/icons';
import '../App.css'; // Make sure to import the CSS

const { Title } = Typography;

const Dashboard = () => {
  const [regionData, setRegionData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Fetch data from your API or data source
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const contentType = response.headers.get('content-type');
    
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content-type, expected application/json');
        }
    
        const data = await response.json();
        setRegionData(data.regionData);
        setCategoryData(data.categoryData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const exampleRegionData = {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [{
      label: 'Energy Consumption (MWh)',
      data: [45000, 35000, 40000, 25200],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)']
    }]
  };

  const exampleCategoryData = {
    labels: ['Residential', 'Commercial', 'Industrial', 'Public Services'],
    datasets: [{
      label: 'Energy Usage (MWh)',
      data: [50000, 35000, 45000, 15200],
      backgroundColor: ['#8ECAE6', '#219EBC', '#023047', '#FFB703']
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: 2
        }
      },
      y: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: 2
        }
      }
    }
  };
  const energyStats = [
    { title: 'Total Energy Generated', value: 250000, suffix: 'MWh', icon: <BulbOutlined />, gradientStart: '#4a00e0', gradientEnd: '#8e2de2', borderColor: '#7928ca', shadowColor: 'rgba(121, 40, 202, 0.4)' },
    { title: 'Renewable Energy', value: 35, suffix: '%', icon: <ThunderboltOutlined />, gradientStart: '#00b09b', gradientEnd: '#96c93d', borderColor: '#4ade80', shadowColor: 'rgba(74, 222, 128, 0.4)' },
    { title: 'Carbon Emissions Saved', value: 150000, suffix: 'Tons', icon: <FireOutlined />, gradientStart: '#ff9966', gradientEnd: '#ff5e62', borderColor: '#ff5e62', shadowColor: 'rgba(255, 94, 98, 0.4)' },
    { title: 'Energy Efficiency', value: 85, suffix: '%', icon: <CloudOutlined />, gradientStart: '#0082c8', gradientEnd: '#00ffff', borderColor: '#00b4d8', shadowColor: 'rgba(0, 180, 216, 0.4)' },
  ];
  const newsItems = [
    { title: 'Smart Grid Expansion Project Approved', description: 'The government has approved a new smart grid expansion project to enhance energy distribution and efficiency.' },
    { title: 'Record-Breaking Renewable Energy Generation', description: 'Renewable energy sources have reached a new record, contributing to 40% of the total energy mix.' },
    { title: 'New Energy Storage Solutions Unveiled', description: 'Innovative energy storage solutions have been introduced to improve grid stability and reliability.' },
  ];

  return (
    <div className="dark-theme" style={{ backgroundColor: '#111111' }}>
      <Title level={2} style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>Smart Grid Dashboard</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title={
              <span style={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                fontSize: '18px',
                letterSpacing: '0.5px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
              }}>
                Consumption by Region
              </span>
            }
            style={{
              backgroundColor: '#1a2638',
              borderColor: '#2c4060',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              borderRadius: '8px'
            }}
            headStyle={{ 
              backgroundColor: '#2c4060', 
              borderTopLeftRadius: '8px', 
              borderTopRightRadius: '8px',
              padding: '12px 16px'
            }}
          >
            {regionData && regionData.labels && regionData.datasets ? (
              <RegionChart data={regionData} options={chartOptions} />
            ) : (
              <RegionChart data={exampleRegionData} options={chartOptions} />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <span style={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                fontSize: '18px',
                letterSpacing: '0.5px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
              }}>
                Usage by Category
              </span>
            }
            style={{
              backgroundColor: '#1a2638',
              borderColor: '#2c4060',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              borderRadius: '8px'
            }}
            headStyle={{ 
              backgroundColor: '#2c4060', 
              borderTopLeftRadius: '8px', 
              borderTopRightRadius: '8px',
              padding: '12px 16px'
            }}
          >
            {categoryData && categoryData.labels && categoryData.datasets ? (
              <CategoryChart data={categoryData} options={chartOptions} />
            ) : (
              <CategoryChart data={exampleCategoryData} options={chartOptions} />
            )}
          </Card>
        </Col>
      </Row>
  
      <Row gutter={16} style={{ marginTop: '16px' }}>
        {energyStats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card
              style={{
                background: `linear-gradient(135deg, ${stat.gradientStart} 0%, ${stat.gradientEnd} 100%)`,
                borderColor: stat.borderColor,
                boxShadow: `0 4px 12px ${stat.shadowColor}`,
                textAlign: 'center'
              }}
            >
              <Statistic
                title={<span style={{ color: '#ffffff', fontWeight: 'bold' }}>{stat.title}</span>}
                value={stat.value}
                suffix={stat.suffix}
                valueStyle={{ color: '#ffffff', fontSize: '28px', textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
              />
              {React.cloneElement(stat.icon, { style: { fontSize: '32px', color: '#ffffff', marginTop: '8px', filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' } })}
            </Card>
          </Col>
        ))}
      </Row>
  
      <Row style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card
            title={<span style={{ color: '#ffffff' }}>Latest News</span>}
            style={{ backgroundColor: '#1e293b', borderColor: '#334155', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
            headStyle={{ backgroundColor: '#334155' }}
          >
            <Carousel autoplay effect="fade">
              {newsItems.map((item, index) => (
                <div key={index} style={{ padding: '16px', background: 'linear-gradient(135deg, #3b4252 0%, #2e3440 100%)', borderRadius: '4px' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#e5e5e5', fontSize: '14px' }}>{item.description}</p>
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;