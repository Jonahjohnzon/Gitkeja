import React, { useState,useEffect, useMemo } from 'react';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import WaterMeterReadingForm from './WaterMeterReadingForm';
import { TenantProps, WaterMeterReadingData } from '../../../types';
import { APICore } from '../../../helpers/api/apiCore';
import PaginatedTable from '../../../components/PaginatedTable';
import { Column } from 'react-table';
import { useParams } from 'react-router-dom';





const WaterMeterReadingsTab = () => {
  const api = new APICore()
  const [data, setData] = useState<WaterMeterReadingData[]>([])
  const {page} = useParams()
  const url = "/apps/finances/water-utilities/"
  const [pages, setpages] = useState(1)
  const [Data, setdata] = useState<WaterMeterReadingData[]>([])

  const Get = async (word:string)=>{
    try{
    setData([])
    const {data} = await api.get('/api/getTenantWaterMeter', {name:word, page:page}) 
    if(data['result'])
    {
      setData(data['data'])
      setpages(data['totalPage'])
    }}
    catch(error)
    {
      console.log(error)
    }
  }

  const [showModal, setShowModal] = useState(false);

  
  const [selectedPayment, setSelectedPayment] = useState<TenantProps | null>(null);


  const handleOpenModal = (payment: TenantProps) => {
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
  const chartData = Data
    .map(payment => ({
      x: format(new Date(payment.readingDate), 'MMM dd'),
      y: payment.currentReading - payment.previousReading
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

  const columns: Column<WaterMeterReadingData>[] = useMemo(() => [
    { Header: 'Tenant', accessor: 'tenantName' },
    { Header: 'Property', accessor: (row: WaterMeterReadingData) => `${row.propertyName}, ${row.unitNumber}` },
    { 
      Header: 'Previous Reading', 
      accessor: (row: WaterMeterReadingData) => row.previousReading || 'N/A' 
    },
    { 
      Header: 'Current Reading', 
      accessor: (row: WaterMeterReadingData) => row.currentReading || 'N/A' 
    },
    { 
      Header: 'Usage', 
      accessor: (row: WaterMeterReadingData) => row.waterMeterReading 
      ? row.currentReading - row.previousReading 
      : 'N/A'     },
    { 
      Header: 'Reading Date', 
      accessor: (row: WaterMeterReadingData) => row.readingDate 
        ? format(new Date(row.readingDate), 'MMM dd, yyyy') 
        : 'N/A' 
    },
    {
      Header: 'Actions',
      Cell: ({ row }: { row: { original: TenantProps } }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleOpenModal(row.original)}
        >
          {row.original ? 'Update' : 'Add'} Reading
        </Button>
      )
    }
  ], [ handleOpenModal]);

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
      <PaginatedTable columns={columns} data={data} pageSize={10} searchData={Get} size={pages} pageInd={page} url={url}/>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Water Meter Reading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <WaterMeterReadingForm
              paymentId={selectedPayment.id}
              onSubmit={handleSubmitReading}
              initialData={selectedPayment}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WaterMeterReadingsTab;