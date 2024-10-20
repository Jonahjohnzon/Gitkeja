import React,{useEffect, useState} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { APICore } from '../helpers/api/apiCore';
import { formatNumber, formatSuffix } from '../pages/dashboard/Manager/PropertyStatistics';


const MaintenanceDashboard: React.FC = () => {
  const api = new APICore()
  const [graph, setGraph] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [totalCost, setTotalCost] = useState<number>(0)
  const [pending, setPending] = useState(0)
  const [complete, setComplete]  = useState(0)
  const chartOptions: ApexOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
  };

  const series = [{
    name: 'Maintenance Costs',
    data: graph
  }];

  const Get = async() =>{
    try{
      const {data} = await api.get('/api/getMaintenanceData')
      if(data.result)
      {
       const store = data.data
       setGraph(store.getMonthlyData)
       setTotalCost(store.totalMaintenanceCosts)
       setPending(store.totalPendingRequests)
       setComplete(store.totalCompletedTasks)
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

  return (
    <Row>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Total Maintenance Costs</h5>
            <h2>${formatNumber(totalCost).toString()}{formatSuffix(totalCost)}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Pending Requests</h5>
            <h2>{pending.toLocaleString()}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Completed Tasks</h5>
            <h2>{complete.toLocaleString()}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <h5 className="card-title">Maintenance Costs Over Time</h5>
            <Chart options={chartOptions} series={series} type="bar" height={350} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MaintenanceDashboard;