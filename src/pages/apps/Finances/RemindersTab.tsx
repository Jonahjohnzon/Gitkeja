import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Column } from 'react-table';
import { sendPaymentReminder } from './reminderService';
import { APICore } from '../../../helpers/api/apiCore';
import { RentPayment } from '../../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { AuthActionTypes } from '../../../redux/auth/constants';
import { authApiResponseSuccess } from '../../../redux/actions';
import TopDisplay from '../../../layouts/TopDisplay';
import PaginatedTable from '../../../components/PaginatedTable';

interface RemindersTabProps {
  initialData?: RentPayment[];
}

const RemindersTab: React.FC<RemindersTabProps> = ({ initialData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [reminders, setReminders] = useState<RentPayment[]>(initialData || []);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);
  const [loading, setLoading] = useState(false);
  const [reminderMethod, setReminderMethod] = useState<'email' | 'sms' | 'both'>('both');
  const [customMessage, setCustomMessage] = useState('');

  const api = useMemo(() => new APICore(), []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/getTenantInvoice');
      if (data.result) {
        setReminders(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, [fetchData, initialData]);

  const handleOpenModal = useCallback((payment: RentPayment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedPayment(null);
    setReminderMethod('both');
    setCustomMessage('');
  }, []);

  const handleSendReminder = useCallback(async (payment: RentPayment) => {
    setLoading(true);
    try {
      const { data } = await sendPaymentReminder(payment, { method: reminderMethod, message: customMessage });
      if (data.result) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
          topDisplay: true,
          topMessage: "Reminder sent",
          topColor: "primary",
        }));
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
      dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
        topDisplay: true,
        topMessage: "Failed to send reminder",
        topColor: "danger",
      }));
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  }, [dispatch, reminderMethod, customMessage, handleCloseModal]);

  const chartData = useMemo(() => [
    { name: 'Paid after reminder', value: 60 },
    { name: 'No response', value: 30 },
    { name: 'Payment plan arranged', value: 10 },
  ], []);

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: { type: 'pie' },
    labels: chartData.map(item => item.name),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }],
    colors: ['#28a745', '#dc3545', '#ffc107']
  }), [chartData]);

  const series = useMemo(() => chartData.map(item => item.value), [chartData]);

  const isDatePast = useCallback((date: string) => new Date(date) < new Date(), []);

  const getStatus = useCallback((payment: RentPayment) => {
    if (isDatePast(payment.leaseEndDate) && (payment.status === 'pending' || payment.status === 'incomplete')) {
      return 'Overdue';
    } else if (payment.status === 'pending' || payment.status === 'incomplete') {
      return payment.status.charAt(0).toUpperCase() + payment.status.slice(1);
    } else {
      return 'Paid';
    }
  }, [isDatePast]);

  const columns: Column<RentPayment>[] = useMemo(() => [
    { Header: 'Tenant', accessor: 'tenantName' },
    { Header: 'Property', accessor: (row: RentPayment) => `${row.propertyName}, ${row.unitNumber}` },
    { 
      Header: 'Amount Due', 
      accessor: 'amount',
      Cell: ({ value }: { value: number }) => `KES ${value.toLocaleString()}`
    },
    { 
      Header: 'Due Date', 
      accessor: 'leaseEndDate',
      Cell: ({ value }: { value: string }) => format(new Date(value), 'MMM dd, yyyy')
    },
    { 
      Header: 'Status', 
      accessor: (row: RentPayment) => getStatus(row)
    },
    {
      Header: 'Actions',
      Cell: ({ row }: { row: { original: RentPayment } }) => (
        <Button
          variant="warning"
          size="sm"
          onClick={() => handleOpenModal(row.original)}
          disabled={loading}
        >
          Send Reminder
        </Button>
      )
    }
  ], [loading, handleOpenModal, getStatus]);
   return (
    <>
      <TopDisplay />
      <Row className="mb-3">
        <Col md={6}>
          <h4>Reminder Effectiveness</h4>
          <Chart options={chartOptions} series={series} type="pie" height={300} />
        </Col>
        <Col md={6}>
          <h4>Reminder Statistics</h4>
          <ul>
            <li>Total Reminders Sent: {reminders.length}</li>
            <li>Successful Reminders: {Math.round(reminders.length * 0.6)}</li>
            <li>Average Response Time: 2 days</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <PaginatedTable columns={columns} data={reminders} pageSize={10} />
        </Col>
      </Row>
  
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Send Payment Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tenant</Form.Label>
                <Form.Control type="text" value={selectedPayment.tenantName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Property</Form.Label>
                <Form.Control type="text" value={selectedPayment.propertyName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount Due</Form.Label>
                <Form.Control type="text" value={`KES ${selectedPayment.amount.toLocaleString()}`} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="text" value={format(new Date(selectedPayment.leaseEndDate), 'MMM dd, yyyy')} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reminder Method</Form.Label>
                <Form.Select 
                  value={reminderMethod} 
                  onChange={(e) => setReminderMethod(e.target.value as 'email' | 'sms' | 'both')}
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="both">Both Email and SMS</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Custom Message (Optional)</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter a custom reminder message..."
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => selectedPayment && handleSendReminder(selectedPayment)}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reminder'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(RemindersTab);