// Add this to a new file named types.ts in your src folder

export interface RentPayment {
    id: number;
    tenantName: string;
    propertyName: string;
    amount: number;
    dueDate: string;
    paymentDate: string | null;
    status: 'Paid' | 'Pending' | 'Overdue';
    paymentMethod: string;
    invoiceId?: number;
    receiptId?: number;
    waterMeterReading?: WaterMeterReadingData;
  }
  
  export interface WaterMeterReadingData {
    paymentId: number;
    previousReading: number;
    currentReading: number;
    previousImage: File | null;
    currentImage: File | null;
    readingDate: string;
  }