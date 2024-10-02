import React, { useState } from 'react';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import WaterMeterReadingForm from './WaterMeterReadingForm';
import { RentPayment, WaterMeterReadingData } from '../../../types';

interface WaterMeterReadingsTabProps {
  data: RentPayment[];
}

const WaterMeterReadingsTab: React.FC<WaterMeterReadingsTabProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);

  const handleOpenModal = (payment: RentPayment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleSubmitReading = (readingData: WaterMeterReadingData) => {
    // Here you would typically update the data through an API call
    console.log('Submitted reading:', readingData);
    handleCloseModal();
  };

  // Prepare data for the chart
  const chartData = data
    .filter(payment => payment.waterMeterReading)
    .map(payment => ({
      x: format(new Date(payment.waterMeterReading!.readingDate), 'MMM dd'),
      y: payment.waterMeterReading!.currentReading - payment.waterMeterReading!.previousReading
    }))
    .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      type: 'category',
      title: {
        text: 'Date'
      }
    },
    yaxis: {
      title: {
        text: 'Water Usage'
      }
    },
    title: {
      text: 'Water Usage Over Time',
      align: 'left'
    },
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 5
    }
  };

  const series = [{
    name: 'Water Usage',
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
                <th>Previous Reading</th>
                <th>Current Reading</th>
                <th>Usage</th>
                <th>Reading Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.tenantName}</td>
                  <td>{payment.propertyName}</td>
                  <td>{payment.waterMeterReading?.previousReading || 'N/A'}</td>
                  <td>{payment.waterMeterReading?.currentReading || 'N/A'}</td>
                  <td>
                    {payment.waterMeterReading
                      ? payment.waterMeterReading.currentReading - payment.waterMeterReading.previousReading
                      : 'N/A'}
                  </td>
                  <td>
                    {payment.waterMeterReading
                      ? format(new Date(payment.waterMeterReading.readingDate), 'MMM dd, yyyy')
                      : 'N/A'}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenModal(payment)}
                    >
                      {payment.waterMeterReading ? 'Update' : 'Add'} Reading
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
          <Modal.Title>Water Meter Reading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <WaterMeterReadingForm
              paymentId={selectedPayment.id}
              onSubmit={handleSubmitReading}
              initialData={selectedPayment.waterMeterReading}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WaterMeterReadingsTab;