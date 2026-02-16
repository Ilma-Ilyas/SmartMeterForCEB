import React, { useState } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Select, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText,
  Chip, Avatar, IconButton, Tooltip,
} from '@mui/material';
import {
  AssignmentInd, ErrorOutline,Nature, CheckCircleOutline,
  Lightbulb, CreditCard, Power, Router,NatureOutlined
} from '@mui/icons-material';

const initialTickets = [
  { id: 1, user: 'John Doe', issue: 'Bill discrepancy', status: 'Open', priority: 'Medium', lastUpdate: '2023-06-01' },
  { id: 2, user: 'Jane Smith', issue: 'Power outage', status: 'In Progress', priority: 'High', lastUpdate: '2023-06-03' },
  { id: 3, user: 'Bob Johnson', issue: 'Smart meter not responding', status: 'Resolved', priority: 'Low', lastUpdate: '2023-05-28' }
];

const priorityColors = {
  Low: 'info',
  Medium: 'warning',
  High: 'error',
};

const statusIcons = {
  Open: <ErrorOutline color="error" />,
  'In Progress': <NatureOutlined color="primary" />,
  Resolved: <CheckCircleOutline color="success" />,
};

const kbIcons = {
  faq: <Lightbulb />,
  billing: <CreditCard />,
  outage: <Power />,
  meter: <Router />,
};

const Support = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [newTicket, setNewTicket] = useState({ user: '', issue: '', priority: 'Low' });

  const handleInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticket = { ...newTicket, id: tickets.length + 1, status: 'Open', lastUpdate: new Date().toISOString().split('T')[0] };
    setTickets([...tickets, ticket]);
    setNewTicket({ user: '', issue: '', priority: 'Low' });
  };

  return (
    <div className="support">
      <Typography variant="h4" gutterBottom>
        Customer Support and Helpdesk
      </Typography>
      
      <Paper elevation={3} className="section">
        <Typography variant="h6" gutterBottom>Support Tickets</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Last Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map(ticket => (
                <TableRow key={ticket.id} hover>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>
                    <Chip
                      avatar={<Avatar>{ticket.user.split(' ').map(n => n[0]).join('')}</Avatar>}
                      label={ticket.user}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{ticket.issue}</TableCell>
                  <TableCell>
                    <Tooltip title={ticket.status}>
                      <IconButton size="small">{statusIcons[ticket.status]}</IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Chip label={ticket.priority} color={priorityColors[ticket.priority]} size="small" />
                  </TableCell>
                  <TableCell>{ticket.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={3} className="section">
        <Typography variant="h6" gutterBottom>Create New Ticket</Typography>
        <form onSubmit={handleSubmit} className="ticket-form">
          <TextField
            name="user"
            label="User Name"
            value={newTicket.user}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="issue"
            label="Issue Description"
            value={newTicket.issue}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            required
          />
          <Select
            name="priority"
            value={newTicket.priority}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <Button type="submit" variant="contained" color="primary">
            Submit Ticket
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} className="section">
        <Typography variant="h6" gutterBottom>Knowledge Base</Typography>
        <List>
          {Object.entries(kbIcons).map(([key, icon]) => (
            <ListItem key={key} button component="a" href={`#${key}`}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={key.replace(/^\w/, c => c.toUpperCase()).replace('-', ' ')} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Support;