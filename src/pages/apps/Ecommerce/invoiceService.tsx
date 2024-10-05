import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { RentPayment, WaterMeterReadingData } from '../../../types';
import { Paymentprop } from './InvoicingTab';

// Extend jsPDF type to include autoTable method
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;  
}

export interface Invoice {
  id: number;
  tenantName: string;
  propertyName: string;
  rentAmount: number;
  waterRate: number;
  garbageCost: number;
  previousBalance: number;
  dueDate: string;
  waterMeterReading: Paymentprop;
}

// Generate Invoice
export const generateInvoice = async (
  payment:  Paymentprop,
): Promise<Invoice> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const invoice: Invoice = {
      id: Math.floor(Math.random() * 1000000), // Generate a random ID for demo purposes
      tenantName: payment.tenantName,
      propertyName: payment.propertyName,
      rentAmount: payment.amount,
      waterRate: payment.water, // KES per unit, this should come from your backend in a real app
      garbageCost: payment.garbage, // KES, this should come from your backend in a real app
      previousBalance: 0, // This should come from your backend in a real app
      dueDate: payment.leaseEndDate,
      waterMeterReading: payment,
    };

    return invoice;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw new Error('Failed to generate invoice');
  }
};

// Send Invoice
export const sendInvoice = async (invoiceId: number): Promise<void> => {
  try {
    // Simulate API call to send the invoice
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Invoice ${invoiceId} sent successfully`);
  } catch (error) {
    console.error('Error sending invoice:', error);
    throw new Error('Failed to send invoice');
  }
};

// Helper function to convert a file to Data URL for images
const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Generate PDF for Invoice
export const generateInvoicePDF = async (invoice: Invoice): Promise<jsPDF> => {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Add Invoice Header
  doc.setFontSize(18);
  doc.text('Invoice', 14, 30);

  doc.setFontSize(12);
  doc.text(`Invoice Number: ${invoice.id}`, 14, 40);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 46);
  doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 14, 52);

  // Add Tenant and Property Info
  doc.text(`Tenant: ${invoice.tenantName}`, 14, 62);
  doc.text(`Property: ${invoice.propertyName}`, 14, 68);

  // Add Invoice Items
  const waterUnits = invoice.waterMeterReading.currentReading - invoice.waterMeterReading.previousReading;
  const waterCost = waterUnits * invoice.waterRate;
  const totalDue = invoice.rentAmount + waterCost + invoice.garbageCost + invoice.previousBalance;

  doc.autoTable({
    startY: 80,
    head: [['Description', 'Quantity', 'Unit Price', 'Total']],
    body: [
      ['Rent', 1, `KES ${invoice.rentAmount.toFixed(2)}`, `KES ${invoice.rentAmount.toFixed(2)}`],
      ['Water', waterUnits, `KES ${invoice.waterRate.toFixed(2)}`, `KES ${waterCost.toFixed(2)}`],
      ['Garbage Collection', 1, `KES ${invoice.garbageCost.toFixed(2)}`, `KES ${invoice.garbageCost.toFixed(2)}`],
      ['Previous Balance', 1, `KES ${invoice.previousBalance.toFixed(2)}`, `KES ${invoice.previousBalance.toFixed(2)}`],
    ],
    foot: [['', '', 'Total Due', `KES ${totalDue.toFixed(2)}`]],
  });

  // Add Water Meter Readings
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.text('Water Meter Readings:', 14, finalY + 10);
  doc.text(`Previous Reading: ${invoice.waterMeterReading.previousReading}`, 14, finalY + 20);
  doc.text(`Current Reading: ${invoice.waterMeterReading.currentReading}`, 14, finalY + 26);

  // Add Water Meter Images
  if (invoice.waterMeterReading.previousImage) {
    try {
      const previousImageUrl = await fileToDataUrl(invoice.waterMeterReading.previousImage);
      doc.addImage(previousImageUrl, 'JPEG', 14, finalY + 36, 80, 60);
    } catch (error) {
      console.error('Error adding previous meter image:', error);
    }
  }

  if (invoice.waterMeterReading.currentImage) {
    try {
      const currentImageUrl = await fileToDataUrl(invoice.waterMeterReading.currentImage);
      doc.addImage(currentImageUrl, 'JPEG', 110, finalY + 36, 80, 60);
    } catch (error) {
      console.error('Error adding current meter image:', error);
    }
  }

  // Add Payment Instructions
  doc.text('Payment Instructions:', 14, finalY + 106);
  doc.setFontSize(10);
  doc.text('Please make payment via M-Pesa to: XXXXXXXX', 14, finalY + 116);
  doc.text('Include your invoice number as the reference.', 14, finalY + 122);

  return doc;
};

// Download Invoice PDF
export const downloadInvoicePDF = async (invoice: Invoice): Promise<void> => {
  try {
    const doc = await generateInvoicePDF(invoice);
    doc.save(`Invoice_${invoice.id}.pdf`);
  } catch (error) {
    console.error('Error downloading invoice PDF:', error);
    throw new Error('Failed to download invoice PDF');
  }
};
