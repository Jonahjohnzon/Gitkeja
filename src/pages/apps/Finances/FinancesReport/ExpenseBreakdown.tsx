import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { APICore } from '../../../../helpers/api/apiCore';



const ExpenseBreakdown: React.FC = () => {
  const api = new APICore()
  const [Data, setData] = useState({
            Insurance: 0,
            Maintenance: 0,
            ManagementFee: 0,
            PropertyTax: 0,
            Utilities: 0
  })
const Get = async() =>{
  try{
    const {data} = await api.get('/api/expenseBreakdown')
    if(data.result)
    {
      const result = data.data
      setData(result)

    }

  }
  catch(error){

  }
}

  useEffect(()=>{
    Get()
  },[])
  const expenseCategories = Object.keys(Data);
  const expenseValues = Object.values(Data).map(Math.round);
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
                <td>{totalExpenses > 0? ((expenseValues[index] / totalExpenses) * 100).toFixed(1): 0}%</td>
              </tr>
            ))}
            <tr>
              <th>Total</th>
              <th>${totalExpenses.toLocaleString()}</th>
              <th>{totalExpenses > 0 ? 100 : 0}%</th>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpenseBreakdown;