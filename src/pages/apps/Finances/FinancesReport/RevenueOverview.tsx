import React, { useState, useMemo, useCallback } from 'react';
import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Column } from 'react-table';
import { FinancialData, Invoice, Receipt, Reminder  } from './types';
import { generatePDF } from '../../../../utils/pdfGenerator';
import PaginatedTable from '../../../../components/PaginatedTable';

interface RevenueOverviewProps {
  data: FinancialData | null;
}

type DocumentType = 'Invoices' | 'Receipts' | 'Reminders';
type Document = Invoice | Receipt | Reminder;

const RevenueOverview: React.FC<RevenueOverviewProps> = ({ data }) => {
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('Invoices');

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Amount ($)'
      },
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    title: {
      text: 'Revenue Overview',
      align: 'left'
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    fill: {
      opacity: 0.8
    }
  }), []);

  const series = useMemo(() => {
    if (!data) return [];
    return [{
      name: 'Revenue',
      data: data.revenueData.map(val => Math.round(val))
    }];
  }, [data]);

  const handleGeneratePDF = useCallback(() => {
    if (!data) return;

    let documents: Document[];
    let title: string;
    switch (selectedDocType) {
      case 'Invoices':
        documents = data.invoices;
        title = 'Invoices Report';
        break;
      case 'Receipts':
        documents = data.receipts;
        title = 'Receipts Report';
        break;
      case 'Reminders':
        documents = data.reminders;
        title = 'Reminders Report';
        break;
    }
    generatePDF(documents, title);
  }, [data, selectedDocType]);

  const columns: Column<Document>[] = useMemo(() => {
    const baseColumns: Column<Document>[] = [
      { Header: 'ID', accessor: '_id' },
      { Header: 'Tenant', accessor: 'tenantName' },
      { Header: 'Property', accessor: 'propertyName' },
      {
        Header: 'Amount',
        accessor: (row: Document) => 'amount' in row ? row.amount : 0,
        Cell: ({ value }: { value: number }) => `$${value.toLocaleString()}`
      },
      {
        Header: 'Date',
        accessor: (row: Document) => {
          if ('date' in row) return row.date;
          if ('dueDate' in row) return row.dueDate;
          return '';
        },
        Cell: ({ value }: { value: string }) => format(new Date(value), 'MMM dd, yyyy')
      },
      { Header: 'Status', accessor: 'status' }
    ];
  
    if (selectedDocType === 'Reminders') {
      baseColumns.splice(5, 0, { 
        Header: 'Type', 
        accessor: (row: Document) => 'type' in row ? row.type : '' 
      });
    }
  
    return baseColumns;
  }, [selectedDocType]);

  const documents = useMemo(() => {
    if (!data) return [];
    switch (selectedDocType) {
      case 'Invoices':
        return data.invoices;
      case 'Receipts':
        return data.receipts;
      case 'Reminders':
        return data.reminders;
    }
  }, [data, selectedDocType]);

  if (!data) return null;

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Revenue Overview</h4>
        <Row>
          <Col lg={8}>
            <Chart
              options={chartOptions}
              series={series}
              type="bar"
              height={350}
            />
          </Col>
          <Col lg={4}>
            <h5>Document Summary</h5>
            <ul className="list-unstyled">
              <li>Invoices: {data.documentCounts.invoices}</li>
              <li>Receipts: {data.documentCounts.receipts}</li>
              <li>Reminders: {data.documentCounts.reminders}</li>
            </ul>
            <p><strong>Average Payment Time:</strong> {data.averagePaymentTime.toFixed(1)} days</p>
            <p><strong>Collection Rate:</strong> {(data.collectionRate * 100).toFixed(1)}%</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ButtonGroup className="mb-3">
              {(['Invoices', 'Receipts', 'Reminders'] as DocumentType[]).map((docType) => (
                <Button
                  key={docType}
                  variant={selectedDocType === docType ? 'primary' : 'outline-primary'}
                  onClick={() => setSelectedDocType(docType)}
                >
                  {docType}
                </Button>
              ))}
            </ButtonGroup>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>{selectedDocType}</h5>
              <Button variant="secondary" onClick={handleGeneratePDF}>
                Generate PDF
              </Button>
            </div>
            <PaginatedTable columns={columns} data={documents} pageSize={10} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default React.memo(RevenueOverview);