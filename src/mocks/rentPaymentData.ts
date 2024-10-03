import { RentPayment, WaterMeterReadingData } from '../types';

const generateMockWaterReading = (paymentId: string): WaterMeterReadingData => ({
  paymentId,
  previousReading: Math.floor(Math.random() * 1000),
  currentReading: Math.floor(Math.random() * 1000) + 1000,
  readingDate: new Date().toISOString(),
  previousImage: null,
  currentImage: null,
});

export const mockRentPayments: RentPayment[] = [
  {
    id: 1,
    tenantName: 'John Doe',
    propertyName: 'Sunset Apartments, Unit 101',
    amount: 15000,
    dueDate: '2023-05-01',
    paymentDate: '2023-04-28',
    status: 'Paid',
    paymentMethod: 'M-Pesa',
    invoiceId: 1001,
    receiptId: 2001,
    waterMeterReading: generateMockWaterReading("1"),
  },
  {
    id: 2,
    tenantName: 'Jane Smith',
    propertyName: 'Greenview Estates, House 5',
    amount: 25000,
    dueDate: '2023-05-01',
    paymentDate: null,
    status: 'Pending',
    paymentMethod: undefined,
    invoiceId: 1002,
    waterMeterReading: generateMockWaterReading("2"),
  },
  {
    id: 3,
    tenantName: 'Alice Johnson',
    propertyName: 'City Center Lofts, Unit 303',
    amount: 18000,
    dueDate: '2023-04-01',
    paymentDate: null,
    status: 'Overdue',
    paymentMethod: undefined,
    invoiceId: 1003,
    waterMeterReading: generateMockWaterReading("3"),
  },
  {
    id: 4,
    tenantName: 'Bob Wilson',
    propertyName: 'Riverside Apartments, Unit 202',
    amount: 20000,
    dueDate: '2023-05-01',
    paymentDate: '2023-04-30',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    invoiceId: 1004,
    receiptId: 2002,
    waterMeterReading: generateMockWaterReading("4"),
  },
  {
    id: 5,
    tenantName: 'Eva Brown',
    propertyName: 'Parkview Residences, Unit 505',
    amount: 22000,
    dueDate: '2023-05-01',
    paymentDate: null,
    status: 'Pending',
    paymentMethod: undefined,
    invoiceId: 1005,
    waterMeterReading: generateMockWaterReading("5"),
  },
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