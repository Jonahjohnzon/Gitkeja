import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Button, ButtonGroup } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { APICore } from '../../../../helpers/api/apiCore';
import { format } from 'date-fns';
import { ApexOptions } from 'apexcharts';
import { FinancialData, Invoice, Receipt, Reminder } from './types';
import { generatePDF } from '../../../../utils/pdfGenerator';
interface RevenueOverviewProps {
  data: FinancialData | null;
}

type DocumentType = 'Invoices' | 'Receipts' | 'Reminders';
const api = new APICore()

const RevenueOverview: React.FC<RevenueOverviewProps> = ({ data }) => {
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('Invoices');
  const [graphArray, setGraphArray] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])
  const [invoice, setInvoice] = useState([]) 
  
    //Get Invoice
  const getInvoiceDocument =async()=>{
      try{
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


  const getGraph = async()=>{
    try{
      const {data} = await api.get('/api/monthlyRevenue')
      if(data.result)
      {
        setGraphArray(data.data)
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getGraph()
    getInvoiceDocument()
  },[])



  useEffect(()=>{},[])
  if (!data) return null;

  const chartOptions: ApexOptions = {
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
  };

  const series = [
    {
      name: 'Revenue',
      data: graphArray
    }
  ];

  const handleGeneratePDF = () => {
    let documents: (Invoice | Receipt | Reminder)[];
    let title: string;
    switch (selectedDocType) {
      case 'Invoices':
        documents = invoice;
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
  };

  const renderDocumentList = () => {
    let documents: (Invoice | Receipt | Reminder)[];
    switch (selectedDocType) {
      case 'Invoices':
        documents = invoice;
        break;
      case 'Receipts':
        documents = data.receipts;
        break;
      case 'Reminders':
        documents = data.reminders;
        break;
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
                    ? (doc as Receipt).date
                    : format(new Date((doc as Invoice | Reminder).leaseEndDate), 'MMM dd, yyyy')
                    }
                </td>
                {selectedDocType === 'Reminders' && <td>{(doc as Reminder).type}</td>}
                <td>{doc.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };

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
            <Table>
              <tbody>
                <tr>
                  <td>Invoices</td>
                  <td>{data.documentCounts.invoices}</td>
                </tr>
                <tr>
                  <td>Receipts</td>
                  <td>{data.documentCounts.receipts}</td>
                </tr>
                <tr>
                  <td>Reminders</td>
                  <td>{data.documentCounts.reminders}</td>
                </tr>
              </tbody>
            </Table>
            <p><strong>Average Payment Time:</strong> {data.averagePaymentTime.toFixed(1)} days</p>
            <p><strong>Collection Rate:</strong> {(data.collectionRate * 100).toFixed(1)}%</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ButtonGroup className="mb-3">
              <Button
                variant={selectedDocType === 'Invoices' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedDocType('Invoices')}
              >
                Invoices
              </Button>
              <Button
                variant={selectedDocType === 'Receipts' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedDocType('Receipts')}
              >
                Receipts
              </Button>
              <Button
                variant={selectedDocType === 'Reminders' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedDocType('Reminders')}
              >
                Reminders
              </Button>
            </ButtonGroup>
            {renderDocumentList()}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RevenueOverview;