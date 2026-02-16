import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Chip, LinearProgress,
  FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Grid, Card, CardContent,
  Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider, Box, Tooltip, Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload, Build, Refresh, Schedule, ElectricMeter, Done, Warning } from '@mui/icons-material';
import meterData from '../data/meterData.json';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: 'box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-5px)',
  },
  borderRadius: '12px',
  background: '#fff9f0', // Warm background color
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  overflow: 'hidden',
}));

const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: status === 'Online' ? '#4caf50' : '#f44336',
  ...(status === 'Online' && {
    animation: '$pulse 2s infinite',
  }),
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
    },
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  transition: 'transform 0.2s, color 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
    color: theme.palette.secondary.main,
  },
}));

const SystemManagement = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [firmwareVersion, setFirmwareVersion] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDevices(meterData.map(device => ({
          ...device,
          status: Math.random() > 0.2 ? 'Online' : 'Offline',
        })));
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to fetch devices', severity: 'error' });
      }
    };
    fetchData();
  }, []);

  const handleDialogOpen = (type, device) => {
    setSelectedDevice(device);
    setDialogType(type);
    setOpenDialog(true);
    setFirmwareVersion(type === 'firmware' ? 'v3.2.2' : '');
    setMaintenanceDate(type === 'maintenance' ? new Date().toISOString().split('T')[0] : '');
  };

  const handleAction = () => {
    if (dialogType === 'firmware') {
      setDevices(devices.map(d => 
        d.id === selectedDevice.id ? { ...d, firmware: firmwareVersion, lastUpdate: new Date().toISOString().split('T')[0] } : d
      ));
      setSnackbar({ open: true, message: `Firmware updated for device ${selectedDevice.id}`, severity: 'success' });
    } else {
      setSnackbar({ open: true, message: `Maintenance scheduled for device ${selectedDevice.id} on ${maintenanceDate}`, severity: 'info' });
    }
    setOpenDialog(false);
  };

  const systemHealth = [
    { label: 'Devices Online', value: '92%', icon: <Done color="success" />, color: '#4caf50' },
    { label: 'Network Latency', value: '38ms', icon: <Warning color="warning" />, color: '#ff9800' },
    { label: 'Data Accuracy', value: '99.8%', icon: <Done color="success" />, color: '#4caf50' },
  ];

  const maintenanceSchedule = [
    { date: '2023-06-10', time: '22:00-06:00', region: 'Downtown', type: 'Grid Upgrade' },
    { date: '2023-06-18', time: '10:00-14:00', region: 'SoMa', type: 'Meter Replacements' },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff3e0' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', marginBottom: 3, color: '#5d4037' }}>
        System Management
        <Tooltip title="Refresh data" arrow>
          <IconButton color="primary" onClick={() => window.location.reload()} sx={{ marginLeft: 2 }}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>Device Management</Typography>
            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Firmware</TableCell>
                    <TableCell>Last Update</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.map((device, index) => (
                    <StyledTableRow key={device.id} index={index}>
                      <TableCell>{device.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ElectricMeter sx={{ marginRight: 1 }} />
                          Smart Meter
                        </Box>
                      </TableCell>
                      <TableCell>
                        <StatusChip label={device.status} status={device.status} />
                      </TableCell>
                      <TableCell>{device.firmware || 'N/A'}</TableCell>
                      <TableCell>{device.lastUpdate || 'N/A'}</TableCell>
                      <TableCell>
                        <Tooltip title="Update Firmware" arrow>
                          <ActionButton size="small" onClick={() => handleDialogOpen('firmware', device)}>
                            <CloudUpload />
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="Schedule Maintenance" arrow>
                          <ActionButton size="small" onClick={() => handleDialogOpen('maintenance', device)}>
                            <Build />
                          </ActionButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3} sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>System Health</Typography>
            <List>
              {systemHealth.map(({ label, value, icon, color }) => (
                <ListItem key={label}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: color, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
                      {icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={label} secondary={value} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ marginRight: 1 }}>Overall System Health:</Typography>
              <LinearProgress variant="determinate" value={92} color="success" sx={{ flexGrow: 1 }} />
            </Box>
          </StyledPaper>

          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>Scheduled Maintenance</Typography>
            <List>
              {maintenanceSchedule.map((schedule, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#ffa726', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
                        <Schedule />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${schedule.date} (${schedule.time})`}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {schedule.region}
                          </Typography>
                          {` — ${schedule.type}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < maintenanceSchedule.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </StyledPaper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {dialogType === 'firmware' ? 'Update Firmware' : 'Schedule Maintenance'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'firmware' ? (
            <FormControl fullWidth margin="normal">
              <InputLabel>Firmware Version</InputLabel>
              <Select
                value={firmwareVersion}
                onChange={(e) => setFirmwareVersion(e.target.value)}
              >
                <MenuItem value="v3.2.1">v3.2.1</MenuItem>
                <MenuItem value="v3.2.2">v3.2.2</MenuItem>
                <MenuItem value="v3.3.0-beta">v3.3.0 (Beta)</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <FormControl fullWidth margin="normal">
              <InputLabel>Maintenance Date</InputLabel>
              <Select
                value={maintenanceDate}
                onChange={(e) => setMaintenanceDate(e.target.value)}
              >
                <MenuItem value="2023-06-15">2023-06-15</MenuItem>
                <MenuItem value="2023-06-22">2023-06-22</MenuItem>
                <MenuItem value="2023-06-29">2023-06-29</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAction} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SystemManagement;