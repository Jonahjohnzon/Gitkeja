import React, { useState } from 'react';
import { Card, Table, Badge, Button, Alert, Modal, Form, Spinner } from 'react-bootstrap';
import { FileText, AlertTriangle, Plus, RefreshCw } from 'lucide-react';

// Define the Lease interface
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

interface TenantLeasesProps {
  leases: Lease[];
  setLeases: React.Dispatch<React.SetStateAction<Lease[]>>;
}

// AddLease component
interface AddLeaseProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (lease: Omit<Lease, 'id'>) => void;
}

const AddLease: React.FC<AddLeaseProps> = ({ show, onHide, onSubmit }) => {
  const [newLease, setNewLease] = useState<Omit<Lease, 'id'>>({
    property: '',
    unit: '',
    startDate: '',
    endDate: '',
    rentAmount: 0,
    status: 'active',
    securityDeposit: 0,
    tenantName: '',
    leaseTerms: '',
    lastPaymentDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newLease);
    setNewLease({
      property: '',
      unit: '',
      startDate: '',
      endDate: '',
      rentAmount: 0,
      status: 'active',
      securityDeposit: 0,
      tenantName: '',
      leaseTerms: '',
      lastPaymentDate: '',
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Lease</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Property</Form.Label>
            <Form.Control 
              type="text" 
              value={newLease.property}
              onChange={(e) => setNewLease({...newLease, property: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Control 
              type="text" 
              value={newLease.unit}
              onChange={(e) => setNewLease({...newLease, unit: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tenant Name</Form.Label>
            <Form.Control 
              type="text" 
              value={newLease.tenantName}
              onChange={(e) => setNewLease({...newLease, tenantName: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control 
              type="date" 
              value={newLease.startDate}
              onChange={(e) => setNewLease({...newLease, startDate: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control 
              type="date" 
              value={newLease.endDate}
              onChange={(e) => setNewLease({...newLease, endDate: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rent Amount</Form.Label>
            <Form.Control 
              type="number" 
              value={newLease.rentAmount}
              onChange={(e) => setNewLease({...newLease, rentAmount: Number(e.target.value)})}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Lease
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// LeaseDetails component
interface LeaseDetailsProps {
  show: boolean;
  onHide: () => void;
  lease: Lease;
}

const LeaseDetails: React.FC<LeaseDetailsProps> = ({ show, onHide, lease }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Lease Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Property:</strong> {lease.property}</p>
        <p><strong>Unit:</strong> {lease.unit}</p>
        <p><strong>Tenant:</strong> {lease.tenantName}</p>
        <p><strong>Start Date:</strong> {new Date(lease.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(lease.endDate).toLocaleDateString()}</p>
        <p><strong>Rent Amount:</strong> KES {lease.rentAmount.toLocaleString()}</p>
        <p><strong>Security Deposit:</strong> KES {lease.securityDeposit.toLocaleString()}</p>
        <p><strong>Status:</strong> {lease.status}</p>
        <p><strong>Last Payment Date:</strong> {new Date(lease.lastPaymentDate).toLocaleDateString()}</p>
        <p><strong>Lease Terms:</strong> {lease.leaseTerms}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

// Main TenantLeases component
const TenantLeases: React.FC<TenantLeasesProps> = ({ leases, setLeases }) => {
  const [showAddLease, setShowAddLease] = useState(false);
  const [showLeaseDetails, setShowLeaseDetails] = useState(false);
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddLease = (newLease: Omit<Lease, 'id'>) => {
    setLoading(true);
    setError(null);
    // Simulate API call delay
    setTimeout(() => {
      const addedLease: Lease = {
        ...newLease,
        id: (leases.length + 1).toString(),
      };
      setLeases((prevLeases) => [...prevLeases, addedLease]);
      setShowAddLease(false);
      setLoading(false);
    }, 1000);
  };

  const handleRenewLease = (leaseId: string) => {
    setLoading(true);
    setError(null);
    // Simulate API call delay
    setTimeout(() => {
      setLeases((prevLeases) =>
        prevLeases.map((lease) =>
          lease.id === leaseId ? { ...lease, status: 'active' } : lease
        )
      );
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status: Lease['status']) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'expiring':
        return <Badge bg="warning">Expiring Soon</Badge>;
      case 'expired':
        return <Badge bg="danger">Expired</Badge>;
    }
  };

  const openLeaseDetails = (lease: Lease) => {
    setSelectedLease(lease);
    setShowLeaseDetails(true);
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="header-title">My Leases</h4>
          <div>
            <Button variant="primary" size="sm" className="me-2" onClick={() => setShowAddLease(true)}>
              <Plus className="icon-dual icon-xs me-2" />
              Add New Lease
            </Button>
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Table responsive className="table-centered table-nowrap mb-0">
            <thead>
              <tr>
                <th>Property</th>
                <th>Unit</th>
                <th>Tenant</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rent Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leases.map((lease) => (
                <tr key={lease.id}>
                  <td>{lease.property}</td>
                  <td>{lease.unit}</td>
                  <td>{lease.tenantName}</td>
                  <td>{new Date(lease.startDate).toLocaleDateString()}</td>
                  <td>{new Date(lease.endDate).toLocaleDateString()}</td>
                  <td>KES {lease.rentAmount.toLocaleString()}</td>
                  <td>{getStatusBadge(lease.status)}</td>
                  <td>
                    <Button variant="light" size="sm" className="me-1" onClick={() => openLeaseDetails(lease)}>
                      <FileText className="icon-dual icon-xs" />
                      View
                    </Button>
                    {lease.status === 'expiring' && (
                      <Button variant="warning" size="sm" onClick={() => handleRenewLease(lease.id)}>
                        <AlertTriangle className="icon-dual icon-xs me-1" />
                        Renew
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>

      <AddLease
        show={showAddLease}
        onHide={() => setShowAddLease(false)}
        onSubmit={handleAddLease}
      />

      {selectedLease && (
        <LeaseDetails
          show={showLeaseDetails}
          onHide={() => setShowLeaseDetails(false)}
          lease={selectedLease}
        />
      )}
    </Card>
  );
};

export default TenantLeases;