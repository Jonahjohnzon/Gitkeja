import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import BillsDashboard from './BillsDashboard';
import BillsList from './BillsList';
import { getBills, addBill, updateBill, deleteBill } from '../services/billsService';

const BillsUtilitiesPage: React.FC = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await getBills();
      setBills(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setLoading(false);
    }
  };

  const handleAddBill = async (newBill: any) => {
    try {
      const response = await addBill(newBill);
      setBills([...bills, response.data]);
    } catch (error) {
      console.error('Error adding bill:', error);
    }
  };

  const handleUpdateBill = async (id: number, updatedBill: any) => {
    try {
      const response = await updateBill(id, updatedBill);
      setBills(bills.map(bill => bill.id === id ? response.data : bill));
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  const handleDeleteBill = async (id: number) => {
    try {
      await deleteBill(id);
      setBills(bills.filter(bill => bill.id !== id));
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Bills & Utilities', path: '/bills-utilities', active: true },
        ]}
        title={'Bills & Utilities'}
      />
      <Container>
        <BillsDashboard bills={bills} />
        <BillsList
          bills={bills}
          loading={loading}
          onAddBill={handleAddBill}
          onUpdateBill={handleUpdateBill}
          onDeleteBill={handleDeleteBill}
        />
      </Container>
    </>
  );
};

export default BillsUtilitiesPage;