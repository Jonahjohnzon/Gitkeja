import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

interface Lease {
    id: string;
    property: string;
    unit: string;
    startDate: string;
    endDate: string;
    rentAmount: number;
    status: 'active' | 'expiring' | 'expired';
    securityDeposit: number;
    tenantName: string;
    leaseTerms: string;
    lastPaymentDate: string;
  }
  

interface LeaseDetailsProps {
  lease: Lease;
  show: boolean;
  onHide: () => void;
}

const LeaseDetails: React.FC<LeaseDetailsProps> = ({ lease, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Lease Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Property:</strong> {lease.property}</ListGroup.Item>
          <ListGroup.Item><strong>Unit:</strong> {lease.unit}</ListGroup.Item>
          <ListGroup.Item><strong>Tenant:</strong> {lease.tenantName}</ListGroup.Item>
          <ListGroup.Item><strong>Start Date:</strong> {new Date(lease.startDate).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item><strong>End Date:</strong> {new Date(lease.endDate).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item><strong>Rent Amount:</strong> KES {lease.rentAmount.toLocaleString()}</ListGroup.Item>
          <ListGroup.Item><strong>Security Deposit:</strong> KES {lease.securityDeposit.toLocaleString()}</ListGroup.Item>
          <ListGroup.Item><strong>Status:</strong> {lease.status}</ListGroup.Item>
          <ListGroup.Item><strong>Last Payment Date:</strong> {new Date(lease.lastPaymentDate).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item><strong>Lease Terms:</strong> {lease.leaseTerms}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaseDetails;