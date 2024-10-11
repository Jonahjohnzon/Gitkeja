import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import RevenueOverview from './RevenueOverview';
import CashFlowAnalysis from './CashFlowAnalysis';
import ExpenseBreakdown from './ExpenseBreakdown';
import ProfitabilityMetrics from './ProfitabilityMetrics';
import OccupancyImpact from './OccupancyImpact';
import PaymentTrends from './PaymentTrends';
import DocumentSummary from './DocumentSummary';
import DateRangeFilter from './DateRangeFilter';
import { fetchFinancialData } from './financialDataService';
import { FinancialData } from './types';
import ErrorBoundary, { LoadingSpinner } from './ErrorBoundary';

const FinancesReport: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFinancialData(dateRange.startDate.toISOString(), dateRange.endDate.toISOString());
        setFinancialData(data);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      } finally {
        setIsLoading(false);
      }
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
          <Tab eventKey="cashflow" title="Cash Flow">
            <CashFlowAnalysis data={financialData} />
          </Tab>
          <Tab eventKey="expenses" title="Expenses">
            <ExpenseBreakdown data={financialData} />
          </Tab>
          <Tab eventKey="profitability" title="Profitability">
            <ProfitabilityMetrics data={financialData} />
          </Tab>
          <Tab eventKey="occupancy" title="Occupancy Impact">
            <OccupancyImpact data={financialData} />
          </Tab>
          <Tab eventKey="payments" title="Payment Trends">
            <PaymentTrends data={financialData} />
          </Tab>
          <Tab eventKey="documents" title="Document Summary">
            <DocumentSummary data={financialData} />
          </Tab>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default FinancesReport;