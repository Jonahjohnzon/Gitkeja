import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Form, Table, Badge, Modal, Alert } from 'react-bootstrap';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import PageTitle from '../../../components/PageTitle';
import { generatePDF } from '../../../utils/pdfGenerator';
import { generateInvoice, sendInvoice, downloadInvoicePDF, Invoice } from './invoiceService';
import { generateReceipt, downloadReceiptPDF, Receipt } from './receiptService';
import { sendPaymentReminder } from './reminderService';
import WaterMeterReadingForm from './WaterMeterReadingForm';
import { WaterMeterReadingData } from '../../../types';
interface RentPayment {
  id: number;
  tenantName: string;
  propertyName: string;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod: string;
  invoiceId?: number;
  receiptId?: number;
  waterMeterReading?: WaterMeterReadingData;
}

// Mock data - replace with API call in production
const mockRentPayments: RentPayment[] = [
  {
    id: 1,
    tenantName: 'John Doe',
    propertyName: 'Sunset Apartments',
    amount: 1500,
    dueDate: '2024-09-01',
    paymentDate: '2024-08-28',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 2,
    tenantName: 'Jane Smith',
    propertyName: 'Lakeside Villas',
    amount: 2000,
    dueDate: '2024-09-01',
    paymentDate: null,
    status: 'Pending',
    paymentMethod: 'M-Pesa',
  },
  // Add more mock data as needed
];

