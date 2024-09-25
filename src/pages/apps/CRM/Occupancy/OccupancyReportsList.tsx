import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Modal, Dropdown } from 'react-bootstrap';
import { format } from 'date-fns';

// types
import { OccupancyReport } from './types';

interface OccupancyReportsListProps {
  occupancyReports: OccupancyReport[];
  setOccupancyReports: React.Dispatch<React.SetStateAction<OccupancyReport[]>>;
}

const OccupancyReportsList: React.FC<OccupancyReportsListProps> = ({
  occupancyReports,
  setOccupancyReports,
}) => {
  const [filteredReports, setFilteredReports] = useState<OccupancyReport[]>(occupancyReports);
  const [showModal, setShowModal] = useState(false);
  const [newReport, setNewReport] = useState<Partial<OccupancyReport>>({});
  const [filterProperty, setFilterProperty] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState<keyof OccupancyReport>('occupancyStartDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    let filtered = [...occupancyReports];

    // Apply filters
    if (filterProperty) {
      filtered = filtered.filter(report => 
        report.propertyName.toLowerCase().includes(filterProperty.toLowerCase())
      );
    }
    if (filterStatus !== 'All') {
      filtered = filtered.filter(report => report.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredReports(filtered);
  }, [occupancyReports, filterProperty, filterStatus, sortBy, sortOrder]);

  const handleAddReport = () => {
    const newId = Math.max(...occupancyReports.map(r => r.id)) + 1;
    const reportToAdd: OccupancyReport = {
      ...newReport as OccupancyReport,
      id: newId
    };
    setOccupancyReports(prev => [...prev, reportToAdd]);
    setShowModal(false);
    setNewReport({});
  };

  const handleSort = (column: keyof OccupancyReport) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="header-title">Occupancy Reports</h4>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New Report
          </Button>
        </div>

        <Form className="mb-3">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Filter by property name"
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus((e.target as HTMLSelectElement).value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Expired">Expired</option>
            </Form.Select>
          </Form.Group>
        </Form>

        <Table responsive className="table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('propertyName')}>Property {sortBy === 'propertyName' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('unitNumber')}>Unit {sortBy === 'unitNumber' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('tenantName')}>Tenant {sortBy === 'tenantName' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('occupancyStartDate')}>Start Date {sortBy === 'occupancyStartDate' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('occupancyEndDate')}>End Date {sortBy === 'occupancyEndDate' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('status')}>Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('rentAmount')}>Rent Amount {sortBy === 'rentAmount' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.propertyName}</td>
                <td>{report.unitNumber}</td>
                <td>{report.tenantName}</td>
                <td>{format(new Date(report.occupancyStartDate), 'MMM dd, yyyy')}</td>
                <td>{format(new Date(report.occupancyEndDate), 'MMM dd, yyyy')}</td>
                <td>
                  <span className={`badge bg-${report.status === 'Active' ? 'success' : report.status === 'Upcoming' ? 'warning' : 'danger'}`}>
                    {report.status}
                  </span>
                </td>
                <td>${report.rentAmount.toLocaleString()}</td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="card-drop arrow-none">
                      <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Occupancy Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Property Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newReport.propertyName || ''}
                  onChange={(e) => setNewReport({ ...newReport, propertyName: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unit Number</Form.Label>
                <Form.Control
                  type="text"
                  value={newReport.unitNumber || ''}
                  onChange={(e) => setNewReport({ ...newReport, unitNumber: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tenant Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newReport.tenantName || ''}
                  onChange={(e) => setNewReport({ ...newReport, tenantName: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Occupancy Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newReport.occupancyStartDate || ''}
                  onChange={(e) => setNewReport({ ...newReport, occupancyStartDate: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Occupancy End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newReport.occupancyEndDate || ''}
                  onChange={(e) => setNewReport({ ...newReport, occupancyEndDate: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={newReport.status || ''}
                  onChange={(e) => setNewReport({ ...newReport, status: (e.target as HTMLSelectElement).value as OccupancyReport['status'] })}
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Expired">Expired</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rent Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={newReport.rentAmount || ''}
                  onChange={(e) => setNewReport({ ...newReport, rentAmount: parseFloat(e.target.value) })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddReport}>
              Add Report
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default OccupancyReportsList;