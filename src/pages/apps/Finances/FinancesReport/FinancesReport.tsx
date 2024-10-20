import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import RevenueOverview from './RevenueOverview';
import CashFlowAnalysis from './CashFlowAnalysis';
import ExpenseBreakdown from './ExpenseBreakdown';
import OccupancyImpact from './OccupancyImpact';
import PaymentTrends from './PaymentTrends';
import DateRangeFilter from './DateRangeFilter';
import ErrorBoundary from './ErrorBoundary';

const FinancesReport: React.FC = () => {
  const params = useParams() 
  const selectedDocType = params.overview
  const navigate = useNavigate()
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });



  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  const handleSelect = (key:any) => {
    switch (key) {
      case 'overview':
        navigate('/apps/finances/finances-report/overview/invoices/1');
        break;
      case 'cashflow':
        navigate('/apps/finances/finances-report/cashflow/invoices/1');
        break;
      case 'expenses':
        navigate('/apps/finances/finances-report/expenses/invoices/1');
        break;
      case 'occupancy':
        navigate('/apps/finances/finances-report/occupancy/invoices/1');
        break;
      case 'payments':
        navigate('/apps/finances/finances-report/payments/invoices/1');
        break;
      // Add cases for other tabs if needed
      default:
        break;
    }
  };
  return (
    <ErrorBoundary>
      <div className="finances-report">
        <h2>Finances Report</h2>
        <DateRangeFilter onFilterChange={handleDateRangeChange} />
        <Tabs defaultActiveKey={selectedDocType} id="finances-report-tabs" className="mb-3" onSelect={handleSelect}>
          <Tab eventKey={"overview"} title="Overview" >
            {selectedDocType == 'overview' &&<RevenueOverview  />}
          </Tab>
          <Tab eventKey="cashflow" title="Revenue vs Expenses" onSelect={handleSelect} >
          {selectedDocType == 'cashflow' &&<CashFlowAnalysis  />}
          </Tab>
          <Tab eventKey="expenses" title="Expense Breakdown">
          {selectedDocType == 'expenses' &&<ExpenseBreakdown  />}
          </Tab>
          <Tab eventKey="occupancy" title="Occupancy Impact">
          {selectedDocType == 'occupancy' &&<OccupancyImpact  />}
          </Tab>
          <Tab eventKey="payments" title="Payment Trends">
          {selectedDocType == 'payments' &&<PaymentTrends/>}
          </Tab>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default FinancesReport;