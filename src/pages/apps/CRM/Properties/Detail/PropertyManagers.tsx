import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface PropertyManager {
  id?: number;
  name: string;
  image: string;
  role?: string;
  email?: string;
  phone?: string;
  properties?: number;
}

interface PropertyManagersProps {
  managers: PropertyManager[];
}

const PropertyManagers: React.FC<PropertyManagersProps> = ({ managers }) => {
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Property Managers</h4>
        {managers.map((manager, index) => (
          <Row key={index} className="align-items-center mb-4">
            <Col sm={2}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${index}`}>{manager.name}</Tooltip>}
              >
                <img
                  src={manager.image}
                  alt={manager.name}
                  className="rounded-circle img-thumbnail avatar-lg"
                />
              </OverlayTrigger>
            </Col>
            <Col sm={5}>
              <h5 className="mb-1">{manager.name}</h5>
              {manager.role && <p className="mb-0">{manager.role}</p>}
              {manager.properties && <small className="text-muted">Managing {manager.properties} properties</small>}
            </Col>
            <Col sm={5} className="text-sm-end mt-3 mt-sm-0">
              {manager.email && (
                <Button variant="outline-primary" size="sm" className="me-2">
                  <i className="mdi mdi-email-outline me-1"></i>Email
                </Button>
              )}
              {manager.phone && (
                <Button variant="outline-info" size="sm">
                  <i className="mdi mdi-phone me-1"></i>Call
                </Button>
              )}
            </Col>
          </Row>
        ))}
        <Button variant="primary" className="w-100 mt-2">
          Assign Task to Manager
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PropertyManagers;