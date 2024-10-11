import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';

interface ProfitabilityMetricsProps {
  data: FinancialData | null;
}

const ProfitabilityMetrics: React.FC<ProfitabilityMetricsProps> = ({ data }) => {
  if (!data) return null;

  const chartOptions: ApexOptions = {
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%'} },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Gross Profit Margin', 'Net Profit Margin', 'ROI'] },
    yaxis: { title: { text: 'Percentage (%)' } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val.toFixed(2)}%` } }
  };

  const series = [{
    name: 'Profitability Metrics',
    data: [
      data.profitabilityData.grossProfitMargin * 100,
      data.profitabilityData.netProfitMargin * 100,
      data.profitabilityData.roi * 100
    ]
  }];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Profitability Metrics</h4>
        <Chart options={chartOptions} series={series} type="bar" height={350} />
        <Row className="mt-3">
          <Col md={4}>
            <h5>Gross Profit Margin</h5>
            <p>{(data.profitabilityData.grossProfitMargin * 100).toFixed(2)}%</p>
          </Col>
          <Col md={4}>
            <h5>Net Profit Margin</h5>
            <p>{(data.profitabilityData.netProfitMargin * 100).toFixed(2)}%</p>
          </Col>
          <Col md={4}>
            <h5>Return on Investment (ROI)</h5>
            <p>{(data.profitabilityData.roi * 100).toFixed(2)}%</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProfitabilityMetrics;