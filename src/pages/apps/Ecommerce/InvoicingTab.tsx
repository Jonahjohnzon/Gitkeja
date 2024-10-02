import React, { useState } from 'react';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { RentPayment } from '../../../types';
import { generateInvoice, sendInvoice, downloadInvoicePDF } from './invoiceService';

interface InvoicingTabProps {
  data: RentPayment[];
}

const InvoicingTab: React.FC<InvoicingTabProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (payment: RentPayment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleGenerateInvoice = async (payment: RentPayment) => {
    if (!payment.waterMeterReading) {
      alert('Please enter water meter readings before generating an invoice.');
      return;
    }

    setLoading(true);
    try {
      const invoice = await generateInvoice(payment, payment.waterMeterReading);
      await downloadInvoicePDF(invoice);
      alert('Invoice generated and downloaded successfully.');
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Failed to generate invoice. Please try again.');
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleSendInvoice = async (invoiceId: number) => {
    setLoading(true);
    try {
      await sendInvoice(invoiceId);
      alert('Invoice sent successfully.');
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the chart
  const chartData = data.map(payment => ({
    x: format(new Date(payment.dueDate), 'MMM yyyy'),
    rent: payment.amount,
    water: payment.waterMeterReading ? 
      (payment.waterMeterReading.currentReading - payment.waterMeterReading.previousReading) * 100 : 0, // Assuming 100 KES per unit
    garbage: 500 // Assuming a fixed garbage collection fee
  }));

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true
    },
    xaxis: {
      categories: chartData.map(d => d.x),
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Amount (KES)'
      }
    },
    legend: {
      position: 'top'
    },
    title: {
      text: 'Invoice Amounts Over Time',
      align: 'left'
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    }
  };

  const series = [
    {
      name: 'Rent',
      data: chartData.map(d => d.rent)
    },
    {
      name: 'Water',
      data: chartData.map(d => d.water)
    },
    {
      name: 'Garbage',
      data: chartData.map(d => d.garbage)
    }
  ];

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Chart
            options={chartOptions}
            series={series}
            type="bar"
            height={350}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Property</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.tenantName}</td>
                  <td>{payment.propertyName}</td>
                  <td>${payment.amount.toLocaleString()}</td>
                  <td>{format(new Date(payment.dueDate), 'MMM dd, yyyy')}</td>
                  <td>{payment.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenModal(payment)}
                      disabled={loading}
                      className="me-2"
                    >
                      Generate Invoice
                    </Button>
                    {payment.invoiceId && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSendInvoice(payment.invoiceId!)}
                        disabled={loading}
                      >
                        Send Invoice
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Generate Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <p><strong>Tenant:</strong> {selectedPayment.tenantName}</p>
              <p><strong>Property:</strong> {selectedPayment.propertyName}</p>
              <p><strong>Amount:</strong> ${selectedPayment.amount.toLocaleString()}</p>
              <p><strong>Due Date:</strong> {format(new Date(selectedPayment.dueDate), 'MMM dd, yyyy')}</p>
              {selectedPayment.waterMeterReading && (
                <>
                  <p><strong>Water Usage:</strong> {selectedPayment.waterMeterReading.currentReading - selectedPayment.waterMeterReading.previousReading} units</p>
                </>
              )}
              <Button 
                variant="primary" 
                onClick={() => handleGenerateInvoice(selectedPayment)}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Invoice'}
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InvoicingTab;