const RentPayments: React.FC = () => {
  const [rentPayments, setRentPayments] = useState<RentPayment[]>(mockRentPayments);
  const [filteredPayments, setFilteredPayments] = useState<RentPayment[]>(mockRentPayments);
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('All');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showWaterMeterModal, setShowWaterMeterModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Filter the payments based on date range and status
  const filterPayments = useCallback(() => {
    let filtered = rentPayments;

    // Date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        (payment) => payment.dueDate >= dateRange.start && payment.dueDate <= dateRange.end
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [rentPayments, dateRange, statusFilter]);

  // Fetch rent payments (could replace with actual API call)
  useEffect(() => {
    setRentPayments(mockRentPayments);
    setFilteredPayments(mockRentPayments);
  }, []);

  useEffect(() => {
    filterPayments();
  }, [dateRange, statusFilter, rentPayments, filterPayments]);

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const generateReport = () => {
    generatePDF(filteredPayments, 'Rent Payments Report');
  };

  // Generate invoice for a payment
  const handleGenerateInvoice = async (payment: RentPayment) => {
    if (!payment.waterMeterReading) {
      setError('Please enter water meter readings before generating an invoice.');
      return;
    }
    setLoading(true);
    try {
      const invoice = await generateInvoice(payment, payment.waterMeterReading);
      const updatedPayments = rentPayments.map(p =>
        p.id === payment.id ? { ...p, invoiceId: invoice.id } : p
      );
      setRentPayments(updatedPayments);
      setSelectedPayment({ ...payment, invoiceId: invoice.id });
      setShowInvoiceModal(true);
      await downloadInvoicePDF(invoice);
      setSuccess('Invoice generated and downloaded successfully.');
    } catch (error) {
      console.error('Error generating invoice:', error);
      setError('Failed to generate invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate receipt for a payment
  const handleGenerateReceipt = async (payment: RentPayment) => {
    if (!payment.waterMeterReading) {
      setError('Please enter water meter readings before generating a receipt.');
      return;
    }
    setLoading(true);
    try {
      const receipt = await generateReceipt(payment, {
        previousReading: payment.waterMeterReading.previousReading,
        currentReading: payment.waterMeterReading.currentReading,
      });
      const updatedPayments = rentPayments.map(p =>
        p.id === payment.id ? { ...p, receiptId: receipt.id } : p
      );
      setRentPayments(updatedPayments);
      setSelectedPayment({ ...payment, receiptId: receipt.id });
      setShowReceiptModal(true);
      downloadReceiptPDF(receipt);
      setSuccess('Receipt generated and downloaded successfully.');
    } catch (error) {
      console.error('Error generating receipt:', error);
      setError('Failed to generate receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Send invoice
  const handleSendInvoice = async (payment: RentPayment) => {
    if (!payment.invoiceId) {
      setError('No invoice found for this payment.');
      return;
    }
    setLoading(true);
    try {
      await sendInvoice(payment.invoiceId);
      setSuccess('Invoice sent successfully.');
    } catch (error) {
      console.error('Error sending invoice:', error);
      setError('Failed to send invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Send payment reminder
  const handleSendReminder = async (payment: RentPayment) => {
    setLoading(true);
    try {
      await sendPaymentReminder(payment);
      setSuccess('Payment reminder sent successfully.');
    } catch (error) {
      console.error('Error sending reminder:', error);
      setError('Failed to send reminder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle water meter reading submission
  const handleWaterMeterReadingSubmit = (readingData: WaterMeterReadingData) => {
    if (selectedPayment) {
      const updatedPayments = rentPayments.map(p =>
        p.id === selectedPayment.id ? { ...p, waterMeterReading: readingData } : p
      );
      setRentPayments(updatedPayments);
      setSelectedPayment({ ...selectedPayment, waterMeterReading: readingData });
      setShowWaterMeterModal(false);
      setSuccess('Water meter reading saved successfully.');
    }
  };

  // Summary statistics
  const totalRentCollected = filteredPayments
    .filter((payment) => payment.status === 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingPayments = filteredPayments.filter(
    (payment) => payment.status === 'Pending'
  ).length;

  const overduePayments = filteredPayments.filter(
    (payment) => payment.status === 'Overdue'
  ).length;

  // Chart data
  const chartData = {
    paid: filteredPayments.filter((payment) => payment.status === 'Paid').length,
    pending: pendingPayments,
    overdue: overduePayments,
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Paid', 'Pending', 'Overdue'],
    colors: ['#28a745', '#ffc107', '#dc3545'],
    legend: {
      position: 'bottom',
    },
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Home', path: '/' },
          { label: 'Rent Payments', path: '/rent-payments', active: true },
        ]}
        title={'Rent Payments'}
      />

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">Rent Payment Summary</h4>
              <Row>
                <Col md={4}>
                  <div className="text-center">
                    <h3>${totalRentCollected.toLocaleString()}</h3>
                    <p className="text-muted">Total Rent Collected</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <h3>{pendingPayments}</h3>
                    <p className="text-muted">Pending Payments</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <h3>{overduePayments}</h3>
                    <p className="text-muted">Overdue Payments</p>
                  </div>
                </Col>
              </Row>
              <div className="mt-3">
                <Chart
                  options={chartOptions}
                  series={[chartData.paid, chartData.pending, chartData.overdue]}
                  type="donut"
                  height={300}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="header-title">Rent Payment History</h4>
                <Button variant="primary" onClick={generateReport}>
                  Generate Report
                </Button>
              </div>

              <Form className="mb-3">
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={handleDateRangeChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={handleDateRangeChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                      >
                        <option value="All">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>

              <Table responsive className="table-centered mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tenant</th>
                    <th>Property</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.tenantName}</td>
                      <td>{payment.propertyName}</td>
                      <td>${payment.amount.toLocaleString()}</td>
                      <td>{format(new Date(payment.dueDate), 'MMM dd, yyyy')}</td>
                      <td>
                        {payment.paymentDate
                          ? format(new Date(payment.paymentDate), 'MMM dd, yyyy')
                          : '-'}
                      </td>
                      <td>
                        <Badge
                          bg={
                            payment.status === 'Paid'
                              ? 'success'
                              : payment.status === 'Pending'
                                ? 'warning'
                                : 'danger'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </td>
                      <td>{payment.paymentMethod}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowWaterMeterModal(true);
                          }}
                          className="me-1 mb-1"
                        >
                          Water Meter
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleGenerateInvoice(payment)}
                          className="me-1 mb-1"
                          disabled={!payment.waterMeterReading || loading}
                        >
                          Generate Invoice
                        </Button>

                        {payment.status === 'Paid' && (
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => handleGenerateReceipt(payment)}
                            className="me-1 mb-1"
                            disabled={!payment.waterMeterReading || loading}
                          >
                            Generate Receipt
                          </Button>
                        )}
                        {payment.status !== 'Paid' && (
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => handleSendReminder(payment)}
                            className="me-1 mb-1"
                            disabled={loading}
                          >
                            Send Reminder
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Water Meter Reading Modal */}
      <Modal
        show={showWaterMeterModal}
        onHide={() => setShowWaterMeterModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Water Meter Reading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <WaterMeterReadingForm
              paymentId={selectedPayment.id}
              onSubmit={handleWaterMeterReadingSubmit}
              initialData={selectedPayment.waterMeterReading}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Invoice Preview Modal */}
      <Modal
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <h5>Invoice for {selectedPayment.tenantName}</h5>
              <p>Property: {selectedPayment.propertyName}</p>
              <p>Amount: ${selectedPayment.amount.toLocaleString()}</p>
              <p>Due Date: {format(new Date(selectedPayment.dueDate), 'MMM dd, yyyy')}</p>
              {selectedPayment.waterMeterReading && (
                <>
                  <p>Previous Water Reading: {selectedPayment.waterMeterReading.previousReading}</p>
                  <p>Current Water Reading: {selectedPayment.waterMeterReading.currentReading}</p>
                  <p>Water Usage: {selectedPayment.waterMeterReading.currentReading - selectedPayment.waterMeterReading.previousReading} units</p>
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => selectedPayment && handleSendInvoice(selectedPayment)}
            disabled={loading}
          >
            Send Invoice
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Receipt Preview Modal */}
      <Modal
        show={showReceiptModal}
        onHide={() => setShowReceiptModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Receipt Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <h5>Receipt for {selectedPayment.tenantName}</h5>
              <p>Property: {selectedPayment.propertyName}</p>
              <p>Amount Paid: ${selectedPayment.amount.toLocaleString()}</p>
              <p>Payment Date: {selectedPayment.paymentDate ? format(new Date(selectedPayment.paymentDate), 'MMM dd, yyyy') : 'N/A'}</p>
              <p>Payment Method: {selectedPayment.paymentMethod}</p>
              {selectedPayment.waterMeterReading && (
                <>
                  <p>Water Meter Reading: {selectedPayment.waterMeterReading.currentReading}</p>
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReceiptModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentPayments;
