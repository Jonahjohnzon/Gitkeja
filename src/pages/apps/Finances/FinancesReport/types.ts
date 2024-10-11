export interface FinancialData {
    revenueData: number[];
    expensesData: number[];
    expenseData: {
      [category: string]: number;
    };
    occupancyData: {
      rates: number[];
      revenue: number[];
    };
    paymentTrendsData: {
      onTime: number[];
      late: number[];
    };
    documentCounts: {
      receipts: number;
      invoices: number;
      reminders: number;
    };
    documentTrends: {
      receipts: number[];
      invoices: number[];
      reminders: number[];
    };
    averagePaymentTime: number;
    collectionRate: number;
    invoices: Invoice[];
    receipts: Receipt[];
    reminders: Reminder[];
  }
  
  export interface Invoice {
    id: string;
    tenantName: string;
    propertyName: string;
    amount: number;
    dueDate: string;
    status: 'Paid' | 'Unpaid' | 'Overdue';
  }
  
  export interface Receipt {
    id: string;
    tenantName: string;
    propertyName: string;
    amount: number;
    date: string;
    status: 'Processed' | 'Pending';
  }
  
  export interface Reminder {
    id: string;
    tenantName: string;
    propertyName: string;
    type: 'Payment' | 'Lease Renewal' | 'Maintenance';
    dueDate: string;
    status: 'Sent' | 'Pending' | 'Resolved';
  }