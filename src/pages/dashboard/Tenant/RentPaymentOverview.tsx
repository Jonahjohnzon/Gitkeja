import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { TenantData } from './data';
import StatisticsWidget3 from './StatisticsWidget3';

interface RentPaymentOverviewProps {
  data: TenantData;
}

const RentPaymentOverview: React.FC<RentPaymentOverviewProps> = ({ data }) => {
  const { currentBalance, nextPaymentDue, lastPayment } = data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(nextPaymentDue.date);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Rent Payment Overview</h4>
        <Row>
          <Col md={6} xl={3}>
            <StatisticsWidget3
              title="Current Balance"
              stats={currentBalance.toString()}
              trend={{
                label: 'Since last month',
                value: currentBalance > 0 ? 'Outstanding' : 'Paid',
                icon: currentBalance > 0 ? 'mdi mdi-arrow-up-bold' : 'mdi mdi-arrow-down-bold',
                variant: currentBalance > 0 ? 'danger' : 'success',
              }}
              counterOptions={{
                prefix: '$',
                separator: ',',
              }}
            />
          </Col>
          <Col md={6} xl={3}>
            <StatisticsWidget3
              title="Next Payment Due"
              stats={nextPaymentDue.amount.toString()}
              trend={{
                label: 'Due Date',
                value: formatDate(nextPaymentDue.date),
                icon: 'mdi mdi-calendar',
                variant: getDaysUntilDue() <= 7 ? 'warning' : 'info',
              }}
              counterOptions={{
                prefix: '$',
                separator: ',',
              }}
            />
          </Col>
          <Col md={6} xl={3}>
            <StatisticsWidget3
              title="Last Payment"
              stats={lastPayment.amount.toString()}
              trend={{
                label: 'Paid on',
                value: formatDate(lastPayment.date),
                icon: 'mdi mdi-check-circle',
                variant: 'success',
              }}
              counterOptions={{
                prefix: '$',
                separator: ',',
              }}
            />
          </Col>
          <Col md={6} xl={3}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <h5 className="mb-3">Quick Actions</h5>
                <Button variant="primary" className="mb-2 w-100">Pay Rent Now</Button>
                <Button variant="outline-secondary" className="w-100">View Payment History</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RentPaymentOverview;