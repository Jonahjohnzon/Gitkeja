import React, { useState } from "react";
import { Card, Dropdown, Form, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";


import UserAvatar from "./UserAvatar";

interface Communication {
  id: number;
  type: 'announcement' | 'maintenance' | 'inquiry';
  sender: {
    name: string;
    avatar: string;
    role: 'tenant' | 'manager';
  };
  message: string;
  timestamp: string;
  status?: 'open' | 'in-progress' | 'resolved';
}

interface TenantCommunicationsProps {
  propertyId: number;
}

const TenantCommunications: React.FC<TenantCommunicationsProps> = ({ propertyId }) => {
  const [communications, setCommunications] = useState<Communication[]>([
    {
      id: 1,
      type: 'announcement',
      sender: {
        name: "Property Manager",
        avatar: "/path/to/manager-avatar.jpg",
        role: 'manager'
      },
      message: "Reminder: Annual property inspection scheduled for next week.",
      timestamp: "2024-09-15 10:00 AM"
    },
    {
      id: 2,
      type: 'maintenance',
      sender: {
        name: "John Doe",
        avatar: "/path/to/tenant-avatar.jpg",
        role: 'tenant'
      },
      message: "The kitchen sink is leaking. Please send a plumber.",
      timestamp: "2024-09-14 2:30 PM",
      status: 'in-progress'
    },
    {
      id: 3,
      type: 'inquiry',
      sender: {
        name: "Jane Smith",
        avatar: "/path/to/tenant-avatar2.jpg",
        role: 'tenant'
      },
      message: "Is it possible to renew my lease for another year?",
      timestamp: "2024-09-13 11:15 AM",
      status: 'open'
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [communicationType, setCommunicationType] = useState<'announcement' | 'maintenance' | 'inquiry'>('inquiry');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newCommunication: Communication = {
        id: communications.length + 1,
        type: communicationType,
        sender: {
          name: "Property Manager", // Assuming the current user is a property manager
          avatar: "/path/to/manager-avatar.jpg",
          role: 'manager'
        },
        message: newMessage,
        timestamp: new Date().toLocaleString(),
        status: communicationType === 'maintenance' ? 'open' : undefined
      };
      setCommunications([newCommunication, ...communications]);
      setNewMessage("");
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'open':
        return <Badge bg="warning">Open</Badge>;
      case 'in-progress':
        return <Badge bg="info">In Progress</Badge>;
      case 'resolved':
        return <Badge bg="success">Resolved</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="card-drop cursor-pointer p-0 shadow-none">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Filter by Type</Dropdown.Item>
            <Dropdown.Item>Sort by Date</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h4 className="mt-0 mb-3">Tenant Communications</h4>
        
        <Form className="mb-3">
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Select
              value={communicationType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setCommunicationType(e.target.value as 'announcement' | 'maintenance' | 'inquiry')}
            >
              <option value="announcement">Announcement</option>
              <option value="maintenance">Maintenance Request</option>
              <option value="inquiry">General Inquiry</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={handleSendMessage}>
            Send Message
          </Button>
        </Form>

        <div className="mt-2">
          {communications.map((comm) => (
            <div key={comm.id} className="d-flex align-items-start mt-3">
              <UserAvatar src={comm.sender.avatar} alt={comm.sender.name} className="me-2" />
              <div className="w-100">
                <h5 className="mt-0 mb-1">
                  {comm.sender.name}
                  <small className="text-muted float-end">{comm.timestamp}</small>
                </h5>
                <Badge bg={comm.type === 'announcement' ? 'info' : comm.type === 'maintenance' ? 'warning' : 'secondary'} className="me-1">
                  {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                </Badge>
                {getStatusBadge(comm.status)}
                <p className="mt-1 mb-0">{comm.message}</p>
                {comm.sender.role === 'tenant' && (
                  <Link to="#" className="text-muted font-13 d-inline-block mt-2">
                    <i className="mdi mdi-reply"></i> Reply
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-2">
          <Link to="#" className="text-danger">
            <i className="mdi mdi-spin mdi-loading me-1 font-16"></i>
            Load more 
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TenantCommunications;