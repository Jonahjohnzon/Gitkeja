import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';
import { FinancialData } from '../pages/apps/Finances/FinancesReport/types';

export const exportToPDF = (data: FinancialData, filename: string) => {
  const doc = new jsPDF();
  doc.text('Financial Report', 14, 15);
  // Add more details to the PDF based on your FinancialData structure
  doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: FinancialData, filename: string) => {
  const ws = utils.json_to_sheet([data]);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Financial Report');
  writeFile(wb, `${filename}.xlsx`);
};