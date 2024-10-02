import React from "react";
import { Card, Dropdown, Table } from "react-bootstrap";

interface PropertyPerformanceProps {
  properties: any;
}

const PropertyPerformance: React.FC<PropertyPerformanceProps> = ({ properties }) => {
  // Sort properties by occupancy rate in descending order
  const sortedProperties = properties?.eachOccupancy

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
              {sortedProperties.map((property:any) => (
                <tr key={property?._id}>
                  <td>{property?.name}</td>
                  <td>{((property?.tenants/property?.units) * 100).toFixed(1)}%</td>
                  <td>${property?.rentCollected?.toLocaleString()}</td>
                  <td>
                    {property.maintenanceRequest === 0
                      ? "N/A"
                      : `${(property?.units / property?.maintenanceRequest).toFixed(1)} units/request`}
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