import React, { useState } from 'react';
import { Card, Table, Button, Form, Row, Col } from 'react-bootstrap';
import MaintenanceForm from './MaintenanceForm';

interface MaintenanceTask {
  id: number;
  description: string;
  property: string;
  status: string;
  cost: number;
  date: string;
}

const MaintenanceList: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (newTask: MaintenanceTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowForm(false);
  };

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
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.description}</td>
                <td>{task.property}</td>
                <td>{task.status}</td>
                <td>${task.cost}</td>
                <td>{task.date}</td>
                <td>
                  <Button variant="link" size="sm">View</Button>
                  <Button variant="link" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      <MaintenanceForm show={showForm} onHide={() => setShowForm(false)} onSubmit={handleAddTask} />
    </Card>
  );
};

export default MaintenanceList;