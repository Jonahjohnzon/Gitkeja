import React, { useState, useMemo } from 'react';
import { Card, Dropdown, Row, Col, Table, Tab, Tabs } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { UtilityUsage } from './data';

interface UtilityUsageChartProps {
  data: UtilityUsage[];
}

const UtilityUsageChart: React.FC<UtilityUsageChartProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>('chart');
  const [selectedMonth, setSelectedMonth] = useState<string>(data[data.length - 1].month);

  const calculateWaterUsage = (start: number, end: number) => end - start;

  const waterUsageData = useMemo(() => 
    data.map(item => ({
      month: item.month,
      usage: calculateWaterUsage(item.waterStartReading, item.waterEndReading)
    })),
    [data]
  );

  const getTotalWaterUsage = useMemo(() => 
    waterUsageData.reduce((sum, item) => sum + item.usage, 0),
    [waterUsageData]
  );

  const getAverageWaterUsage = useMemo(() => 
    getTotalWaterUsage / data.length,
    [getTotalWaterUsage, data.length]
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: data.map(item => item.month)
    },
    yaxis: [
      {
        title: { text: 'Water Usage (units)' },
        min: 0
      },
      {
        title: { text: 'Garbage Cost (KES)' },
        opposite: true,
        min: 0
      }
    ],
    colors: ['#1abc9c', '#f1556c'],
    stroke: { width: 3, curve: 'smooth' }
  };

  const series = [
    {
      name: 'Water Usage',
      type: 'line',
      data: waterUsageData.map(item => item.usage)
    },
    {
      name: 'Garbage Cost',
      type: 'bar',
      data: data.map(item => item.garbageCost)
    }
  ];

  const selectedMonthData = data.find(item => item.month === selectedMonth);

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Download Report</Dropdown.Item>
            <Dropdown.Item>View Detailed Breakdown</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Utility Usage</h4>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'chart')}
          className="mb-3"
        >
          <Tab eventKey="chart" title="Usage Chart">
            <Chart
              options={chartOptions}
              series={series}
              type="line"
              height={350}
            />
            <Row className="mt-3">
              <Col sm={6}>
                <h5>Total Water Usage</h5>
                <p>{getTotalWaterUsage} units</p>
              </Col>
              <Col sm={6}>
                <h5>Average Monthly Water Usage</h5>
                <p>{getAverageWaterUsage.toFixed(2)} units</p>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="readings" title="Meter Readings">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Start Reading</th>
                  <th>End Reading</th>
                  <th>Usage (units)</th>
                  <th>Garbage Cost (KES)</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.month}>
                    <td>{item.month}</td>
                    <td>{item.waterStartReading}</td>
                    <td>{item.waterEndReading}</td>
                    <td>{calculateWaterUsage(item.waterStartReading, item.waterEndReading)}</td>
                    <td>{item.garbageCost}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="photos" title="Meter Photos">
            <Row className="mb-3">
              <Col>
                <select 
                  className="form-select" 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {data.map(item => (
                    <option key={item.month} value={item.month}>{item.month}</option>
                  ))}
                </select>
              </Col>
            </Row>
            {selectedMonthData && (
              <Row>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <h5>Start of Month Reading</h5>
                      <img src="/api/placeholder/400/300" alt="Start of month meter reading" className="img-fluid mb-2" />
                      <p>Reading: {selectedMonthData.waterStartReading}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <h5>End of Month Reading</h5>
                      <img src="/api/placeholder/400/300" alt="End of month meter reading" className="img-fluid mb-2" />
                      <p>Reading: {selectedMonthData.waterEndReading}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default UtilityUsageChart;