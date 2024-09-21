import React from "react";
import { Card, Dropdown, Table } from "react-bootstrap";
import { LeaseExpiry } from "./data";

interface LeaseExpiryWidgetProps {
  leaseExpirations: LeaseExpiry[];
}

const LeaseExpiryWidget: React.FC<LeaseExpiryWidgetProps> = ({ leaseExpirations }) => {
  // Sort lease expirations by date, closest first
  const sortedExpirations = [...leaseExpirations].sort((a, b) => 
    new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  );

  // Get current date
  const currentDate = new Date();

  // Function to calculate days until expiry
  const daysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - currentDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>View All Leases</Dropdown.Item>
            <Dropdown.Item>Export Data</Dropdown.Item>
            <Dropdown.Item>Set Renewal Reminders</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Upcoming Lease Expirations</h4>
        <div className="table-responsive">
          <Table hover className="table-centered mb-0">
            <thead>
              <tr>
                <th>Property</th>
                <th>Unit</th>
                <th>Tenant</th>
                <th>Expiry Date</th>
                <th>Days Left</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpirations.slice(0, 5).map((lease) => {
                const daysLeft = daysUntilExpiry(lease.expiryDate);
                return (
                  <tr key={lease.id}>
                    <td>{lease.property}</td>
                    <td>{lease.unit}</td>
                    <td>{lease.tenant}</td>
                    <td>{new Date(lease.expiryDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${daysLeft <= 30 ? 'bg-danger' : 'bg-warning'}`}>
                        {daysLeft} days
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LeaseExpiryWidget;