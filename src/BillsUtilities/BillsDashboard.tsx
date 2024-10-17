import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BillsDashboardProps {
  bills: any[];
}

const BillsDashboard: React.FC<BillsDashboardProps> = ({ bills }) => {
  const data = {
    labels: ['Electricity', 'Water', 'Property Tax', 'Management Fee', 'Insurance'],
    datasets: [
      {
        data: [400, 300, 300, 200, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 20,
        },
      },
      title: {
        display: true,
        text: 'Cost Breakdown',
        font: {
          size: 16,
        },
      },
    },
  };

  const totalCost = data.datasets[0].data.reduce((sum, value) => sum + value, 0);

  return (
    <Row>
      <Col lg={4} md={4} sm={12}>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="card-title">Total Bills & Utilities</h5>
            <h2>${totalCost.toLocaleString()}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} md={4} sm={12}>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="card-title">Upcoming Bills</h5>
            <h2>5</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} md={4} sm={12}>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="card-title">Overdue Bills</h5>
            <h2>2</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Cost Breakdown</h5>
            <div style={{ height: '300px', position: 'relative' }}>
              <Pie data={data} options={options} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default BillsDashboard;