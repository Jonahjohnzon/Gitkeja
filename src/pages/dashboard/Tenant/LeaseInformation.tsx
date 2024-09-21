import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { LeaseInfo } from './data';

interface LeaseInformationProps {
  data: LeaseInfo;
}

const LeaseInformation: React.FC<LeaseInformationProps> = ({ data }) => {
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(data.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleRenewalRequest = () => {
    // Here you would typically send the renewal request to your backend
    console.log('Renewal requested');
    setShowRenewalModal(false);
    // You might want to update the lease information or show a confirmation message
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Lease Information</h4>
        <Row>
          <Col md={6}>
            <p><strong>Start Date:</strong> {formatDate(data.startDate)}</p>
            <p><strong>End Date:</strong> {formatDate(data.endDate)}</p>
            <p><strong>Days Remaining:</strong> {getDaysRemaining()}</p>
          </Col>
          <Col md={6}>
            <p><strong>Monthly Rent:</strong> ${data.monthlyRent.toLocaleString()}</p>
            <p><strong>Security Deposit:</strong> ${data.securityDeposit.toLocaleString()}</p>
            <p><strong>Renewal Option:</strong> {data.renewalOption ? 'Available' : 'Not Available'}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="primary" className="me-2" onClick={() => setShowRenewalModal(true)}>
              Request Renewal
            </Button>
            <Button variant="secondary" onClick={() => setShowDocumentsModal(true)}>
              View Lease Documents
            </Button>
          </Col>
        </Row>

        {/* Renewal Request Modal */}
        <Modal show={showRenewalModal} onHide={() => setShowRenewalModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Request Lease Renewal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Current lease end date: {formatDate(data.endDate)}</p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Requested Renewal Period</Form.Label>
                <Form.Select>
                  <option>6 months</option>
                  <option>1 year</option>
                  <option>2 years</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional Comments</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRenewalModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRenewalRequest}>
              Submit Request
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Lease Documents Modal */}
        <Modal show={showDocumentsModal} onHide={() => setShowDocumentsModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Lease Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li><a href="#">Lease Agreement</a></li>
              <li><a href="#">Addendum 1 - Pet Policy</a></li>
              <li><a href="#">Addendum 2 - Parking Agreement</a></li>
              <li><a href="#">Move-In Inspection Report</a></li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDocumentsModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default LeaseInformation;