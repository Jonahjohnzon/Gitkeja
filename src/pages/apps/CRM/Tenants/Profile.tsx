import React from "react";
import { Card, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { TenantDetails } from "./data";

interface ProfileProps {
  tenantDetails: TenantDetails;
}

const Profile: React.FC<ProfileProps> = ({ tenantDetails }) => {
  const getPaymentStatusBadge = (outstandingBalance: number) => {
    if (outstandingBalance === 0) {
      return <Badge bg="success">Paid</Badge>;
    } else {
      return <Badge bg="danger">Outstanding</Badge>;
    }
  };

  const getMaintenanceStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge bg="danger">Open</Badge>;
      case 'In Progress':
        return <Badge bg="warning">In Progress</Badge>;
      case 'Closed':
        return <Badge bg="success">Closed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex align-items-start mb-3">
          <img
            className="d-flex me-3 rounded-circle avatar-lg"
            src={tenantDetails.avatar}
            alt={tenantDetails.name}
          />
          <div className="w-100">
            <h4 className="mt-0 mb-1">{tenantDetails.name}</h4>
            <p className="text-muted">Tenant ID: {tenantDetails.id}</p>
            <p className="text-muted">
              <i className="mdi mdi-office-building"></i> Unit: {tenantDetails.unitNumber}
            </p>
            <Button variant="primary" size="sm" className="me-1">
              Send Message
            </Button>
            <Button variant="info" size="sm">
              Edit Profile
            </Button>
          </div>
        </div>

        <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
          <i className="mdi mdi-account-circle me-1"></i> Personal Information
        </h5>
        <Row>
          <Col md={6}>
            <p className="text-muted"><strong>Phone:</strong> <span className="ms-2">{tenantDetails.phone}</span></p>
          </Col>
          <Col md={6}>
            <p className="text-muted"><strong>Email:</strong> <span className="ms-2">{tenantDetails.email}</span></p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-muted"><strong>Occupants:</strong> <span className="ms-2">{tenantDetails.occupants}</span></p>
          </Col>
          <Col md={6}>
            <p className="text-muted"><strong>Pets:</strong> <span className="ms-2">{tenantDetails.pets ? 'Yes' : 'No'}</span></p>
          </Col>
        </Row>
        <p className="text-muted"><strong>Parking Space:</strong> <span className="ms-2">{tenantDetails.parkingSpace || 'N/A'}</span></p>

        <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
          <i className="mdi mdi-office-building me-1"></i> Lease Information
        </h5>
        <Row>
          <Col md={6}>
            <p className="text-muted"><strong>Start Date:</strong> <span className="ms-2">{tenantDetails.leaseInfo.startDate}</span></p>
          </Col>
          <Col md={6}>
            <p className="text-muted"><strong>End Date:</strong> <span className="ms-2">{tenantDetails.leaseInfo.endDate}</span></p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-muted"><strong>Rent Amount:</strong> <span className="ms-2">${tenantDetails.leaseInfo.rentAmount}</span></p>
          </Col>
          <Col md={6}>
            <p className="text-muted"><strong>Security Deposit:</strong> <span className="ms-2">${tenantDetails.leaseInfo.securityDeposit}</span></p>
          </Col>
        </Row>

        <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
          <i className="mdi mdi-currency-usd me-1"></i> Payment History
        </h5>
        <Row>
          <Col>
            <p className="text-muted"><strong>Last Payment Date:</strong> <span className="ms-2">{tenantDetails.paymentHistory.lastPaymentDate}</span></p>
            <p className="text-muted"><strong>Last Payment Amount:</strong> <span className="ms-2">${tenantDetails.paymentHistory.lastPaymentAmount}</span></p>
            <p className="text-muted"><strong>Payment Method:</strong> <span className="ms-2">{tenantDetails.paymentHistory.paymentMethod}</span></p>
            <p className="text-muted">
              <strong>Outstanding Balance:</strong> 
              <span className="ms-2">
                ${tenantDetails.paymentHistory.outstandingBalance} 
                {getPaymentStatusBadge(tenantDetails.paymentHistory.outstandingBalance)}
              </span>
            </p>
          </Col>
        </Row>

        <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
          <i className="mdi mdi-tools me-1"></i> Maintenance Requests
        </h5>
        <Table responsive className="table-sm table-centered mb-0">
          <thead>
            <tr>
              <th>Issue</th>
              <th>Status</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {tenantDetails.maintenanceRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.issue}</td>
                <td>{getMaintenanceStatusBadge(request.status)}</td>
                <td>{request.dateSubmitted}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
          <i className="mdi mdi-star me-1"></i> Tenant Score
        </h5>
        <p className="text-muted">
          <strong>Current Score:</strong> 
          <span className={`ms-2 ${
            tenantDetails.tenantScore >= 80 ? 'text-success' : 
            tenantDetails.tenantScore >= 60 ? 'text-warning' : 'text-danger'
          }`}>
            {tenantDetails.tenantScore}
          </span>
        </p>
      </Card.Body>
    </Card>
  );
};

export default Profile;