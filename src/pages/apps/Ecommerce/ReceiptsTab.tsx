import React, { useState } from 'react';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format, differenceInDays } from 'date-fns';
import { RentPayment } from '../../../types';
import { generateReceipt, downloadReceiptPDF } from './receiptService';

interface ReceiptsTabProps {
  data: RentPayment[];
}

const ReceiptsTab: React.FC<ReceiptsTabProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (payment: RentPayment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleGenerateReceipt = async (payment: RentPayment) => {
    if (!payment.waterMeterReading) {
      alert('Please enter water meter readings before generating a receipt.');
      return;
    }

    setLoading(true);
    try {
      const receipt = await generateReceipt(payment, payment.waterMeterReading);
      await downloadReceiptPDF(receipt);
      alert('Receipt generated and downloaded successfully.');
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Failed to generate receipt. Please try again.');
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  // Prepare data for the chart
  const chartData = data
    .filter(payment => payment.paymentDate)
    .map(payment => {
      const dueDate = new Date(payment.dueDate);
      const paymentDate = new Date(payment.paymentDate!);
      const daysDifference = differenceInDays(paymentDate, dueDate);
      let paymentStatus;
      if (daysDifference <= 0) {
        paymentStatus = 'On Time';
      } else if (daysDifference <= 7) {
        paymentStatus = 'Late (Within 7 days)';
      } else {
        paymentStatus = 'Very Late';
      }
      return {
        x: format(paymentDate, 'MMM dd, yyyy'),
        y: payment.amount,
        status: paymentStatus
      };
    })
    .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

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
    data: chartData
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
              {data.filter(payment => payment.status === 'Paid').map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.tenantName}</td>
                  <td>{payment.propertyName}</td>
                  <td>KES {payment.amount.toLocaleString()}</td>
                  <td>{payment.paymentDate ? format(new Date(payment.paymentDate), 'MMM dd, yyyy') : 'N/A'}</td>
                  <td>{payment.status}</td>
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
              {selectedPayment.waterMeterReading && (
                <>
                  <p><strong>Water Usage:</strong> {selectedPayment.waterMeterReading.currentReading - selectedPayment.waterMeterReading.previousReading} units</p>
                </>
              )}
              <Button 
                variant="primary" 
                onClick={() => handleGenerateReceipt(selectedPayment)}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Receipt'}
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReceiptsTab;