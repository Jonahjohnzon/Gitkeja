import React, { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';

interface ExpenseBreakdownProps {
  data: FinancialData | null;
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ data }) => {

  if (!data) return null;

  const expenseCategories = Object.keys(data.expenseData);
  const expenseValues = Object.values(data.expenseData).map(Math.round);
  const totalExpenses = expenseValues.reduce((sum, value) => sum + value, 0);

  const chartOptions: ApexOptions = {
    chart: { type: 'pie' },
    labels: expenseCategories,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }],
    tooltip: {
      y: { formatter: (value) => `$${value.toLocaleString()}` }
    }
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Expense Breakdown</h4>
        <Chart options={chartOptions} series={expenseValues} type="pie" height={350} />
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {expenseCategories.map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
                <td>${expenseValues[index].toLocaleString()}</td>
                <td>{((expenseValues[index] / totalExpenses) * 100).toFixed(1)}%</td>
              </tr>
            ))}
            <tr>
              <th>Total</th>
              <th>${totalExpenses.toLocaleString()}</th>
              <th>100%</th>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpenseBreakdown;