import React from "react";
import { Card, Dropdown, ProgressBar } from "react-bootstrap";

interface VacancyAlertWidgetProps {
  properties: any;
}

const VacancyAlertWidget: React.FC<VacancyAlertWidgetProps> = ({ properties }) => {
  // Sort properties by vacancy rate (highest to lowest)
  const sortedProperties = properties?.eachOccupancy

  // Function to determine alert level based on vacancy rate
  const getAlertLevel = (vacancyRate: number) => {
    if (vacancyRate > 0.2) return "danger";
    if (vacancyRate > 0.1) return "warning";
    return "success";
  };

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>View All Properties</Dropdown.Item>
            <Dropdown.Item>Export Data</Dropdown.Item>
            <Dropdown.Item>Set Vacancy Alerts</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Vacancy Alerts</h4>
        {sortedProperties.slice(0, 5).map((property:any) => {
          const vacancyRate = 1 - property.tenants/property.units;
          const alertLevel = getAlertLevel(vacancyRate);
          return (
            <div key={property._id} className="mb-4">
              <h5 className="mb-1">{property.name}</h5>
              <ProgressBar 
                now={vacancyRate * 100} 
                variant={alertLevel}
                label={`${(vacancyRate * 100).toFixed(1)}% Vacant`}
              />
              <small className="text-muted">
                {Math.round(property.units * vacancyRate)} out of {property.units} units vacant
              </small>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default VacancyAlertWidget;