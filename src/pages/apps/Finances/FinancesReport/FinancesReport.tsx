import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import RevenueOverview from './RevenueOverview';
import CashFlowAnalysis from './CashFlowAnalysis';
import ExpenseBreakdown from './ExpenseBreakdown';
import OccupancyImpact from './OccupancyImpact';
import PaymentTrends from './PaymentTrends';
import DateRangeFilter from './DateRangeFilter';
import { FinancialData } from './types';
import ErrorBoundary, { LoadingSpinner } from './ErrorBoundary';
import { mockFinancialData } from './mockFinancialData';

const FinancesReport: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });

  useEffect(() => {
    // Simulate API call with setTimeout
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setFinancialData(mockFinancialData);
        setIsLoading(false);
      }, 1000); // Simulate 1 second loading time
    };
    loadData();
  }, [dateRange]);

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ErrorBoundary>
      <div className="finances-report">
        <h2>Finances Report</h2>
        <DateRangeFilter onFilterChange={handleDateRangeChange} />
        <Tabs defaultActiveKey="overview" id="finances-report-tabs" className="mb-3">
          <Tab eventKey="overview" title="Overview">
            <RevenueOverview data={financialData} />
          </Tab>
          <Tab eventKey="cashflow" title="Revenue vs Expenses">
            <CashFlowAnalysis data={financialData} />
          </Tab>
          <Tab eventKey="expenses" title="Expense Breakdown">
            <ExpenseBreakdown data={financialData} />
          </Tab>
          <Tab eventKey="occupancy" title="Occupancy Impact">
            <OccupancyImpact data={financialData} />
          </Tab>
          <Tab eventKey="payments" title="Payment Trends">
            <PaymentTrends data={financialData} />
          </Tab>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default FinancesReport;