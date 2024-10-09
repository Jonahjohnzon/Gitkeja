import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { RentPayment } from '../../../types';
import { generateReceipt, downloadReceiptPDF,generateReceiptPDF } from './receiptService';
import { APICore } from '../../../helpers/api/apiCore';
import { sendReceipt } from './receiptService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { AuthActionTypes } from '../../../redux/auth/constants';
import { authApiResponseSuccess } from '../../../redux/actions';
import TopDisplay from '../../../layouts/TopDisplay';



const ReceiptsTab: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const api = new APICore()
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [totaRent, setTotalRent] = useState([])

  const Get = async()=>{
    try{
      const {data} = await api.get('/api/getReceipt/')
      if(data.result)
      {
        setData(data.data)
      }
      const result = await api.get('/api/getReceiptList/')
      if(result.data.result)
      {
        setTotalRent(result?.data?.data)
      }

    }
    catch(error)
    {}
  }


const handleSendReceipt = async (payment: any) => {

    try {
      setLoading(true);
      const Invoice = await generateReceipt(payment)
      const doc = await generateReceiptPDF(Invoice)
      const result = await sendReceipt(payment.email, doc)
      if(result)
        {
          const data ={topDisplay:true,topMessage:"Receipt sent",topColor:"primary",}
          dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT,data))
        }
      setLoading(false);
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    Get()
  },[])
  const handleOpenModal = async (payment: RentPayment) => {
        //create Invoice
        try{
          setLoading(true)
          const {data} = await api.create('/api/createReceipt',payment) 
          if(data.result)
          {
          setSelectedPayment(data.data);
          setShowModal(true);
          setLoading(false)
          return
          }
          
          setLoading(false)
    
        }
        catch(error)
        {
          console.log(error)
        }

  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };


  const handleGenerateReceipt = async (payment: RentPayment) => {
    if (!payment) {
      alert('Please enter water meter readings before generating a receipt.');
      return;
    }

    setLoading(true);
    try {
      const receipt = await generateReceipt(payment);
      await downloadReceiptPDF(receipt);
      alert('Receipt generated and downloaded successfully.');
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Failed to generate receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      type: 'category',
      title: {
        text: 'Payment Date'
      }
    },
    yaxis: {
      title: {
        text: 'Amount (KES)'
      }
    },
    title: {
      text: 'Payment Trends Over Time',
      align: 'left'
    },
    markers: {
      size: 6,
      colors: undefined,
      strokeColors: '#fff',
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3
      }
    },
    tooltip: {
      y: {
        formatter: function(val: number) {
          return `KES ${val.toLocaleString()}`;
        }
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
        const status = w.globals.initialSeries[seriesIndex].data[dataPointIndex].status;
        return '<div class="arrow_box">' +
          '<span>Amount: KES ' + series[seriesIndex][dataPointIndex].toLocaleString() + '</span><br>' +
          '<span>Status: ' + status + '</span>' +
          '</div>';
      }
    },
    colors: ['#008FFB']
  };

  const series = [{
    name: 'Payment Amount',
    data: Data
  }];

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Chart
            options={chartOptions}
            series={series}
            type="line"
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
                <th>Amount Paid</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {totaRent.map((payment:any) => (
                <tr key={payment.id}>
                   <td>{payment.tenantName}</td>
                  <td>{payment.propertyName},{` `}{payment.unitNumber}</td>
                  <td>${payment.amount.toLocaleString()}</td>
                  <td>{payment.paymentDate ? format(new Date(payment.paymentDate), 'MMM dd, yyyy') : 'N/A'}</td>
                  <td>{payment.status === "paid"? "Completed":payment.status === "Incomplete"?"Incomplete":"Pending"}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenModal(payment)}
                      disabled={loading}
                    >
                      Generate Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <TopDisplay/>
        <Modal.Header closeButton>
          <Modal.Title>Generate Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <p><strong>Tenant:</strong> {selectedPayment.tenantName}</p>
              <p><strong>Property:</strong> {selectedPayment.propertyName}</p>
              <p><strong>Amount Paid:</strong> KES {selectedPayment.amount.toLocaleString()}</p>
              <p><strong>Payment Date:</strong> {selectedPayment.paymentDate ? format(new Date(selectedPayment.paymentDate), 'MMM dd, yyyy') : 'N/A'}</p>
              {selectedPayment && (
                <>
                  <p><strong>Water Usage:</strong> {selectedPayment.currentReading - selectedPayment.previousReading} units</p>
                  </>
              )}
              <Button 
                variant="primary" 
                onClick={() => handleGenerateReceipt(selectedPayment)}
                disabled={loading}
                className='me-2'
              >
                {loading ? 'Downloading...' : 'Download Receipt'}
              </Button>
              {(
                      <Button
                        variant="secondary"
                        onClick={() => handleSendReceipt(selectedPayment)}
                        disabled={loading}
                      >
                        Send Receipt
                      </Button>
                    )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReceiptsTab;