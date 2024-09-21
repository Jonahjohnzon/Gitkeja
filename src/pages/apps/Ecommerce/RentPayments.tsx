import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Form, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// components
import PageTitle from '../../../components/PageTitle';
import { generatePDF } from '../../../utils/pdfGenerator';

// types
interface RentPayment {
  id: number;
  tenantName: string;
  propertyName: string;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod: string;
}

// Mock data - replace with API call in production
const mockRentPayments: RentPayment[] = [
  {
    id: 1,
    tenantName: 'John Doe',
    propertyName: 'Sunset Apartments',
    amount: 1500,
    dueDate: '2024-09-01',
    paymentDate: '2024-08-28',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 2,
    tenantName: 'Jane Smith',
    propertyName: 'Lakeside Villas',
    amount: 2000,
    dueDate: '2024-09-01',
    paymentDate: null,
    status: 'Pending',
    paymentMethod: 'M-Pesa',
  },
  // Add more mock data as needed
];

const RentPayments: React.FC = () => {
  const [rentPayments, setRentPayments] = useState<RentPayment[]>(mockRentPayments);
  const [filteredPayments, setFilteredPayments] = useState<RentPayment[]>(mockRentPayments);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('All');

  const filterPayments = useCallback(() => {
    let filtered = rentPayments;

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        (payment) =>
          payment.dueDate >= dateRange.start && payment.dueDate <= dateRange.end
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [rentPayments, dateRange, statusFilter]);

  useEffect(() => {
    // In a real application, fetch data from an API here
    setRentPayments(mockRentPayments);
    setFilteredPayments(mockRentPayments);
  }, []);

  useEffect(() => {
    filterPayments();
  }, [dateRange, statusFilter, rentPayments, filterPayments]);

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const generateReport = () => {
    generatePDF(filteredPayments, 'Rent Payments Report');
  };

  // Calculate summary statistics
  const totalRentCollected = filteredPayments
    .filter((payment) => payment.status === 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingPayments = filteredPayments.filter(
    (payment) => payment.status === 'Pending'
  ).length;

  const overduePayments = filteredPayments.filter(
    (payment) => payment.status === 'Overdue'
  ).length;

  // Prepare chart data
  const chartData = {
    paid: filteredPayments.filter((payment) => payment.status === 'Paid').length,
    pending: pendingPayments,
    overdue: overduePayments,
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Paid', 'Pending', 'Overdue'],
    colors: ['#28a745', '#ffc107', '#dc3545'],
    legend: {
      position: 'bottom',
    },
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Home', path: '/' },
          { label: 'Rent Payments', path: '/rent-payments', active: true },
        ]}
        title={'Rent Payments'}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">Rent Payment Summary</h4>
              <Row>
                <Col md={4}>
                  <div className="text-center">
                    <h3>${totalRentCollected.toLocaleString()}</h3>
                    <p className="text-muted">Total Rent Collected</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <h3>{pendingPayments}</h3>
                    <p className="text-muted">Pending Payments</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <h3>{overduePayments}</h3>
                    <p className="text-muted">Overdue Payments</p>
                  </div>
                </Col>
              </Row>
              <div className="mt-3">
                <Chart
                  options={chartOptions}
                  series={[chartData.paid, chartData.pending, chartData.overdue]}
                  type="donut"
                  height={300}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="header-title">Rent Payment History</h4>
                <Button variant="primary" onClick={generateReport}>
                  Generate Report
                </Button>
              </div>

              <Form className="mb-3">
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={handleDateRangeChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={handleDateRangeChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                      >
                        <option value="All">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>

              <Table responsive className="table-centered mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tenant</th>
                    <th>Property</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.tenantName}</td>
                      <td>{payment.propertyName}</td>
                      <td>${payment.amount.toLocaleString()}</td>
                      <td>{format(new Date(payment.dueDate), 'MMM dd, yyyy')}</td>
                      <td>
                        {payment.paymentDate
                          ? format(new Date(payment.paymentDate), 'MMM dd, yyyy')
                          : '-'}
                      </td>
                      <td>
                        <Badge
                          bg={
                            payment.status === 'Paid'
                              ? 'success'
                              : payment.status === 'Pending'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </td>
                      <td>{payment.paymentMethod}</td>
                      <td>
                        <Link to={`/rent-payment/${payment.id}`} className="action-icon">
                          <i className="mdi mdi-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RentPayments;