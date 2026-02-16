import React from 'react';
import { billingData } from '../data/billingData';

function BillingInfo({ meterId }) {
  const bill = billingData.find(b => b.meterId === meterId);

  return (
    <div className="billing-info">
      <h4>Billing Information</h4>
      <p>Current Bill: ${bill.currentBill}</p>
      <p>Due Date: {bill.dueDate}</p>
      <p>Payment Status: {bill.paymentStatus}</p>
    </div>
  );
}

export default BillingInfo;