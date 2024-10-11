import { Invoice, Receipt, Reminder } from '../pages/apps/Finances/FinancesReport/types';
import { Expense } from '../pages/apps/Finances/ExpensesAndReports';

type ReportItem = Invoice | Receipt | Reminder | Expense;

export const generatePDF = (data: ReportItem[], title: string) => {
  // Create a new window
  const win = window.open('', '_blank');
  if (!win) {
    alert('Please allow popups for this website');
    return;
  }

  // Determine the headers based on the document type
  const headers = getHeaders(data[0]);

  // Write the HTML content
  win.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <thead>
            <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr>${headers.map(header => `<td>${getItemValue(item, header)}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `);

  // Wait for content to be written
  win.document.close();

  // Trigger print when loaded
  win.onload = function() {
    win.print();
    win.onafterprint = function() {
      win.close();
    }
  }
};

function getHeaders(item: ReportItem): string[] {
  if ('category' in item) {
    return ['ID', 'Category', 'Amount', 'Date', 'Description', 'Property'];
  } else if ('amount' in item) {
    return ['ID', 'Tenant', 'Property', 'Amount', 'Date', 'Status'];
  } else {
    return ['ID', 'Tenant', 'Property', 'Type', 'Due Date', 'Status'];
  }
}

function getItemValue(item: ReportItem, header: string): string {
  switch (header) {
    case 'ID':
      return item._id.toString();
    case 'Tenant':
      return 'tenantName' in item ? item.tenantName : 'N/A';
    case 'Property':
      return 'propertyName' in item ? item.propertyName : 'N/A';
    case 'Amount':
      return 'amount' in item ? `$${item.amount.toLocaleString()}` : 'N/A';
    case 'Date':
      return 'date' in item ? item.date : ('dueDate' in item ? item.dueDate : 'N/A');
    case 'Due Date':
      return 'dueDate' in item ? item.dueDate : 'N/A';
    case 'Type':
      return 'type' in item ? item.type : 'N/A';
    case 'Status':
      return 'status' in item ? item.status : 'N/A';
    case 'Category':
      return 'category' in item ? item.category : 'N/A';
    case 'Description':
      return 'description' in item ? item.description : 'N/A';
    default:
      return 'N/A';
  }
}