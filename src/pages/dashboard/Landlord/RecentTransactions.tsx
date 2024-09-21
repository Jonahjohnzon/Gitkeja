import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

// Import the Transaction type from your data file
import { Transaction } from "./data";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="card-drop cursor-pointer">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Generate Report</Dropdown.Item>
            <Dropdown.Item>Export Transactions</Dropdown.Item>
            <Dropdown.Item>Set Alerts</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Recent Transactions</h4>
        <div className="table-responsive">
          <table className="table table-borderless table-hover table-nowrap table-centered m-0">
            <thead className="table-light">
              <tr>
                <th>Transaction Type</th>
                <th>Property</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.transactionType}</td>
                    <td>{item.property}</td>
                    <td>${item.amount.toLocaleString()}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={classNames("badge", {
                          "bg-success": item.status === "Completed",
                          "bg-warning": item.status === "Pending",
                          "bg-danger": item.status === "Failed",
                        })}
                      >
                        {item.status}
                      </span>
                    </td>
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

export default RecentTransactions;