declare module 'jspdf-autotable' {
    import { jsPDF } from 'jspdf';
  
    interface UserOptions {
      startY?: number;
      head?: any[][];
      body?: any[][];
      foot?: any[][];
      theme?: 'striped' | 'grid' | 'plain';
      styles?: any;
      headerStyles?: any;
      bodyStyles?: any;
      footStyles?: any;
      alternateRowStyles?: any;
      columnStyles?: any;
      margin?: { top?: number; right?: number; bottom?: number; left?: number };
      tableWidth?: 'auto' | 'wrap' | number;
      tableLineWidth?: number;
      tableLineColor?: string;
    }
  
    function autoTable(doc: jsPDF, options: UserOptions): void;
  
    export default autoTable;
  }