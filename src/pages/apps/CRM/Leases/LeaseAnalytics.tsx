import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

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

interface LeaseAnalyticsProps {
  leases: Lease[];
}

const LeaseAnalytics: React.FC<LeaseAnalyticsProps> = ({ leases }) => {
  // Calculate data for the charts
  const statusCounts = leases.reduce((acc, lease) => {
    acc[lease.status] = (acc[lease.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRent = leases.reduce((sum, lease) => sum + lease.rentAmount, 0);

  const rentByProperty = leases.reduce((acc, lease) => {
    acc[lease.property] = (acc[lease.property] || 0) + lease.rentAmount;
    return acc;
  }, {} as Record<string, number>);

  // Prepare chart options
  const statusChartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Active', 'Expiring', 'Expired'],
    colors: ['#28a745', '#ffc107', '#dc3545'],
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Rent',
              formatter: () => `KES ${totalRent.toLocaleString()}`,
            },
          },
        },
      },
    },
  };

  const statusChartSeries = [
    statusCounts['active'] || 0,
    statusCounts['expiring'] || 0,
    statusCounts['expired'] || 0,
  ];

  const rentByPropertyChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: Object.keys(rentByProperty),
    },
    colors: ['#4e73df'],
  };

  const rentByPropertyChartSeries = [{
    name: 'Rent Amount',
    data: Object.values(rentByProperty),
  }];

  return (
    <Row>
      <Col lg={6}>
        <Card>
          <Card.Body>
            <h4 className="header-title mb-3">Lease Status Overview</h4>
            <Chart 
              options={statusChartOptions} 
              series={statusChartSeries} 
              type="donut" 
              height={300} 
            />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <Card.Body>
            <h4 className="header-title mb-3">Rent by Property</h4>
            <Chart 
              options={rentByPropertyChartOptions} 
              series={rentByPropertyChartSeries} 
              type="bar" 
              height={300} 
            />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <h4 className="header-title mb-3">Lease Analytics Summary</h4>
            <Row>
              <Col md={3}>
                <h5>Total Leases</h5>
                <p className="text-muted">{leases.length}</p>
              </Col>
              <Col md={3}>
                <h5>Active Leases</h5>
                <p className="text-muted">{statusCounts['active'] || 0}</p>
              </Col>
              <Col md={3}>
                <h5>Expiring Leases</h5>
                <p className="text-muted">{statusCounts['expiring'] || 0}</p>
              </Col>
              <Col md={3}>
                <h5>Total Monthly Rent</h5>
                <p className="text-muted">KES {totalRent.toLocaleString()}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LeaseAnalytics;