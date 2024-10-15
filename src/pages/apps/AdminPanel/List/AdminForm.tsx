import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { AdminItem } from './data';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '../../../../redux/store';
import { signupUser } from '../../../../redux/actions';

interface AdminFormProps {
  administrators: AdminItem[];
  onAddAdmin: (newAdmin: AdminItem) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ administrators, onAddAdmin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try{
      dispatch(signupUser(fullName, email, role, role))
    }
    catch(error)
    {
      console.log(error)
    }
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Add Administrator</h4>
        {showAlert && (
          <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
            New admin will have access to the full dashboard.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Add Administrator
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdminForm;