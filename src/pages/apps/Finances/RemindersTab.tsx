import React, { useState } from 'react';
import { Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { sendPaymentReminder } from './reminderService';
import { Mock } from '../../../mocks/rentPaymentData';

interface RemindersTabProps {
  data?: Mock[];
}
const RemindersTab: React.FC<RemindersTabProps> = ({ data = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Mock | null>(null);
  const [loading, setLoading] = useState(false);
  const [reminderMethod, setReminderMethod] = useState<'email' | 'sms' | 'both'>('both');
  const [customMessage, setCustomMessage] = useState('');

  const handleOpenModal = (payment:Mock) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
    setReminderMethod('both');
    setCustomMessage('');
  };

  const handleSendReminder = async (payment: Mock) => {
    setLoading(true);
    try {
      await sendPaymentReminder(payment, { method: reminderMethod, message: customMessage });
      alert('Payment reminder sent successfully.');
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Failed to send reminder. Please try again.');
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  // Prepare data for the chart
  // In a real application, you would track the effectiveness of reminders
  // For this example, we'll use mock data
  const chartData = [
    { name: 'Paid after reminder', value: 60 },
    { name: 'No response', value: 30 },
    { name: 'Payment plan arranged', value: 10 },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: chartData.map(item => item.name),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    colors: ['#28a745', '#dc3545', '#ffc107']
  };

  const series = chartData.map(item => item.value);

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <h4>Reminder Effectiveness</h4>
          <Chart
            options={chartOptions}
            series={series}
            type="pie"
            height={300}
          />
        </Col>
        <Col md={6}>
          <h4>Reminder Statistics</h4>
          <ul>
            <li>Total Reminders Sent: {data.length}</li>
            <li>Successful Reminders: {Math.round(data.length * 0.6)}</li>
            <li>Average Response Time: 2 days</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Property</th>
                <th>Amount Due</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(payment => payment.status !== 'Paid').map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.tenantName}</td>
                  <td>{payment.propertyName}</td>
                  <td>KES {payment.amount.toLocaleString()}</td>
                  <td>{format(new Date(payment.dueDate), 'MMM dd, yyyy')}</td>
                  <td>{payment.status}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleOpenModal(payment)}
                      disabled={loading}
                    >
                      Send Reminder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
                <Form.Control type="text" value={format(new Date(selectedPayment.dueDate), 'MMM dd, yyyy')} readOnly />
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
              <Button 
                variant="primary" 
                onClick={() => handleSendReminder(selectedPayment)}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reminder'}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemindersTab;