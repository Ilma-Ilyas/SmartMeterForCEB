import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement } from 'chart.js';
import { Box, Typography, Grid, Paper, Select, MenuItem, FormControl, InputLabel, Button, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  height: '100%',
}));

function Analytics() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [timeRange, setTimeRange] = useState('6months');
  const [data, setData] = useState({
    regions: ['Downtown', 'Suburbs', 'Industrial', 'Commercial'],
    usageData: [4200, 3500, 6800, 5300],
    monthlyData: [3200, 3800, 4100, 3900, 4500, 5200],
    consumerTypes: ['Residential', 'Commercial', 'Industrial'],
    consumerData: [60, 25, 15],
  });

  useEffect(() => {
    // Simulate data fetching based on selected region and time range
    const fetchData = () => {
      // In a real application, this would be an API call
      const newData = { ...data };
      if (selectedRegion !== 'All') {
        const index = data.regions.indexOf(selectedRegion);
        newData.usageData = [data.usageData[index]];
        newData.regions = [selectedRegion];
      }
      if (timeRange === '1year') {
        newData.monthlyData = [...data.monthlyData, 5500, 5700, 5400, 5100, 4800, 4600];
      }
      setData(newData);
    };
    fetchData();
  }, [selectedRegion, timeRange]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Energy Consumption Data' }
    }
  };

  const barData = {
    labels: data.regions,
    datasets: [{ label: 'Total Usage (kWh)', data: data.usageData, backgroundColor: 'rgba(54, 162, 235, 0.6)' }]
  };

  const lineData = {
    labels: timeRange === '6months' ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ label: 'Monthly Usage (kWh)', data: data.monthlyData, borderColor: 'rgb(75, 192, 192)' }]
  };

  const pieData = {
    labels: data.consumerTypes,
    datasets: [{ data: data.consumerData, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }]
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const refreshData = () => {
    // Simulate data refresh
    const newUsageData = data.usageData.map(() => Math.floor(Math.random() * 3000) + 3000);
    setData({ ...data, usageData: newUsageData });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Data Analytics and Reporting</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select value={selectedRegion} onChange={handleRegionChange}>
              <MenuItem value="All">All Regions</MenuItem>
              {data.regions.map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select value={timeRange} onChange={handleTimeRangeChange}>
              <MenuItem value="6months">Last 6 Months</MenuItem>
              <MenuItem value="1year">Last 1 Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" onClick={refreshData} fullWidth>Refresh Data</Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Regional Usage</Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={barData} options={options} />
            </Box>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Monthly Usage Trend</Typography>
            <Box sx={{ height: 300 }}>
              <Line data={lineData} options={options} />
            </Box>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Consumer Type Distribution</Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={pieData} options={options} />
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Key Performance Indicators</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Total Consumption" secondary={`${data.usageData.reduce((a, b) => a + b, 0)} kWh`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Peak Usage Time" secondary="2 PM - 6 PM" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Energy Efficiency Score" secondary="82/100" />
              </ListItem>
            </List>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analytics;