import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import WaterMeterReadingsTab from './WaterMeterReadingsTab';
import InvoicingTab from './InvoicingTab';
import ReceiptsTab from './ReceiptsTab';
import RemindersTab from './RemindersTab';
import ErrorMessage from '../../../components/ErrorMessage';
import Loading from '../../../layouts/Loading';
import { mockRentPayments, mockInvoices, mockReceipts, mockReminders } from '../../../mocks/rentPaymentData';

const RentPayments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('water-meter');
  const [error, setError] = useState<string | null>(null);

  // Simulating loading state
  const [isLoading, setIsLoading] = useState(false);

  //TenateState


  // In a real application, you would fetch this data from an API
  const data = {
    rentPayments: mockRentPayments,
    invoices: mockInvoices,
    receipts: mockReceipts,
    reminders: mockReminders,
  };



  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;


  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Home', path: '/' },
          { label: 'Rent Payments', path: '/rent-payments', active: true },
        ]}
        title={'Rent Payments'}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'water-meter')}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="water-meter">Water Meter Readings</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="invoicing">Invoicing</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="receipts">Receipts</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reminders">Reminders</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="water-meter">
                    <WaterMeterReadingsTab  />
                  </Tab.Pane>
                  <Tab.Pane eventKey="invoicing">
                    <InvoicingTab  />
                  </Tab.Pane>
                  <Tab.Pane eventKey="receipts">
                    <ReceiptsTab  />
                  </Tab.Pane>
                  <Tab.Pane eventKey="reminders">
                    <RemindersTab data={data.rentPayments} />
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

export default RentPayments;