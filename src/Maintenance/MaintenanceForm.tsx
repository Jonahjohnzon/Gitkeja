// src/pages/Maintenance/MaintenanceForm.tsx

import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface MaintenanceFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (task: any) => void;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ show, onHide, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [property, setProperty] = useState('');
  const [status, setStatus] = useState('Pending');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      property,
      status,
      cost: parseFloat(cost),
      date,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Maintenance Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Property</Form.Label>
            <Form.Control
              type="text"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Add Task</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MaintenanceForm;