// src/types/index.ts

export interface WaterMeterReadingData {
  paymentId: number;
  previousReading: number;
  currentReading: number;
  readingDate: string;
  previousImage: File | null;
  currentImage: File | null;
}

export interface RentPayment {
  id: number;
  tenantName: string;
  propertyName: string;
  amount: number;
  dueDate: string;
  paymentDate: string | null;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod?: string;
  invoiceId?: number;
  receiptId?: number;
  waterMeterReading?: WaterMeterReadingData;
}

export interface Invoice {
  id: number;
  tenantName: string;
  propertyName: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Receipt {
  id: number;
  tenantName: string;
  propertyName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
}

export interface Reminder {
  id: number;
  tenantName: string;
  propertyName: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Overdue';
  remindersSent: number;
}