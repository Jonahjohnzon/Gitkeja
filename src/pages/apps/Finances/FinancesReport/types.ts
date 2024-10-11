export interface FinancialData {
    cashFlowData: {
      inflow: number[];
      outflow: number[];
    };
    expenseData: {
      [category: string]: number;
    };
    profitabilityData: {
      grossProfitMargin: number;
      netProfitMargin: number;
      roi: number;
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
    // Add any other properties needed for your financial reports
  }