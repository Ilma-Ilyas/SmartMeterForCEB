// src/components/Customers.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faMoneyBill, faCalendarAlt, faEdit, faTrash, faExclamationTriangle, faHistory, faClock } from '@fortawesome/free-solid-svg-icons';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '071 234 5678', address: '123 Galle Road, Colombo', lastBill: 12550.00, dueDate: '2024-06-15', overdue: false, paymentHistory: [{ date: '2024-05-15', amount: 11200.00 }, { date: '2024-04-15', amount: 10800.00 }], averageConsumption: 350 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '077 987 6543', address: '456 Kandy Road, Kandy', lastBill: 9875.00, dueDate: '2024-06-10', overdue: true, paymentHistory: [{ date: '2024-05-10', amount: 10200.00 }, { date: '2024-04-10', amount: 9600.00 }], averageConsumption: 280 },
  { id: 3, name: 'David Williams', email: 'david@example.com', phone: '075 111 2222', address: '789 Beach Road, Galle', lastBill: 15200.00, dueDate: '2024-06-20', overdue: false, paymentHistory: [{ date: '2024-05-20', amount: 14800.00 }, { date: '2024-04-20', amount: 13900.00 }], averageConsumption: 420 },
  { id: 4, name: 'Emily Johnson', email: 'emily@example.com', phone: '071 333 4444', address: '567 Hill Street, Nuwara Eliya', lastBill: 7600.00, dueDate: '2024-06-05', overdue: true, paymentHistory: [{ date: '2024-05-05', amount: 8200.00 }, { date: '2024-04-05', amount: 7800.00 }], averageConsumption: 210 },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '077 555 6666', address: '890 Main Road, Jaffna', lastBill: 11200.00, dueDate: '2024-06-18', overdue: false, paymentHistory: [{ date: '2024-05-18', amount: 10900.00 }, { date: '2024-04-18', amount: 11500.00 }], averageConsumption: 310 },
  { id: 6, name: 'Sophia Davis', email: 'sophia@example.com', phone: '075 777 8888', address: '234 Palm Avenue, Negombo', lastBill: 13800.00, dueDate: '2024-06-12', overdue: true, paymentHistory: [{ date: '2024-05-12', amount: 12900.00 }, { date: '2024-04-12', amount: 13200.00 }], averageConsumption: 380 },
  { id: 7, name: 'Daniel Wilson', email: 'daniel@example.com', phone: '071 999 0000', address: '678 Temple Road, Matara', lastBill: 8900.00, dueDate: '2024-06-25', overdue: false, paymentHistory: [{ date: '2024-05-25', amount: 9200.00 }, { date: '2024-04-25', amount: 8700.00 }], averageConsumption: 250 },
  { id: 8, name: 'Olivia Martinez', email: 'olivia@example.com', phone: '077 123 4567', address: '345 Lake View, Anuradhapura', lastBill: 10600.00, dueDate: '2024-06-08', overdue: true, paymentHistory: [{ date: '2024-05-08', amount: 11200.00 }, { date: '2024-04-08', amount: 10100.00 }], averageConsumption: 300 },
  { id: 9, name: 'Ethan Anderson', email: 'ethan@example.com', phone: '075 890 1234', address: '901 River Road, Ratnapura', lastBill: 14200.00, dueDate: '2024-06-22', overdue: false, paymentHistory: [{ date: '2024-05-22', amount: 13800.00 }, { date: '2024-04-22', amount: 14500.00 }], averageConsumption: 400 },
  { id: 10, name: 'Ava Thomas', email: 'ava@example.com', phone: '071 567 8901', address: '543 Mountain View, Badulla', lastBill: 6800.00, dueDate: '2024-06-03', overdue: true, paymentHistory: [{ date: '2024-05-03', amount: 7200.00 }, { date: '2024-04-03', amount: 6500.00 }], averageConsumption: 190 },
  { id: 11, name: 'Alexander White', email: 'alexander@example.com', phone: '077 234 5678', address: '876 Ocean Drive, Trincomalee', lastBill: 12100.00, dueDate: '2024-06-28', overdue: false, paymentHistory: [{ date: '2024-05-28', amount: 11700.00 }, { date: '2024-04-28', amount: 12400.00 }], averageConsumption: 330 },
];

function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    if (filter === 'overdue') return customer.overdue;
    return true;
  });

  return (
    <div className="customers-container">
      <h1>Customer Management</h1>
      <div className="filter-bar">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All Customers</button>
        <button onClick={() => setFilter('overdue')} className={filter === 'overdue' ? 'active' : ''}>Overdue Bills</button>
      </div>
      <div className="customers-grid">
        <div className="customer-list">
          <h2>Customers</h2>
          <ul>
            {filteredCustomers.map(customer => (
              <li key={customer.id} onClick={() => setSelectedCustomer(customer)}>
                <FontAwesomeIcon icon={faUser} /> {customer.name}
                {customer.overdue && <FontAwesomeIcon icon={faExclamationTriangle} className="overdue-icon" title="Overdue Bill" />}
              </li>
            ))}
          </ul>
        </div>
        {selectedCustomer && (
          <div className="customer-details">
            <h2>Customer Details</h2>
            <div className="detail-item">
              <FontAwesomeIcon icon={faUser} /> <span className="detail-text">{selectedCustomer.name}</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faEnvelope} /> <span className="detail-text">{selectedCustomer.email}</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faPhone} /> <span className="detail-text">{selectedCustomer.phone}</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="detail-text">{selectedCustomer.address}</span>
            </div>
            <h3>Billing Information</h3>
            <div className="detail-item">
              <FontAwesomeIcon icon={faMoneyBill} /> <span className="detail-text">Last Bill: LKR {selectedCustomer.lastBill.toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faCalendarAlt} /> <span className="detail-text">Due Date: {selectedCustomer.dueDate}</span>
            </div>
            {selectedCustomer.overdue && (
              <div className="alert overdue-alert">
                <FontAwesomeIcon icon={faExclamationTriangle} /> Bill is overdue. Please pay as soon as possible to avoid disconnection.
              </div>
            )}
            <h3>Payment History</h3>
            <ul className="payment-history">
              {selectedCustomer.paymentHistory.map((payment, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={faHistory} /> {payment.date}: LKR {payment.amount.toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="detail-item">
              <FontAwesomeIcon icon={faClock} /> <span className="detail-text">Average Monthly Consumption: {selectedCustomer.averageConsumption} kWh</span>
            </div>
            <div className="actions">
              <button className="edit-btn"><FontAwesomeIcon icon={faEdit} /> Edit</button>
              <button className="delete-btn"><FontAwesomeIcon icon={faTrash} /> Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;