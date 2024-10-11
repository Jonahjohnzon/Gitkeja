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
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Cash Flow Analysis',
      align: 'left'
    },
    legend: {
      position: 'top'
    }
  };

  const series = [
    {
      name: 'Cash Inflow',
      data: data.cashFlowData.inflow
    },
    {
      name: 'Cash Outflow',
      data: data.cashFlowData.outflow
    }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Cash Flow Analysis</h4>
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
              <th>Cash Inflow</th>
              <th>Cash Outflow</th>
              <th>Net Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {data.cashFlowData.inflow.map((inflow, index) => (
              <tr key={index}>
                <td>{chartOptions.xaxis?.categories?.[index]}</td>
                <td>${inflow.toLocaleString()}</td>
                <td>${data.cashFlowData.outflow[index].toLocaleString()}</td>
                <td>${(inflow - data.cashFlowData.outflow[index]).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CashFlowAnalysis;