import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Column } from 'react-table';
import { RentPayment } from '../../../types';
import { generateReceipt, downloadReceiptPDF, generateReceiptPDF, sendReceipt } from './receiptService';
import { APICore } from '../../../helpers/api/apiCore';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { AuthActionTypes } from '../../../redux/auth/constants';
import { authApiResponseSuccess } from '../../../redux/actions';
import TopDisplay from '../../../layouts/TopDisplay';
import PaginatedTable from '../../../components/PaginatedTable';

const ReceiptsTab: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RentPayment | null>(null);
  const [loading, setLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [receipts, setReceipts] = useState<RentPayment[]>([]);

  const api = useMemo(() => new APICore(), []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: monthlyResponse } = await api.get('/api/getReceipt/');
      if (monthlyResponse.result) {
        setMonthlyData(monthlyResponse.data);
      }

      const { data: receiptsResponse } = await api.get('/api/getReceiptList/');
      if (receiptsResponse.result) {
        setReceipts(receiptsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
        topDisplay: true,
        topMessage: "Failed to fetch receipt data",
        topColor: "danger",
      }));
    } finally {
      setLoading(false);
    }
  }, [api, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSendReceipt = useCallback(async (payment: RentPayment) => {
    try {
      setLoading(true);
      const receipt = await generateReceipt(payment);
      const doc = await generateReceiptPDF(receipt);
      const result = await sendReceipt(payment.email, doc);
      if (result) {
        dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
          topDisplay: true,
          topMessage: "Receipt sent",
          topColor: "primary",
        }));
      }
    } catch (error) {
      console.error('Error sending receipt:', error);
      dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
        topDisplay: true,
        topMessage: "Failed to send receipt",
        topColor: "danger",
      }));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleOpenModal = useCallback(async (payment: RentPayment) => {
    try {
      setLoading(true);
      const { data } = await api.create('/api/createReceipt', payment);
      if (data.result) {
        setSelectedPayment(data.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error creating receipt:', error);
      dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
        topDisplay: true,
        topMessage: "Failed to create receipt",
        topColor: "danger",
      }));
    } finally {
      setLoading(false);
    }
  }, [api, dispatch]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedPayment(null);
  }, []);

  const handleGenerateReceipt = useCallback(async (payment: RentPayment) => {
    if (!payment) {
      dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
        topDisplay: true,
        topMessage: "Please enter water meter readings before generating a receipt",
        topColor: "warning",
      }));
      return;
    }

    setLoading(true);
    try {
      const receipt = await generateReceipt(payment);
      await downloadReceiptPDF(receipt);
      dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
        topDisplay: true,
        topMessage: "Receipt generated and downloaded successfully",
        topColor: "success",
      }));
    } catch (error) {
      console.error('Error generating receipt:', error);
      dispatch(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
        topDisplay: true,
        topMessage: "Failed to generate receipt",
        topColor: "danger",
      }));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Amount (KES)',
      },
      labels: {
        formatter: (value) => `KES ${value.toLocaleString()}`,
      },
    },
    title: {
      text: 'Payment Trends Over Time',
      align: 'left',
    },
    markers: {
      size: 6,
      hover: {
        size: 8,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `KES ${val.toLocaleString()}`,
      },
    },
    colors: ['#008FFB'],
  }), []);

  const series = useMemo(() => [
    {
      name: 'Payment Amount',
      data: monthlyData,
    },
  ], [monthlyData]);

  const columns: Column<RentPayment>[] = useMemo(() => [
    { Header: 'Tenant', accessor: 'tenantName' },
    { 
      Header: 'Property', 
      accessor: (row: RentPayment) => `${row.propertyName}, ${row.unitNumber}` 
    },
    {
      Header: 'Amount Paid',
      accessor: 'amount',
      Cell: ({ value }: { value: number }) => `$${value.toLocaleString()}`,
    },
    {
      Header: 'Payment Date',
      accessor: 'paymentDate',
      Cell: ({ value }: { value: Date }) => format(new Date(value), 'MMM dd, yyyy'),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }: { value: string }) => 
        value === 'paid' ? 'Completed' : value === 'Incomplete' ? 'Incomplete' : 'Pending',
    },
    {
      Header: 'Actions',
      Cell: ({ row }: { row: { original: RentPayment } }) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleOpenModal(row.original)}
          disabled={loading}
        >
          Generate Receipt
        </Button>
      ),
    },
  ], [loading, handleOpenModal]);

  return (
    <>
      <TopDisplay />
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Chart options={chartOptions} series={series} type="line" height={350} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">Receipts List</h4>
              <PaginatedTable columns={columns} data={receipts} pageSize={10} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <TopDisplay />
        <Modal.Header closeButton>
          <Modal.Title>Generate Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <p><strong>Tenant:</strong> {selectedPayment.tenantName}</p>
              <p><strong>Property:</strong> {selectedPayment.propertyName}</p>
              <p><strong>Amount Paid:</strong> KES {selectedPayment.amount.toLocaleString()}</p>
              <p><strong>Payment Date:</strong> {format(new Date(selectedPayment.paymentDate), 'MMM dd, yyyy')}</p>
              <p><strong>Water Usage:</strong> {selectedPayment.currentReading - selectedPayment.previousReading} units</p>
              <Button 
                variant="primary" 
                onClick={() => handleGenerateReceipt(selectedPayment)}
                disabled={loading}
                className="me-2"
              >
                {loading ? 'Downloading...' : 'Download Receipt'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSendReceipt(selectedPayment)}
                disabled={loading}
              >
                Send Receipt
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(ReceiptsTab);