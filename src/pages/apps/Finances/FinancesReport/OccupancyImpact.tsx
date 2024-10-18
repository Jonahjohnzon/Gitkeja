import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FinancialData } from './types';
import { APICore

 } from '../../../../helpers/api/apiCore';
interface OccupancyImpactProps {
  data: FinancialData | null;
}

const OccupancyImpact: React.FC<OccupancyImpactProps> = ({ data }) => {
  const api = new APICore()
  const [roundedRates, setRoundedRates] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])
  const [roundedRevenues, setRoundedRevenue] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])
  const [expectedRevenue, setExpectedRevenue] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])
  const Get = async() =>{
    try{
      const {data} = await api.get('/api/getOccupancyImpact')
      if(data.result)
      {
        setRoundedRates(data['data'].monthlyOccupants)
        setRoundedRevenue(data['data'].monthlyRevenue)
        setExpectedRevenue(data['data'].expectedRevenue)
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
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
              <th>Expected Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data?.occupancyData.rates.map((rate, index) => (
              <tr key={index}>
                <td>{chartOptions.xaxis?.categories[index]}</td>
                <td>{Math.round(roundedRates[index])}%</td>
                <td>${Math.round(roundedRevenues[index]).toLocaleString()}</td>
                <td>${Math.round(expectedRevenue[index]).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OccupancyImpact;