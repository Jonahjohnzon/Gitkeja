import React from 'react';
import { Card, Table, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';

interface DocumentSummaryProps {
  data: FinancialData | null;
}

const DocumentSummary: React.FC<DocumentSummaryProps> = ({ data }) => {
  if (!data) return null;

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Number of Documents'
      }
    },
    legend: {
      position: 'top'
    }
  };

  const series = [
    {
      name: 'Receipts',
      data: data.documentTrends.receipts
    },
    {
      name: 'Invoices',
      data: data.documentTrends.invoices
    },
    {
      name: 'Reminders',
      data: data.documentTrends.reminders
    }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Document Summary</h4>
        <Row>
          <Col lg={6}>
            <Table responsive className="mb-0">
              <thead>
                <tr>
                  <th>Document Type</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Receipts</td>
                  <td>{data.documentCounts.receipts}</td>
                </tr>
                <tr>
                  <td>Invoices</td>
                  <td>{data.documentCounts.invoices}</td>
                </tr>
                <tr>
                  <td>Reminders</td>
                  <td>{data.documentCounts.reminders}</td>
                </tr>
              </tbody>
            </Table>
            <div className="mt-3">
              <p><strong>Average Payment Time:</strong> {data.averagePaymentTime} days</p>
              <p><strong>Collection Rate:</strong> {data.collectionRate.toFixed(2)}%</p>
            </div>
          </Col>
          <Col lg={6}>
            <Chart
              options={chartOptions}
              series={series}
              type="line"
              height={350}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DocumentSummary;