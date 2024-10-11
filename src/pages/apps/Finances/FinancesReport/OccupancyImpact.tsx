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
        title: {
          text: 'Occupancy Rate (%)'
        },
        max: 100
      },
      {
        opposite: true,
        title: {
          text: 'Revenue ($)'
        }
      }
    ],
    title: {
      text: 'Occupancy Rate vs Revenue',
      align: 'left'
    }
  };

  const series = [
    {
      name: 'Occupancy Rate',
      type: 'line',
      data: data.occupancyData.rates
    },
    {
      name: 'Revenue',
      type: 'column',
      data: data.occupancyData.revenue
    }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Occupancy Impact</h4>
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={350}
        />
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
            {data.occupancyData.rates.map((rate: number, index: number) => (
              <tr key={index}>
                <td>{chartOptions.xaxis?.categories[index]}</td>
                <td>{rate.toFixed(2)}%</td>
                <td>${data.occupancyData.revenue[index].toLocaleString()}</td>
                <td>${(data.occupancyData.revenue[index] / rate * 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OccupancyImpact;