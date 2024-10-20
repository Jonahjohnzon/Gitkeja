import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { format } from 'date-fns';


export interface Bill {
  _id: string;
  type: string;
  amount: number;
  dueDate: Date;
  status: string;
  property: string;
}

interface BillsListProps {
  bills: Bill[];
  loading: boolean;
  onAddBill: (newBill: Omit<Bill, 'id'>) => Promise<void>;
  onUpdateBill: (_id: string, updatedBill: Partial<Bill>) => Promise<void>;
  onDeleteBill: (_id: string) => Promise<void>;
  load:boolean
}

const BillsList: React.FC<BillsListProps> = ({ bills, loading, onAddBill, onUpdateBill, onDeleteBill, load }) => {
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
          <tr key={bill._id}>
            <td>{bill.type}</td>
            <td>${bill.amount.toLocaleString()}</td>
            <td>{format(bill.dueDate, 'MMMM dd, yyyy' )}</td>
            <td>{bill.status}</td>
            <td>{bill.property}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => onUpdateBill(bill._id, bill)}>
                Edit
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => onDeleteBill(bill._id)} disabled={load}>
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