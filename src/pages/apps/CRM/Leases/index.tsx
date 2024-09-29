import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import TenantLeases from './TenantLeases';
import LeaseAnalytics from './LeaseAnalytics';

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

const Leases: React.FC = () => {
  const [leases, setLeases] = useState<Lease[]>([]);

  useEffect(() => {
    // Fetch leases data here
    // For now, we'll use mock data
    const mockLeases: Lease[] = [
      {
        id: '1',
        property: 'Sunset Apartments',
        unit: 'A101',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        rentAmount: 50000,
        status: 'active',
        securityDeposit: 100000,
        tenantName: 'John Doe',
        leaseTerms: 'Standard 12-month lease',
        lastPaymentDate: '2023-08-01',
      },
      // Add more mock leases as needed
    ];
    setLeases(mockLeases);
  }, []);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'CRM', path: '/apps/crm/leases' },
          { label: 'Leases', path: '/apps/crm/leases', active: true },
        ]}
        title={'Leases Management'}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Tab.Container defaultActiveKey="leases">
                <Nav variant="pills" className="nav-bordered mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="leases">My Leases</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="analytics">Lease Analytics</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="leases">
                    <TenantLeases leases={leases} setLeases={setLeases} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="analytics">
                    <LeaseAnalytics leases={leases} />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Leases;