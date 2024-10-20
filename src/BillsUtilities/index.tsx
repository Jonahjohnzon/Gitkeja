import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import BillsDashboard from './BillsDashboard';
import BillsList from './BillsList';
import BillForm from './BillForm';
import { getBills, addBill, updateBill, deleteBill } from '../services/billsService';

const BillsUtilitiesPage: React.FC = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);  
  const [sending, setSending] = useState(false)
  const [showBillForm, setShowBillForm] = useState(false);
  const [load, setLoad] = useState(false)
  
  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const {data} = await getBills();
      if(data.result){
      setBills(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setLoading(false);
    }
  };

  const handleAddBill = async (newBill: any) => {
    try {
      setSending(true)
      const {data} = await addBill(newBill);
      if(data.result)
      {
      setBills([data.data, ...bills]);
      setSending(false)
      setShowBillForm(false)
      }
    } catch (error) {
      console.error('Error adding bill:', error);
      setSending(false)
      setShowBillForm(false)

    }
  };

  const handleUpdateBill = async (_id: string, updatedBill: any) => {
    try {
      const response = await updateBill(_id, updatedBill);
      setBills(bills.map(bill => bill.id === _id ? response.data : bill));
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  const handleDeleteBill = async (_id: string) => {
    try {
      setLoad(true)
      const {data} = await deleteBill(_id);
      if(data.result)
      {
      setBills(bills.filter(bill => bill._id !== _id));
      setLoad(false)
      }
    } catch (error) {
      console.error('Error deleting bill:', error);
      setLoad(false)
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button variant="primary" onClick={() => setShowBillForm(true)}>
            Add New Bill
          </Button>
        </div>
        <BillsDashboard  />
        <BillsList
          bills={bills}
          loading={loading}
          onAddBill={handleAddBill}
          onUpdateBill={handleUpdateBill}
          onDeleteBill={handleDeleteBill}
          load={load}
        />
        <BillForm
          show={showBillForm}
          onHide={() => setShowBillForm(false)}
          onSubmit={handleAddBill}
          sending={sending}
        />
      </Container>
    </>
  );
};

export default BillsUtilitiesPage;