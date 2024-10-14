<<<<<<< HEAD
import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
=======
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Button, ButtonGroup, Tab } from 'react-bootstrap';
>>>>>>> 4793f36969e7387dc5c4cadbeed69f7cc664ce34
import Chart from 'react-apexcharts';
import { APICore } from '../../../../helpers/api/apiCore';
import { format } from 'date-fns';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Column } from 'react-table';
import { FinancialData, Invoice, Receipt, Reminder } from './types';
import { generatePDF } from '../../../../utils/pdfGenerator';
import PaginatedTable from '../../../../components/PaginatedTable';

interface RevenueOverviewProps {
  data: FinancialData | null;
}

type DocumentType = 'Invoices' | 'Receipts' | 'Reminders';
<<<<<<< HEAD
type Document = Invoice | Receipt | Reminder;
=======
const api = new APICore()
>>>>>>> 4793f36969e7387dc5c4cadbeed69f7cc664ce34

const RevenueOverview: React.FC<RevenueOverviewProps> = () => {
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('Invoices');
  const [graphArray, setGraphArray] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])
  const [invoice, setInvoice] = useState([]) 
  const [tab, setTab] = useState('Invoices')
  const [data, setData] = useState({
    invoices:0,
    receipts:0,
    reminders:0
  })
  
    //Get Invoice
  const getInvoiceDocument =async()=>{
      try{
        setInvoice([])
        const {data} = await api.get('/api/getInvoice')
        if(data.result)
        {
          setInvoice(data.data)
        }
      }
      catch(error)
      {
        console.log(error)
      }
    }

    const getReceiptDocument =async()=>{
      try{
        setInvoice([])
        const {data} = await api.get('/api/getReceiptData')
        if(data.result)
        {
         setInvoice(data.data)
          
        }
      }
      catch(error)
      {
        console.log(error)
      }
    }

    const getRemindDocument =async()=>{
      try{
        setInvoice([])
        const {data} = await api.get('/api/getReminder')
        if(data.result)
        {
         setInvoice(data.data)
          
        }
      }
      catch(error)
      {
        console.log(error)
      }
    }


  const getGraph = async()=>{
    try{
      const {data} = await api.get('/api/monthlyRevenue')
      if(data.result)
      {
        setGraphArray(data.data)
        setData(data.documentCounts)
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }

  useEffect(()=>{
    getGraph()
  },[])

  useEffect(()=>{
    getInvoiceDocument()
  },[tab])



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

  const series = useMemo(() => ([
    {
      name: 'Revenue',
      data: graphArray
    }
  ]), [data.revenueData]);

  const handleGeneratePDF = () => {
    let documents: Document[];
    let title: string;
    switch (selectedDocType) {
      case 'Invoices':
        documents = invoice;
        title = 'Invoices Report';
        break;
      case 'Receipts':
        documents = invoice;
        title = 'Receipts Report';
        break;
      case 'Reminders':
        documents = invoice;
        title = 'Reminders Report';
        break;
    }
    generatePDF(documents, title, selectedDocType);
  };

<<<<<<< HEAD
  const columns: Column<Document>[] = useMemo(() => {
    const baseColumns: Column<Document>[] = [
      { Header: 'ID', accessor: 'id' },
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
    switch (selectedDocType) {
      case 'Invoices':
        return data.invoices;
      case 'Receipts':
        return data.receipts;
      case 'Reminders':
        return data.reminders;
    }
  }, [data, selectedDocType]);
=======
  const renderDocumentList = () => {
    let documents: (Invoice | Receipt | Reminder)[];
        documents = invoice;
    
    const Status = (status:string)=>{
      if(selectedDocType === 'Reminders')
      {
        switch (status){
          case 'paid':
            return 'Resolved'
          case 'pending':
            return 'Pending'
          default:
            return 'Sent'
        }
      }
      else if(selectedDocType === 'Invoices')
        {
          switch (status){
            case 'paid':
              return 'Paid'
            default:
              return 'Unpaid'
        }
      }
      else{
        switch (status){
          case 'paid':
            return 'Processed'
          default:
            return 'Pending'
        }}
    }
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>{selectedDocType}</h5>
          <Button variant="secondary" onClick={handleGeneratePDF}>
            Generate PDF
          </Button>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tenant</th>
              <th>Property</th>
              <th>Amount</th>
              <th>Date</th>
              {selectedDocType === 'Reminders' && <th>Type</th>}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td>{doc._id}</td>
                <td>{doc.tenantName}</td>
                <td>{doc.propertyName}</td>
                <td>
                  {selectedDocType !== 'Reminders'
                    ? `$${(doc as Invoice | Receipt).amount.toLocaleString()}`
                    : 'N/A'}
                </td>
                <td>
                  {selectedDocType === 'Receipts'
                    ? format(new Date((doc as Receipt).paymentDate), 'MMM dd, yyyy')
                    :(selectedDocType === 'Invoices') ?format(new Date((doc as Invoice).leaseEndDate), 'MMM dd, yyyy'):format(new Date((doc as Reminder).dueDate), 'MMM dd, yyyy')
                    }
                </td>
                {selectedDocType === 'Reminders' && <td>{(doc as Reminder).type}</td>}
                <td>{Status(doc.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };
>>>>>>> 4793f36969e7387dc5c4cadbeed69f7cc664ce34

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
<<<<<<< HEAD
            <ul className="list-unstyled">
              <li>Invoices: {data.documentCounts.invoices}</li>
              <li>Receipts: {data.documentCounts.receipts}</li>
              <li>Reminders: {data.documentCounts.reminders}</li>
            </ul>
            <p><strong>Average Payment Time:</strong> {data.averagePaymentTime.toFixed(1)} days</p>
            <p><strong>Collection Rate:</strong> {(data.collectionRate * 100).toFixed(1)}%</p>
=======
            <Table>
              <tbody>
                <tr>
                  <td>Invoices</td>
                  <td>{data.invoices}</td>
                </tr>
                <tr>
                  <td>Receipts</td>
                  <td>{data.receipts}</td>
                </tr>
                <tr>
                  <td>Reminders</td>
                  <td>{data.reminders}</td>
                </tr>
              </tbody>
            </Table>
            {/* <p><strong>Average Payment Time:</strong> {data.averagePaymentTime.toFixed(1)} days</p>
            <p><strong>Collection Rate:</strong> {(data.collectionRate * 100).toFixed(1)}%</p> */}
>>>>>>> 4793f36969e7387dc5c4cadbeed69f7cc664ce34
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ButtonGroup className="mb-3">
<<<<<<< HEAD
              {(['Invoices', 'Receipts', 'Reminders'] as DocumentType[]).map((docType) => (
                <Button
                  key={docType}
                  variant={selectedDocType === docType ? 'primary' : 'outline-primary'}
                  onClick={() => setSelectedDocType(docType)}
                >
                  {docType}
                </Button>
              ))}
=======
              <Button
                variant={selectedDocType === 'Invoices' ? 'primary' : 'outline-primary'}
                onClick={() => {
                  getInvoiceDocument()
                  setSelectedDocType('Invoices')}}
              >
                Invoices
              </Button>
              <Button
                variant={selectedDocType === 'Receipts' ? 'primary' : 'outline-primary'}
                onClick={() => {
                  getReceiptDocument()
                  setSelectedDocType('Receipts')}}
              >
                Receipts
              </Button>
              <Button
                variant={selectedDocType === 'Reminders' ? 'primary' : 'outline-primary'}
                onClick={() => {
                  getRemindDocument()
                  setSelectedDocType('Reminders')}}
              >
                Reminders
              </Button>
>>>>>>> 4793f36969e7387dc5c4cadbeed69f7cc664ce34
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