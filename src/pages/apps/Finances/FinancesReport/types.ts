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
    _id: string;
    tenantName: string;
    propertyName: string;
    amount: number;
    dueDate: string;
    status: 'Paid' | 'Unpaid' | 'Overdue';
    leaseEndDate:string
  }
  
  export interface Receipt {
    _id: string;
    tenantName: string;
    propertyName: string;
    amount: number;
    date: string;
    status: 'Processed' | 'Pending';
    leaseEndDate:string
  }
  
  export interface Reminder {
    _id: string;
    tenantName: string;
    propertyName: string;
    type: 'Payment' | 'Lease Renewal' | 'Maintenance';
    dueDate: string;
    status: 'Sent' | 'Pending' | 'Resolved';
    leaseEndDate:string
  }