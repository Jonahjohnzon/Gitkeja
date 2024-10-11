import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';

interface OccupancyImpactProps {
  data: FinancialData | null;
}

const OccupancyImpact: React.FC<OccupancyImpactProps> = ({ data }) => {
  if (!data) return null;

  const roundedRates = data.occupancyData.rates.map(rate => Math.round(rate * 100));
  const roundedRevenues = data.occupancyData.revenue.map(rev => Math.round(rev));

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: [
      {
        title: { text: 'Occupancy Rate (%)' },
        max: 100
      },
      {
        opposite: true,
        title: { text: 'Revenue ($)' },
        labels: {
          formatter: (value) => `$${value.toLocaleString()}`
        }
      }
    ],
    title: {
      text: 'Occupancy Rate vs Revenue',
      align: 'left'
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => 
          seriesIndex === 0 ? `${value}%` : `$${value.toLocaleString()}`
      }
    }
  };

  const series = [
    { name: 'Occupancy Rate', type: 'line', data: roundedRates },
    { name: 'Revenue', type: 'column', data: roundedRevenues }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Occupancy Impact</h4>
        <Chart options={chartOptions} series={series} type="line" height={350} />
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>Month</th>
              <th>Occupancy Rate</th>
              <th>Revenue</th>
              <th>Revenue per Available Unit</th>
            </tr>
          </thead>
          <tbody>
            {data.occupancyData.rates.map((rate, index) => (
              <tr key={index}>
                <td>{chartOptions.xaxis?.categories[index]}</td>
                <td>{Math.round(rate * 100)}%</td>
                <td>${Math.round(data.occupancyData.revenue[index]).toLocaleString()}</td>
                <td>${Math.round(data.occupancyData.revenue[index] / rate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OccupancyImpact;