import React from "react";
import { Card, Dropdown, Table } from "react-bootstrap";
import { Property } from "./data";

interface PropertyPerformanceProps {
  properties: Property[];
}

const PropertyPerformance: React.FC<PropertyPerformanceProps> = ({ properties }) => {
  // Sort properties by occupancy rate in descending order
  const sortedProperties = [...properties].sort((a, b) => b.occupancyRate - a.occupancyRate);

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
            <Dropdown.Item>Generate Report</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Property Performance</h4>
        <div className="table-responsive">
          <Table hover className="table-centered mb-0">
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Occupancy Rate</th>
                <th>Rent Collected</th>
                <th>Maintenance Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {sortedProperties.map((property) => (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>{(property.occupancyRate * 100).toFixed(1)}%</td>
                  <td>${property.rentCollected.toLocaleString()}</td>
                  <td>
                    {property.maintenanceRequests === 0
                      ? "N/A"
                      : `${(property.units / property.maintenanceRequests).toFixed(1)} units/request`}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyPerformance;