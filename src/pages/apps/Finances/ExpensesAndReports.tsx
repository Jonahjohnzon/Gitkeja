import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Form, Table, Tabs, Tab, Modal } from 'react-bootstrap';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// components
import PageTitle from '../../../components/PageTitle';
import { generatePDF } from '../../../utils/pdfGenerator';

// types
export interface Expense {
  _id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
  propertyName: string;
}

interface Report {
  id: number;
  name: string;
  type: 'Profit and Loss' | 'Cash Flow' | 'Occupancy' | 'Maintenance' | 'Utility';
  dateRange: { start: string; end: string };
  generatedOn: string;
}

// Mock data - replace with API calls in production
const mockExpenses: Expense[] = [
  {
    _id: 1,
    category: 'Maintenance',
    amount: 500,
    date: '2024-08-15',
    description: 'Plumbing repair',
    propertyName: 'Sunset Apartments',
  },
  {
    _id: 2,
    category: 'Utilities',
    amount: 1200,
    date: '2024-08-01',
    description: 'Electricity bill',
    propertyName: 'Lakeside Villas',
  },
  // Add more mock data as needed
];

const mockReports: Report[] = [
  {
    id: 1,
    name: 'Q3 2024 Profit and Loss',
    type: 'Profit and Loss',
    dateRange: { start: '2024-07-01', end: '2024-09-30' },
    generatedOn: '2024-10-01',
  },
  {
    id: 2,
    name: 'August 2024 Cash Flow',
    type: 'Cash Flow',
    dateRange: { start: '2024-08-01', end: '2024-08-31' },
    generatedOn: '2024-09-01',
  },
  // Add more mock data as needed
];

const ExpensesAndReports: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(mockExpenses);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showReportModal, setShowReportModal] = useState(false);
  const [newReport, setNewReport] = useState<Partial<Report> & { dateRange: { start: string; end: string } }>({
    name: '',
    type: 'Profit and Loss',
    dateRange: { start: '', end: '' },
  });

  const filterExpenses = useCallback(() => {
    let filtered = expenses;

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        (expense) => expense.date >= dateRange.start && expense.date <= dateRange.end
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter((expense) => expense.category === categoryFilter);
    }

    setFilteredExpenses(filtered);
  }, [expenses, dateRange, categoryFilter]);

  useEffect(() => {
    // In a real application, fetch data from an API here
    setExpenses(mockExpenses);
    setReports(mockReports);
    setFilteredExpenses(mockExpenses);
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [dateRange, categoryFilter, expenses, filterExpenses]);

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const generateExpenseReport = () => {
    generatePDF(filteredExpenses, 'Expense Report');
  };

  const handleNewReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setNewReport((prev) => ({
        ...prev,
        dateRange: { 
          ...prev.dateRange,
          [name]: value 
        },
      }));
    } else {
      setNewReport((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewReport((prev) => ({ ...prev, type: e.target.value as Report['type'] }));
  };

  const handleGenerateReport = () => {
    // In a real application, you would send this data to your backend
    const generatedReport: Report = {
      id: reports.length + 1,
      name: newReport.name || '',
      type: newReport.type as Report['type'],
      dateRange: {
        start: newReport.dateRange.start,
        end: newReport.dateRange.end,
      },
      generatedOn: new Date().toISOString(),
    };
    setReports([...reports, generatedReport]);
    setShowReportModal(false);
    setNewReport({
      name: '',
      type: 'Profit and Loss',
      dateRange: { start: '', end: '' },
    });
  };

  // Calculate summary statistics
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Prepare chart data
  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: Object.keys(expensesByCategory),
    legend: {
      position: 'bottom',
    },
  };

  const chartSeries = Object.values(expensesByCategory);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Home', path: '/' },
          { label: 'Expenses & Reports', path: '/expenses-reports', active: true },
        ]}
        title={'Expenses & Reports'}
      />

      <Tabs defaultActiveKey="expenses" id="expenses-reports-tabs" className="mb-3">
        <Tab eventKey="expenses" title="Expenses">
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="header-title">Expense Summary</h4>
                    <Button variant="primary" onClick={generateExpenseReport}>
                      Generate Expense Report
                    </Button>
                  </div>
                  <Row>
                    <Col md={6}>
                      <h5>Total Expenses: ${totalExpenses.toLocaleString()}</h5>
                      <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="pie"
                        height={300}
                      />
                    </Col>
                    <Col md={6}>
                      <h5>Expenses by Category</h5>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(expensesByCategory).map(([category, amount]) => (
                            <tr key={category}>
                              <td>{category}</td>
                              <td>${amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h4 className="header-title mb-3">Expense History</h4>
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
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            value={categoryFilter}
                            onChange={handleCategoryFilterChange}
                          >
                            <option value="All">All</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Utilities">Utilities</option>
                            {/* Add more categories as needed */}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>

                  <Table responsive className="table-centered mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Property</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>{expense._id}</td>
                          <td>{expense.category}</td>
                          <td>${expense.amount.toLocaleString()}</td>
                          <td>{format(new Date(expense.date), 'MMM dd, yyyy')}</td>
                          <td>{expense.description}</td>
                          <td>{expense.propertyName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="reports" title="Reports">
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="header-title">Generated Reports</h4>
                    <Button variant="primary" onClick={() => setShowReportModal(true)}>
                      Generate New Report
                    </Button>
                  </div>
                  <Table responsive className="table-centered mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date Range</th>
                        <th>Generated On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id}>
                          <td>{report.id}</td>
                          <td>{report.name}</td>
                          <td>{report.type}</td>
                          <td>
                            {format(new Date(report.dateRange.start), 'MMM dd, yyyy')} -{' '}
                            {format(new Date(report.dateRange.end), 'MMM dd, yyyy')}
                          </td>
                          <td>{format(new Date(report.generatedOn), 'MMM dd, yyyy')}</td>
                          <td>
                            <Button variant="link" className="p-0">
                              <i className="mdi mdi-download"></i> Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generate New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Report Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newReport.name}
                onChange={handleNewReportChange}
                placeholder="Enter report name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Report Type</Form.Label>
              <Form.Select
                name="type"
                value={newReport.type}
                onChange={handleReportTypeChange}
              >
                <option value="Profit and Loss">Profit and Loss</option>
                <option value="Cash Flow">Cash Flow</option>
                <option value="Occupancy">Occupancy</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Utility">Utility</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start"
                value={newReport.dateRange.start}
                onChange={handleNewReportChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end"
                value={newReport.dateRange.end}
                onChange={handleNewReportChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpensesAndReports;