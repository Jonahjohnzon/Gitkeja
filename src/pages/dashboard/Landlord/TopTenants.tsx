import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

// Import the Tenant type from your data file
import { Tenant } from "./data";

interface TopTenantsProps {
  tenants: Tenant[];
}

const TopTenants = ({ tenants }: TopTenantsProps) => {
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
                const tenancyLength = Math.floor((new Date().getTime() - new Date(tenant.tenancyStartDate).getTime()) / (1000 * 3600 * 24 * 30));
                return (
                  <tr key={i}>
                    <td>
                      <img
                        src={tenant.avatar}
                        alt="contact-img"
                        title="contact-img"
                        className="rounded-circle avatar-sm me-2"
                      />
                      <span className="fw-semibold">{tenant.name}</span>
                    </td>
                    <td>{tenant.unitNumber}</td>
                    <td>${tenant.rentAmount.toLocaleString()}</td>
                    <td>
                      <span
                        className={classNames("badge", {
                          "bg-success": tenant.paymentStatus === "Paid",
                          "bg-warning": tenant.paymentStatus === "Pending",
                          "bg-danger": tenant.paymentStatus === "Late",
                        })}
                      >
                        {tenant.paymentStatus}
                      </span>
                    </td>
                    <td>{tenancyLength} months</td>
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