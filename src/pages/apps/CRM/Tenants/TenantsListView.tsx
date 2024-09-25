import React from "react";
import { Card, Button, Badge, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// components
import Table from "../../../../components/Table";

// types
import { TenantDetails } from "./data";

interface TenantsListViewProps {
  tenantDetails: TenantDetails[];
  onTenantSelect: (tenant: TenantDetails) => void;
  onAddTenant: () => void;
  properties: { id: number; name: string }[]; // Add this prop for properties
}

const TenantsListView: React.FC<TenantsListViewProps> = ({ 
  tenantDetails, 
  onTenantSelect,
  onAddTenant,
  properties
}) => {
  // Tenant info column render
  const TenantInfoColumn = ({ row }: { row: any }) => (
    <>
      <img src={row.original.avatar} alt="" className="me-2 rounded-circle" width="32" />
      <Link to="#" className="text-body fw-semibold" onClick={() => onTenantSelect(row.original)}>
        {row.original.name}
      </Link>
      <span className="ms-2 text-muted">#{row.original.unitNumber}</span>
    </>
  );

  // Lease status column render
  const LeaseStatusColumn = ({ row }: { row: any }) => {
    const leaseEndDate = new Date(row.original.leaseInfo.endDate);
    const today = new Date();
    const daysUntilLease = Math.ceil((leaseEndDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    let statusBadge;

    if (daysUntilLease > 30) {
      statusBadge = <Badge bg="success">Active</Badge>;
    } else if (daysUntilLease > 0) {
      statusBadge = <Badge bg="warning">Expiring Soon</Badge>;
    } else {
      statusBadge = <Badge bg="danger">Expired</Badge>;
    }

    return (
      <>
        {statusBadge}
        <small className="ms-1 text-muted">{daysUntilLease > 0 ? `${daysUntilLease} days left` : 'Expired'}</small>
      </>
    );
  };

  // Payment status column render
  const PaymentStatusColumn = ({ row }: { row: any }) => {
    const { outstandingBalance } = row.original.paymentHistory;
    let statusBadge;

    if (outstandingBalance === 0) {
      statusBadge = <Badge bg="success">Paid</Badge>;
    } else if (outstandingBalance > 0) {
      statusBadge = <Badge bg="danger">Outstanding</Badge>;
    }

    return (
      <>
        {statusBadge}
        <small className="ms-1 text-muted">${outstandingBalance.toFixed(2)}</small>
      </>
    );
  };

  // Action column render
  const ActionColumn = ({ row }: { row: any }) => (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" className="card-drop arrow-none cursor-pointer p-0 shadow-none">
        <i className="mdi mdi-dots-horizontal"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onTenantSelect(row.original)}>View Profile</Dropdown.Item>
        <Dropdown.Item>Edit Lease</Dropdown.Item>
        <Dropdown.Item>Send Reminder</Dropdown.Item>
        <Dropdown.Item className="text-danger">Terminate Lease</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const columns = [
    {
      Header: "Tenant",
      accessor: "name",
      sort: true,
      Cell: TenantInfoColumn,
      className: "table-user",
    },
    {
      Header: "Contact",
      accessor: "phone",
      sort: true,
    },
    {
      Header: "Lease Status",
      accessor: "leaseInfo.endDate",
      sort: true,
      Cell: LeaseStatusColumn,
    },
    {
      Header: "Rent",
      accessor: "leaseInfo.rentAmount",
      sort: true,
      Cell: ({ value }: { value: number }) => `$${value.toFixed(2)}`,
    },
    {
      Header: "Payment Status",
      accessor: "paymentHistory",
      sort: true,
      Cell: PaymentStatusColumn,
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      Cell: ActionColumn,
    },
  ];

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="header-title mb-0">Tenants List</h4>
          <Button 
            variant="primary" 
            onClick={onAddTenant}
            disabled={properties.length === 0}
            title={properties.length === 0 ? "Add a property first" : "Add New Tenant"}
          >
            Add New Tenant
          </Button>
        </div>
        <Table
          columns={columns}
          data={tenantDetails}
          pageSize={10}
          isSortable={true}
          pagination={true}
          isSearchable={true}
          tableClass="table-nowrap table-hover"
          searchBoxClass="my-2"
        />
      </Card.Body>
    </Card>
  );
};

export default TenantsListView;