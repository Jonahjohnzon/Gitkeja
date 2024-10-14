import { FinancialData, Invoice, Receipt, Reminder } from './types';

const generateMonthlyData = (base: number, variance: number): number[] => {
  return Array.from({ length: 12 }, () => Math.round(base + Math.random() * variance - variance / 2));
};

export const mockFinancialData: FinancialData = {
  revenueData: generateMonthlyData(50000, 10000),
  expensesData: generateMonthlyData(40000, 8000),
  expenseData: {
    'Maintenance': 15000,
    'Utilities': 10000,
    'Insurance': 5000,
    'Property Tax': 20000,
    'Management Fees': 8000,
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
  invoices: [
    // Add mock invoices here
  ],
  receipts: [
    // Add mock receipts here
  ],
  reminders: [
    // Add mock reminders here
  ],
};

// Add some mock data for invoices, receipts, and reminders
for (let i = 0; i < 10; i++) {




  mockFinancialData.reminders.push({
    _id: `REM-${3000 + i}`,
    tenantName: `Tenant ${i + 1}`,
    propertyName: `Property ${i + 1}`,
    type: ['Payment', 'Lease Renewal', 'Maintenance'][Math.floor(Math.random() * 3)] as 'Payment' | 'Lease Renewal' | 'Maintenance',
    dueDate: new Date(2024, i, 20).toISOString().split('T')[0],
    status: ['Sent', 'Pending', 'Resolved'][Math.floor(Math.random() * 3)] as 'Sent' | 'Pending' | 'Resolved',
    leaseEndDate:''
  });
}