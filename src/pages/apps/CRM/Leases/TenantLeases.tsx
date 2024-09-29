import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { FileText, AlertTriangle } from 'lucide-react';

interface Lease {
  id: string;
  property: string;
  unit: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  status: 'active' | 'expiring' | 'expired';
}

const TenantLeases: React.FC = () => {
  const [leases, setLeases] = useState<Lease[]>([]);

  useEffect(() => {
    // Fetch leases data from API
    // This is a placeholder. Replace with actual API call
    const fetchLeases = async () => {
      // Simulated API call
      const mockLeases: Lease[] = [
        {
          id: '1',
          property: 'Sunset Apartments',
          unit: 'A101',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          rentAmount: 50000,
          status: 'active',
        },
        {
          id: '2',
          property: 'Lakeside Villas',
          unit: 'B205',
          startDate: '2023-06-01',
          endDate: '2024-05-31',
          rentAmount: 75000,
          status: 'expiring',
        },
      ];
      setLeases(mockLeases);
    };
    fetchLeases();
  }, []);

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

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="header-title">My Leases</h4>
          <Button variant="primary" size="sm">
            <FileText className="icon-dual icon-xs me-2" />
            Request New Lease
          </Button>
        </div>
        <Table responsive className="table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th>Property</th>
              <th>Unit</th>
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
                <td>{new Date(lease.startDate).toLocaleDateString()}</td>
                <td>{new Date(lease.endDate).toLocaleDateString()}</td>
                <td>KES {lease.rentAmount.toLocaleString()}</td>
                <td>{getStatusBadge(lease.status)}</td>
                <td>
                  <Button variant="light" size="sm" className="me-1">
                    <FileText className="icon-dual icon-xs" />
                    View
                  </Button>
                  {lease.status === 'expiring' && (
                    <Button variant="warning" size="sm">
                      <AlertTriangle className="icon-dual icon-xs me-1" />
                      Renew
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TenantLeases;