import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

// Import the Tenant type from your data file
import { Tenant } from "./data";
import DefaultImage from "../../../components/DefaultImage";

interface TopTenantsProps {
  tenants: Tenant[];
}

function dateDiffInMonths(startDate: Date, endDate: Date): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate total difference in milliseconds
  const diffTime = end.getTime() - start.getTime();

  // Calculate the total difference in days
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // If the difference is less than 30 days, return days
  if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }

  // Otherwise, calculate the difference in months (approximation)
  const diffMonths = Math.floor(diffDays / 30); // Rough approximation, assuming average month length
  return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
}


const TopTenants = ({ tenants }: TopTenantsProps) => {
  console.log(tenants)
  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="card-drop cursor-pointer">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Generate Report</Dropdown.Item>
            <Dropdown.Item>Export Data</Dropdown.Item>
            <Dropdown.Item>Send Notifications</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Top Tenants</h4>
        <div className="table-responsive">
          <table className="table table-borderless table-hover table-nowrap table-centered m-0">
            <thead className="table-light">
              <tr>
                <th>Tenant</th>
                <th>Unit</th>
                <th>Rent Amount</th>
                <th>Payment Status</th>
                <th>Tenancy Length</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant, i) => {
                const tenancyLength = dateDiffInMonths(tenant.leaseStartDate, tenant.leaseEndDate);
                return (
                  <tr key={i}>
                    <td className=" d-flex align-items-center">
                      {tenant.profile_image?<img
                        src={tenant.profile_image}
                        alt="contact-img"
                        title="img"
                        className="rounded-circle avatar-sm me-2"
                      />:<span className="me-2"><DefaultImage username={tenant.name}/></span>}
                      <span  className="fw-semibold">{tenant.name}</span>
                    </td>
                    <td>{tenant.unit}</td>
                    <td>${tenant.rentAmount.toLocaleString()}</td>
                    <td>
                      <span
                        className={classNames("badge", {
                          "bg-success": tenant.status === "paid",
                          "bg-warning": tenant.status === "pending",
                          "bg-danger": tenant.status === "late",
                        })}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td>{tenancyLength}</td>
                    <td>
                      <Link to="#" className="btn btn-xs btn-light">
                        <i className="mdi mdi-eye"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TopTenants;