import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';

interface CashFlowAnalysisProps {
  data: FinancialData | null;
}

const CashFlowAnalysis: React.FC<CashFlowAnalysisProps> = ({ data }) => {
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
        text: 'Amount ($)'
      }
    },
    title: {
      text: 'Revenue vs Expenses',
      align: 'left'
    }
  };

  const series = [
    {
      name: 'Revenue',
      data: data.revenueData.map(val => Math.round(val))
    },
    {
      name: 'Expenses',
      data: data.expensesData.map(val => Math.round(val))
    }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Revenue vs Expenses</h4>
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
              <th>Revenue</th>
              <th>Expenses</th>
              <th>Net Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {data.revenueData.map((revenue, index) => {
              const expenses = data.expensesData[index];
              const netCashFlow = revenue - expenses;
              return (
                <tr key={index}>
                  <td>{chartOptions.xaxis?.categories[index]}</td>
                  <td>${Math.round(revenue).toLocaleString()}</td>
                  <td>${Math.round(expenses).toLocaleString()}</td>
                  <td>${Math.round(netCashFlow).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CashFlowAnalysis;