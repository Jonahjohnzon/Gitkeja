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
    chart: { type: 'line', height: 350 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: { text: 'Amount ($)' },
      labels: { formatter: (value) => `$${value.toLocaleString()}` }
    },
    title: { text: 'Cash Flow Analysis', align: 'left' },
    stroke: { curve: 'smooth', width: 2 },
    tooltip: {
      y: { formatter: (value) => `$${value.toLocaleString()}` }
    }
  };

  const series = [
    { name: 'Cash Inflow', data: data.cashFlowData.inflow.map(Math.round) },
    { name: 'Cash Outflow', data: data.cashFlowData.outflow.map(Math.round) }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Cash Flow Analysis</h4>
        <Chart options={chartOptions} series={series} type="line" height={350} />
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>Month</th>
              <th>Cash Inflow</th>
              <th>Cash Outflow</th>
              <th>Net Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {data.cashFlowData.inflow.map((inflow, index) => {
              const outflow = data.cashFlowData.outflow[index];
              const netCashFlow = inflow - outflow;
              return (
                <tr key={index}>
                  <td>{chartOptions.xaxis?.categories[index]}</td>
                  <td>${Math.round(inflow).toLocaleString()}</td>
                  <td>${Math.round(outflow).toLocaleString()}</td>
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