import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';

interface PaymentTrendsProps {
  data: FinancialData | null;
}

const PaymentTrends: React.FC<PaymentTrendsProps> = ({ data }) => {
  if (!data) return null;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const chartOptions: ApexOptions = {
    chart: { 
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: { horizontal: false }
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      title: { text: 'Number of Payments' }
    },
    legend: {
      position: 'top'
    },
    fill: {
      opacity: 1
    },
    title: {
      text: 'Payment Trends',
      align: 'left'
    },
    tooltip: {
      y: {
        formatter: (val) => Math.round(val).toString()
      }
    }
  };

  const series = [
    {
      name: 'On-Time Payments',
      data: data.paymentTrendsData.onTime.map(Math.round)
    },
    {
      name: 'Late Payments',
      data: data.paymentTrendsData.late.map(Math.round)
    }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Payment Trends</h4>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>Month</th>
              <th>On-Time Payments</th>
              <th>Late Payments</th>
              <th>On-Time Payment Rate</th>
            </tr>
          </thead>
          <tbody>
            {months.map((month, index) => {
              const onTime = Math.round(data.paymentTrendsData.onTime[index]);
              const late = Math.round(data.paymentTrendsData.late[index]);
              const total = onTime + late;
              const onTimeRate = total > 0 ? (onTime / total) * 100 : 0;
              return (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{onTime}</td>
                  <td>{late}</td>
                  <td>{onTimeRate.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default PaymentTrends;