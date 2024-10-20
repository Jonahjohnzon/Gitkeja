import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Form, Row, Col } from 'react-bootstrap';
import MaintenanceForm from './MaintenanceForm';
import { APICore } from '../helpers/api/apiCore';
import { format } from 'date-fns';


interface MaintenanceTask {
  _id: string;
  description: string;
  property: string;
  status: string;
  cost: number;
  date: Date;
  unit:string
}

function truncateDescription(description:string) {
  const words = description
  if (words.length > 20) {
      return words.slice(0, 20) + '...';
  }
  return description;
}

const MaintenanceList: React.FC = () => {


  const api = new APICore()
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false)

  const handleAddTask = async (newTask: MaintenanceTask) => {
    try{
    setSending(true)
    const {data} = await api.create('/api/createMaintenance',newTask)
    if(data.result)
    {
      setTasks((prev)=>[data.data, ...prev])
    }
    setShowForm(false);
    setSending(false)

  }
  catch(error)
  {
    setSending(false)
  }
  };

  const Get = async() =>{
    try{
      const {data} = await api.get('/api/getMaintenance')
      if(data.result)
      {
        setTasks(data.data)
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
    <Card>
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <h5 className="card-title">Maintenance Tasks</h5>
          </Col>
          <Col xs="auto">
            <Button onClick={() => setShowForm(true)}>Add New Task</Button>
          </Col>
        </Row>
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Property</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task._id}</td>
                <td>{truncateDescription(task.description)}</td>
                <td>{truncateDescription(task.property)}{', '}{task.unit}</td>
                <td>{task.status}</td>
                <td>${task.cost}</td>
                <td>{format(task.date, 'MMMM dd, yyyy' )}</td>
                <td>
                  <Button variant="link" size="sm">View</Button>
                  <Button variant="link" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      {showForm&&<MaintenanceForm show={showForm} onHide={() => setShowForm(false)} sending={sending} onSubmit={handleAddTask} />}
    </Card>
  );
};

export default MaintenanceList;