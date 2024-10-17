import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const MaintenanceDashboard: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  };

  const series = [{
    name: 'Maintenance Costs',
    data: [4000, 3000, 5000, 4500, 3500, 5500]
  }];

  return (
    <Row>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Total Maintenance Costs</h5>
            <h2>$25,500</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Pending Requests</h5>
            <h2>12</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Completed Tasks</h5>
            <h2>45</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Maintenance Costs Over Time</h5>
            <Chart options={chartOptions} series={series} type="bar" height={350} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MaintenanceDashboard;