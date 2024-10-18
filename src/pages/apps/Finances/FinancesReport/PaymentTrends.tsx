import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { APICore } from '../../../../helpers/api/apiCore';



const PaymentTrends = () => {
  const api = new APICore()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [onTime, setOnTime] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [late, setLate] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

  const Get= async()=>{
    try{
      const {data} = await api.get('/api/paymentTrend')
      if(data.result)
      {
        const result = data.data
        setOnTime(result['ontime'])
        setLate(result['late'])
      }

    }
    catch(error){

    }
  }
  useEffect(()=>{
    Get()
  },[])
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
      data: onTime
    },
    {
      name: 'Late Payments',
      data: late
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
              const onTim = Math.round(onTime[index] || 0);
              const lat = Math.round(late[index] || 0);
              const total = onTim + lat;
              const onTimeRate = total > 0 ? (onTim / total) * 100 : 0;
              return (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{onTim}</td>
                  <td>{lat}</td>
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