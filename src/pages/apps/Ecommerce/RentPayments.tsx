import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tab, Nav, Alert } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { useRentPaymentsData } from '../../../hooks/useRentPaymentsData';
import WaterMeterReadingsTab from './WaterMeterReadingsTab';
import InvoicingTab from './InvoicingTab';
import ReceiptsTab from './ReceiptsTab';
import RemindersTab from './RemindersTab';
import ErrorMessage from '../../../components/ErrorMessage';
import Loading from '../../../layouts/Loading';

const RentPayments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('water-meter');
  const { data, isLoading, error } = useRentPaymentsData();

  if (isLoading) return <Loading/>;
  if (error) return <ErrorMessage message={error.message} />;

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
                    <WaterMeterReadingsTab data={data} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="invoicing">
                    <InvoicingTab data={data} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="receipts">
                    <ReceiptsTab data={data} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="reminders">
                    <RemindersTab data={data} />
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