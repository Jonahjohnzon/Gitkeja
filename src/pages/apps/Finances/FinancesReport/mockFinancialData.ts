import { FinancialData } from './types';

const generateMonthlyData = (base: number, variance: number): number[] => {
  return Array.from({ length: 12 }, () => base + Math.random() * variance - variance / 2);
};

export const mockFinancialData: FinancialData = {
  cashFlowData: {
    inflow: generateMonthlyData(50000, 10000),
    outflow: generateMonthlyData(40000, 8000),
  },
  expenseData: {
    'Maintenance': 15000,
    'Utilities': 10000,
    'Insurance': 5000,
    'Property Tax': 20000,
    'Management Fees': 8000,
  },
  profitabilityData: {
    grossProfitMargin: 0.35,
    netProfitMargin: 0.22,
    roi: 0.15,
  },
  occupancyData: {
    rates: generateMonthlyData(0.92, 0.1),
    revenue: generateMonthlyData(45000, 9000),
  },
  paymentTrendsData: {
    onTime: generateMonthlyData(80, 10),
    late: generateMonthlyData(20, 10),
  },
  documentCounts: {
    receipts: 450,
    invoices: 500,
    reminders: 75,
  },
  documentTrends: {
    receipts: generateMonthlyData(40, 10),
    invoices: generateMonthlyData(45, 10),
    reminders: generateMonthlyData(6, 3),
  },
  averagePaymentTime: 8.5,
  collectionRate: 0.97,
};