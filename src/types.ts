export interface WaterMeterReadingData {
 
}

export interface RentPayment {
  id: string;
  tenantName: string;
  propertyName: string;
  status: string;
  amount: number;
  unitNumber: string;
  tenantId?: string;
  leaseEndDate: string;
  currentReading: number;
  previousReading: number;
  previousImage: File | null;
  currentImage: File | null;
  garbage: number;
  email: string;
  water: number;
  _id: string;
  paymentDate: Date;
}

export interface TenantProps {
  paymentId: string;
  id: string;
  tenantName: string;
  propertyName: string;
  waterMeterReading?: WaterMeterReadingData;
  previousReading: number;
  currentReading: number;
  readingDate: string;
  unitNumber: string;
  previousImage: File | null;
  currentImage: File | null;
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
  status: string;
  remindersSent: number;
}

export interface PropertyType {
  _id: string;
  name: string;
  location: string;
  status: 'Occupied' | 'Partially Occupied' | 'Vacant';
  description: string;
  units: number;
  rentAmount: number;
  occupancy: number;
  managers: Array<{
    name: string;
    image?: string;
  }>;
}

// New Paymentprop interface
export interface Paymentprop {
  id: string;
  tenantName: string;
  propertyName: string;
  status: string;
  amount: number;
  unitNumber: string;
  tenantId?: string;
  leaseEndDate: string;
  currentReading: number;
  previousReading: number;
  previousImage: File | null;
  currentImage: File | null;
  garbage: number;
  email: string;
  water: number;
  _id: string;
  paymentDate: Date;
}