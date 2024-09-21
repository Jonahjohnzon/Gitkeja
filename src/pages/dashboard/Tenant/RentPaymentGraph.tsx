import React, { useState } from 'react';
import { Card, Dropdown, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface RentPayment {
  month: string;
  onTimeAmount: number;
  lateAmount: number;
}

interface RentPaymentGraphProps {
  rentData: RentPayment[];
}

const RentPaymentGraph: React.FC<RentPaymentGraphProps> = ({ rentData }) => {
  const [timeFrame, setTimeFrame] = useState<'6months' | '1year'>('6months');

  const filteredData = rentData.slice(timeFrame === '6months' ? -6 : -12);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    xaxis: {
      categories: filteredData.map(item => item.month),
    },
    yaxis: {
      title: {
        text: 'Rent Amount ($)'
      },
    },
    colors: ['#008FFB', '#FF4560'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
    },
    fill: {
      opacity: 1
    },
  };

  const series = [
    {
      name: 'On-time Payments',
      data: filteredData.map(item => item.onTimeAmount)
    },
    {
      name: 'Late Payments',
      data: filteredData.map(item => item.lateAmount)
    }
  ];

  const totalRent = filteredData.reduce((sum, item) => sum + item.onTimeAmount + item.lateAmount, 0);
  const totalLate = filteredData.reduce((sum, item) => sum + item.lateAmount, 0);
  const latePercentage = (totalLate / totalRent) * 100;

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Download Report</Dropdown.Item>
            <Dropdown.Item>Set Payment Reminders</Dropdown.Item>
            <Dropdown.Item>View Detailed Breakdown</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Rent Payment Trends</h4>
        <Form.Group className="mb-3">
          <Form.Select
            value={timeFrame}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimeFrame(e.target.value as '6months' | '1year')}
          >
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last 1 Year</option>
          </Form.Select>
        </Form.Group>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
        <div className="mt-3 text-center">
          <p>Total Rent Collected: ${totalRent.toLocaleString()}</p>
          <p>Late Payment Percentage: {latePercentage.toFixed(2)}%</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RentPaymentGraph;