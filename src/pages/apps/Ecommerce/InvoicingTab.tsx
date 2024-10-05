import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { RentPayment } from '../../../types';
import { generateInvoice, downloadInvoicePDF } from './invoiceService';
import { APICore } from '../../../helpers/api/apiCore';
interface InvoicingTabProps {
  data: RentPayment[];
}

export interface Paymentprop{
  id:string;
  tenantName:string;
  propertyName:string;
  status:string;
  amount:number;
  unitNumber:string;
  tenantId?:string;
  leaseEndDate:string;
  currentReading:number;
  previousReading:number;
  previousImage: File | null;
  currentImage: File | null;
}

const InvoicingTab: React.FC<InvoicingTabProps> = ({ data }) => {

  const Display = {
    totalRentAmount:[0,0,0,0,0,0,0,0,0,0,0,0],
    totalsgarbage:[0,0,0,0,0,0,0,0,0,0,0,0],
    totalswater:[0,0,0,0,0,0,0,0,0,0,0,0]
  }
  const api = new APICore()
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Paymentprop | null>(null);
  const [loading, setLoading] = useState(false);
  const [Invoice, setInvoice] = useState(Display)
  const [Data,setData] = useState([])

  const handleOpenModal = (payment: Paymentprop) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const Get = async()=>{
    try{
      const {data} = await api.get('/api/getTenantInvoice')
      if(data.result)
      {
        setInvoice(data.display)
        setData(data.data)
      }
    }
    catch(error)
    {

    }
  }

  useEffect(()=>{
    Get()
  },[])
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleGenerateInvoice = async (payment: Paymentprop) => {
    if (!payment) {
      alert('Please enter water meter readings before generating an invoice.');
      return;
    }

    setLoading(true);
    try {
      const invoice = await generateInvoice(payment);
      await downloadInvoicePDF(invoice);
      alert('Invoice generated and downloaded successfully.');
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Failed to generate invoice. Please try again.');
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleSendInvoice = async () => {
    setLoading(true);
    try {
      alert('Invoice sent successfully.');
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the chart
  const chartData = data.map(payment => ({
    rent: payment.amount,
    water: payment.waterMeterReading ? 
      (payment.waterMeterReading.currentReading - payment.waterMeterReading.previousReading) * 100 : 0, // Assuming 100 KES per unit
    garbage: 500 // Assuming a fixed garbage collection fee
  }));

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr' , 'May' , 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Amount (KES)'
      }
    },
    legend: {
      position: 'top'
    },
    title: {
      text: 'Invoice Amounts Over Time',
      align: 'left'
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    }
  };

  const series = [
    {
      name: 'Rent',
      data: Invoice.totalRentAmount
    },
    {
      name: 'Water',
      data: Invoice.totalswater
    },
    {
      name: 'Garbage',
      data: Invoice.totalsgarbage
    }
  ];

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Chart
            options={chartOptions}
            series={series}
            type="bar"
            height={350}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Property</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {Data.length != 0 && <tbody>
              {Data.map((payment:Paymentprop) => (
                <tr key={payment.id}>
                  <td>{payment.tenantName}</td>
                  <td>{payment.propertyName}{` `}{payment.unitNumber}</td>
                  <td>${payment.amount.toLocaleString()}</td>
                  <td>{format(new Date(payment.leaseEndDate), 'MMM dd, yyyy')}</td>
                  <td>{payment.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenModal(payment)}
                      disabled={loading}
                      className="me-2"
                    >
                      Generate Invoice
                    </Button>
                    {(
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSendInvoice()}
                        disabled={loading}
                      >
                        Send Invoice
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>}
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Generate Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <p><strong>Tenant:</strong> {selectedPayment.tenantName}</p>
              <p><strong>Property:</strong> {selectedPayment.propertyName}</p>
              <p><strong>Amount:</strong> ${selectedPayment.amount.toLocaleString()}</p>
              <p><strong>Due Date:</strong> {format(new Date(selectedPayment.leaseEndDate), 'MMM dd, yyyy')}</p>
              {selectedPayment && (
                <>
                  <p><strong>Water Usage:</strong> {selectedPayment.currentReading - selectedPayment.previousReading} units</p>
                </>
              )}
              <Button 
                variant="primary" 
                onClick={() => handleGenerateInvoice(selectedPayment)}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Invoice'}
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InvoicingTab;