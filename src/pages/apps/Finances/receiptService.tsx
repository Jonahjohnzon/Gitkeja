import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { RentPayment } from '../../../types';
import { APICore } from '../../../helpers/api/apiCore';
// Extend jsPDF type to include autoTable method
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;  
}

const api = new APICore()
export interface Receipt {
  id: number;
  tenantName: string;
  propertyName: string;
  paidAmount: number;
  paymentDate:Date;
  waterMeterReading: any
  pendingBalance: number;
}

// Generate Receipt
export const generateReceipt = async (
  payment: RentPayment,
): Promise<Receipt> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const receipt: Receipt = {
      id: Math.floor(Math.random() * 1000000), // Generate a random ID for demo purposes
      tenantName: payment.tenantName,
      propertyName: payment.propertyName,
      paidAmount: payment.amount,
      paymentDate: payment.paymentDate || new Date().toISOString(),
      waterMeterReading: payment,
      pendingBalance: 0, // This should come from your backend in a real app
    };

    return receipt;
  } catch (error) {
    console.error('Error generating receipt:', error);
    throw new Error('Failed to generate receipt');
  }
};


export const sendReceipt = async ( email:string, doc:any): Promise<Boolean> => {
  try {
    const pdfBlob = doc.output('blob');
    const  data =
    {
    email:email,
    doc:pdfBlob
  }
   const result = await api.createWithFile('/api/sendEmailReceipt', data)
    
    if(result?.data?.result)
    {
      return  true
    }
    return false
  } catch (error) {
    console.error('Error sending invoice:', error);
    throw new Error('Failed to send invoice');
  }
};

// Generate PDF for Receipt
export const generateReceiptPDF = (receipt: Receipt): jsPDF => {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Add Receipt Header
  doc.setFontSize(18);
  doc.text('Receipt', 14, 30);

  doc.setFontSize(12);
  doc.text(`Receipt Id: ${receipt.id}`, 14, 40);
  doc.text(`Date: ${new Date(receipt.paymentDate).toLocaleDateString()}`, 14, 46);

  // Add Tenant and Property Info
  doc.text(`Tenant: ${receipt.tenantName}`, 14, 56);
  doc.text(`Property: ${receipt.propertyName}`, 14, 62);

  // Add Receipt Details
  doc.autoTable({
    startY: 70,
    head: [['Description', 'Amount']],
    body: [
      ['Paid Amount', `KES ${receipt.paidAmount.toFixed(2)}`],
      ['Pending Balance', `KES ${receipt.pendingBalance.toFixed(2)}`],
    ],
  });

  // Add Water Meter Readings
  const finalY = (doc as any).lastAutoTable.finalY || 100;
  doc.text('Water Meter Readings:', 14, finalY + 10);
  doc.text(`Previous Reading: ${receipt.waterMeterReading.previousReading}`, 14, finalY + 20);
  doc.text(`Current Reading: ${receipt.waterMeterReading.currentReading}`, 14, finalY + 26);

  return doc;
};

// Download Receipt PDF
export const downloadReceiptPDF = (receipt: Receipt): void => {
  try {
    const doc = generateReceiptPDF(receipt);
    doc.save(`Receipt_${receipt.id}.pdf`);
  } catch (error) {
    console.error('Error downloading receipt PDF:', error);
    throw new Error('Failed to download receipt PDF');
  }
};
