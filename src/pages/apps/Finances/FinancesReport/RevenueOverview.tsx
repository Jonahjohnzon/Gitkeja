import React, { useState } from 'react';
import { Card, Row, Col, Table, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData, Invoice, Receipt, Reminder } from './types';

interface RevenueOverviewProps {
  data: FinancialData | null;
}

type DocumentType = 'Invoices' | 'Receipts' | 'Reminders';

const RevenueOverview: React.FC<RevenueOverviewProps> = ({ data }) => {
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('Invoices');

  if (!data) return null;

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Amount ($)'
      },
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    title: {
      text: 'Revenue Overview',
      align: 'left'
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    fill: {
      opacity: 0.8
    }
  };

  const series = [
    {
      name: 'Revenue',
      data: data.revenueData.map(val => Math.round(val))
    }
  ];

  const renderDocumentList = () => {
    let documents: (Invoice | Receipt | Reminder)[];
    switch (selectedDocType) {
      case 'Invoices':
        documents = data.invoices;
        break;
      case 'Receipts':
        documents = data.receipts;
        break;
      case 'Reminders':
        documents = data.reminders;
        break;
    }

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tenant</th>
            <th>Property</th>
            <th>Amount</th>
            <th>Date</th>
            {selectedDocType === 'Reminders' && <th>Type</th>}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{doc.id}</td>
              <td>{doc.tenantName}</td>
              <td>{doc.propertyName}</td>
              <td>
                {selectedDocType !== 'Reminders'
                  ? `$${(doc as Invoice | Receipt).amount.toLocaleString()}`
                  : 'N/A'}
              </td>
              <td>
                {selectedDocType === 'Receipts'
                  ? (doc as Receipt).date
                  : (doc as Invoice | Reminder).dueDate}
              </td>
              {selectedDocType === 'Reminders' && <td>{(doc as Reminder).type}</td>}
              <td>{doc.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Revenue Overview</h4>
        <Row>
          <Col lg={8}>
            <Chart
              options={chartOptions}
              series={series}
              type="bar"
              height={350}
            />
          </Col>
          <Col lg={4}>
            <h5>Document Summary</h5>
            <Table>
              <tbody>
                <tr>
                  <td>Invoices</td>
                  <td>{data.documentCounts.invoices}</td>
                </tr>
                <tr>
                  <td>Receipts</td>
                  <td>{data.documentCounts.receipts}</td>
                </tr>
                <tr>
                  <td>Reminders</td>
                  <td>{data.documentCounts.reminders}</td>
                </tr>
              </tbody>
            </Table>
            <p><strong>Average Payment Time:</strong> {data.averagePaymentTime.toFixed(1)} days</p>
            <p><strong>Collection Rate:</strong> {(data.collectionRate * 100).toFixed(1)}%</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="primary" id="dropdown-document-type">
                {selectedDocType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedDocType('Invoices')}>Invoices</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedDocType('Receipts')}>Receipts</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedDocType('Reminders')}>Reminders</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {renderDocumentList()}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RevenueOverview;