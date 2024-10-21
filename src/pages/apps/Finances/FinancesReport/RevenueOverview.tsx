import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Column } from 'react-table';
import { Invoice, Receipt, Reminder  } from './types';
import { useParams, useNavigate  } from 'react-router-dom';
import { generatePDF } from '../../../../utils/pdfGenerator';
import PaginatedTable from '../../../../components/PaginatedTable';
import { APICore } from '../../../../helpers/api/apiCore';

const api = new APICore()


type DocumentType = 'invoices' | 'receipts' | 'reminders';
type Document = Invoice | Receipt | Reminder;

const RevenueOverview: React.FC= () => {
  const params = useParams() 
  const selectedDocType = params.type
  const [Document, setDocument] = useState<Document[]>([])
  const [graph, setGraph] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [Data, setData] = useState({
    invoices:0,
    receipts:0,
    reminders:0
  })

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
    return [{
      name: 'Revenue',
      data: graph
    }];
  }, [graph]);

  const getGraph = async()=>{
    const {data} = await api.get('/api/monthlyRevenue')
    if(data.result)
    {
      setGraph(data.data)
      setData(data.documentCounts)
    }
  } 


  const getList = async (name:string) =>{
    try{
      if(params?.type && params.page)
      {
        setLoading(true)
        setDocument([])
        switch(params.type)
        {
            case 'invoices':
              const {data} = await api.get('/api/getInvoice',{word:name, page:params.page})
              if(data.result){
                setDocument(data.data)
              }
              break;
            case 'receipts':
              const result = await api.get('/api/getReceiptData',{word:name, page:params.page})
              if(result.data.result){
                  setDocument(result.data.data)
              }
              break;
            case 'reminders':
              const resultData = await api.get('/api/getReminder',{word:name, page:params.page})
              if(resultData.data.result){
                  setDocument(resultData.data.data)
              }
              break;
            default:
              setDocument([])
            
        }
        setLoading(false)
      }
    }
    catch(error){
      setDocument([])
      setLoading(false)
    }
  }
  

  useEffect(()=>{
    getList("")
  },[selectedDocType])
    //GetData
    useEffect(()=>{
      getGraph()
    },[selectedDocType])


  const handleGeneratePDF = useCallback(() => {

    let title: string;
    switch (params.type) {
      case 'invoices':
        title = 'Invoices Report';
        break;
      case 'receipts':
        title = 'Receipts Report';
        break;
      case 'reminders':
        title = 'Reminders Report';
        break;
      default:
        title = 'Default Report';
    }
    generatePDF(Document, title, selectedDocType);
  }, [params.type, Document]);

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
          if ('leaseEndDate' in row) return row.leaseEndDate;
          if ('dueDate' in row) return row.dueDate;
          if('paymentDate' in row) return row.paymentDate;
          return '';
        },
        Cell: ({ value }: { value: string }) => format(new Date(value), 'MMM dd, yyyy')
      },
      { Header: 'Status', accessor: 'status' }
    ];
  
    if (selectedDocType === 'reminders') {
      baseColumns.splice(5, 0, { 
        Header: 'Type', 
        accessor: (row: Document) => 'type' in row ? row.type : '' 
      });
    }
  
    return baseColumns;
  }, [selectedDocType]);

  const documents = useMemo(() => {
        return Document;
  }, [Document]);

  

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
              <li>Invoices: {Data.invoices}</li>
              <li>Receipts: {Data.receipts}</li>
              <li>Reminders: {Data.reminders}</li>
            </ul>
            {/* <p><strong>Average Payment Time:</strong> {data.averagePaymentTime.toFixed(1)} days</p>
            <p><strong>Collection Rate:</strong> {(data.collectionRate * 100).toFixed(1)}%</p> */}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ButtonGroup className="mb-3">
              {(['invoices', 'receipts', 'reminders'] as DocumentType[]).map((docType) => (
                <Button
                  key={docType}
                  variant={selectedDocType === docType ? 'primary' : 'outline-primary'}
                  onClick={() => {
                    navigate(`/apps/finances/finances-report/overview/${docType}/1`)
                  }}
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
            <PaginatedTable columns={columns} data={documents} pageSize={10}  searchData={getList} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default React.memo(RevenueOverview);