import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';

interface RevenueOverviewProps {
  data: FinancialData | null;
}

const RevenueOverview: React.FC<RevenueOverviewProps> = ({ data }) => {
  if (!data) return null;

  const totalRevenue = Math.round(data.cashFlowData.inflow.reduce((sum, val) => sum + val, 0));
  const averageRevenue = Math.round(totalRevenue / data.cashFlowData.inflow.length);

  const chartOptions: ApexOptions = {
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: { text: 'Revenue ($)' },
      labels: { formatter: (value) => `$${value.toLocaleString()}` }
    },
    title: { text: 'Monthly Revenue', align: 'left' },
    tooltip: {
      y: { formatter: (value) => `$${value.toLocaleString()}` }
    }
  };

  const series = [{
    name: 'Revenue',
    data: data.cashFlowData.inflow.map(Math.round)
  }];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Revenue Overview</h4>
        <Row>
          <Col lg={8}>
            <Chart options={chartOptions} series={series} type="bar" height={350} />
          </Col>
          <Col lg={4}>
            <div className="text-center mt-4">
              <h3>${totalRevenue.toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Revenue</p>
            </div>
            <div className="text-center mt-4">
              <h3>${averageRevenue.toLocaleString()}</h3>
              <p className="text-muted mb-0">Average Monthly Revenue</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RevenueOverview;