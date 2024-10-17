import React from 'react';
import { Table, Button } from 'react-bootstrap';

export interface Bill {
  id: number;
  type: string;
  amount: number;
  dueDate: string;
  status: string;
  property: string;
}

interface BillsListProps {
  bills: Bill[];
  loading: boolean;
  onAddBill: (newBill: Omit<Bill, 'id'>) => Promise<void>;
  onUpdateBill: (id: number, updatedBill: Partial<Bill>) => Promise<void>;
  onDeleteBill: (id: number) => Promise<void>;
}

const BillsList: React.FC<BillsListProps> = ({ bills, loading, onAddBill, onUpdateBill, onDeleteBill }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Property</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bills.map((bill) => (
          <tr key={bill.id}>
            <td>{bill.type}</td>
            <td>${bill.amount.toFixed(2)}</td>
            <td>{bill.dueDate}</td>
            <td>{bill.status}</td>
            <td>{bill.property}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => onUpdateBill(bill.id, bill)}>
                Edit
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => onDeleteBill(bill.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BillsList;