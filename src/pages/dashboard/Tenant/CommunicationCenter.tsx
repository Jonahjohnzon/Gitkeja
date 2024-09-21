import React, { useState } from 'react';
import { Card, Tab, Nav, Form, Button, Badge, ListGroup } from 'react-bootstrap';
import { Message } from './data';

interface CommunicationCenterProps {
  messages: Message[];
}

const CommunicationCenter: React.FC<CommunicationCenterProps> = ({ messages }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');

  const announcements = messages.filter(msg => msg.isAnnouncement);
  const directMessages = messages.filter(msg => !msg.isAnnouncement);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
      // You might want to update the messages list here or refetch data
    }
  };

  const renderMessages = (messageList: Message[]) => (
    <ListGroup variant="flush">
      {messageList.map((message, index) => (
        <ListGroup.Item key={index} className="border-bottom">
          <div className="d-flex">
            <img src={message.userPic.src} alt={message.userName} className="rounded-circle me-2" width="32" height="32" />
            <div className="flex-grow-1">
              <h6 className="mt-0 mb-1">{message.userName}</h6>
              <p className="text-muted mb-0">{message.text}</p>
              <small className="text-muted">{message.postedOn}</small>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Communication Center</h4>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'messages')}>
          <Nav variant="tabs" className="nav-bordered">
            <Nav.Item>
              <Nav.Link eventKey="messages">
                Messages
                <Badge bg="danger" className="ms-1">{directMessages.length}</Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="announcements">
                Announcements
                <Badge bg="warning" className="ms-1">{announcements.length}</Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="documents">Documents</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="messages" className="pt-3">
              {renderMessages(directMessages)}
              <Form className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSendMessage}>Send Message</Button>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="announcements" className="pt-3">
              {renderMessages(announcements)}
            </Tab.Pane>
            <Tab.Pane eventKey="documents" className="pt-3">
              <ListGroup>
                <ListGroup.Item action href="#" className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="mdi mdi-file-document-outline me-2"></i>
                    Community Guidelines
                  </div>
                  <Badge bg="primary" pill>New</Badge>
                </ListGroup.Item>
                <ListGroup.Item action href="#" className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="mdi mdi-file-document-outline me-2"></i>
                    Maintenance Request Form
                  </div>
                </ListGroup.Item>
                <ListGroup.Item action href="#" className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="mdi mdi-file-document-outline me-2"></i>
                    Parking Policy
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default CommunicationCenter;