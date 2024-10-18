import React, {useEffect,useState} from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';
import { APICore } from '../../../../helpers/api/apiCore';

interface CashFlowAnalysisProps {
  data: FinancialData | null;
}

const CashFlowAnalysis: React.FC<CashFlowAnalysisProps> = ({ data }) => {
  const [revenue, setRevenue] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [expense, setExpense] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const api = new APICore()
  const Get = async() =>{
    try{
      const {data} = await api.get('/api/getIncome')
      if(data.result)
      {
        const result = data.data
        setRevenue(result.income)
        setExpense(result.expense)
        }
    }
    catch(error)
    {
      console.log(error)
    }}
  useEffect(()=>{
    Get()
  },[])
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
      data: revenue
    },
    {
      name: 'Expenses',
      data: expense
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
            {chartOptions.xaxis?.categories.map((revenu:any, index:any) => {
              const expenses = expense[index];
              const revenues = revenue[index]
              const netCashFlow = revenues - expenses;
              return (
                <tr key={index}>
                  <td>{chartOptions.xaxis?.categories[index]}</td>
                  <td>${Math.round(revenues).toLocaleString()}</td>
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