import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { APICore } from '../helpers/api/apiCore';

ChartJS.register(ArcElement, Tooltip, Legend);



const BillsDashboard= () => {
  const api = new APICore()
  const [billCost, setBillsCost] = useState(0)
  const [Upcoming, setUpcoming] = useState(0)
  const [Overdue, setOverdue] = useState(0)
  const [list, setList] = useState([0, 0, 0, 0, 0, 0])

  const Get = async () =>{
    try{
      const {data} =  await api.get('/api/getBillData')
      if(data.result)
      {
        const store = data.data
        setBillsCost(store.totalBillCosts)
        setUpcoming(store.totalUpcomingBills)
        setOverdue(store.totalOverdueBills)
        setList(store.getGraphData)
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
  const data = {
    labels: ['Electricity', 'Water', 'Property Tax', 'Management Fee', 'Insurance', 'Others'],
    datasets: [
      {
        data: list,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#32a85e'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#32a85e'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 20,
        },
      },
      title: {
        display: true,
        text: 'Cost Breakdown',
        font: {
          size: 16,
        },
      },
    },
  };


  return (
    <Row>
      <Col lg={4} md={4} sm={12}>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="card-title">Total Bills & Utilities</h5>
            <h2>${billCost.toLocaleString()}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} md={4} sm={12}>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="card-title">Upcoming Bills</h5>
            <h2>{Upcoming}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} md={4} sm={12}>
        <Card className="mb-3">
          <Card.Body>
            <h5 className="card-title">Overdue Bills</h5>
            <h2>{Overdue}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Cost Breakdown</h5>
            <div style={{ height: '300px', position: 'relative' }}>
              <Pie data={data} options={options} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default BillsDashboard;