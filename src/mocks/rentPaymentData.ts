

export interface Mock{
  id: number;
  tenantName: string;
  propertyName: string;
  tenantId:string;
  amount: number;
  rentAmount:number
  dueDate: string;
  paymentDate: string | null;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod?: string;
  invoiceId?: number;
  receiptId?: number;
  paymentId?: string;
  previousReading: number;
  currentReading: number;
  readingDate: string;
  previousImage: File | null;
  currentImage: File | null;
}

export const mockRentPayments: Mock[] = [
  
];

export const mockInvoices = mockRentPayments.map(payment => ({
  id: payment.invoiceId!,
  tenantName: payment.tenantName,
  propertyName: payment.propertyName,
  amount: payment.amount,
  dueDate: payment.dueDate,
  status: payment.status,
}));

export const mockReceipts = mockRentPayments
  .filter(payment => payment.receiptId && payment.paymentDate && payment.paymentMethod)
  .map(payment => ({
    id: payment.receiptId!,
    tenantName: payment.tenantName,
    propertyName: payment.propertyName,
    amount: payment.amount,
    paymentDate: payment.paymentDate!,
    paymentMethod: payment.paymentMethod!,
  }));

export const mockReminders = mockRentPayments
  .filter(payment => payment.status !== 'Paid')
  .map(payment => ({
    id: payment.id,
    tenantName: payment.tenantName,
    propertyName: payment.propertyName,
    amount: payment.amount,
    dueDate: payment.dueDate,
    status: payment.status,
    remindersSent: Math.floor(Math.random() * 3),
  }));