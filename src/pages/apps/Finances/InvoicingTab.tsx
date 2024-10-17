import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { Column } from 'react-table';
import { generateInvoice, downloadInvoicePDF, generateInvoicePDF, sendInvoice } from './invoiceService';
import { APICore } from '../../../helpers/api/apiCore';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { AuthActionTypes } from '../../../redux/auth/constants';
import { authApiResponseSuccess } from '../../../redux/actions';
import TopDisplay from '../../../layouts/TopDisplay';
import PaginatedTable from '../../../components/PaginatedTable';
import { Paymentprop } from '../../../types';

const InvoicingTab: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [invoiceData, setInvoiceData] = useState({
    totalRentAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalsgarbage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalswater: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const [invoices, setInvoices] = useState<Paymentprop[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Paymentprop | null>(null);
  const [loading, setLoading] = useState(false);

  const api = useMemo(() => new APICore(), []);

  const searchData =  async (word:string) =>{
    try{
      setLoading(true);
      const { data } = await api.get('/api/getTenantInvoiceSearch', {name:word});
      if (data.result) {
        setInvoices(data.data);
      }
    }
    catch(error)
    {
      console.log(error)
    } 
    finally {
      setLoading(false);
    }
  }
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/getTenantInvoice');
      if (data.result) {
        setInvoiceData(data.display);
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
      dispatch(
        authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
          topDisplay: true,
          topMessage: "Failed to fetch invoice data",
          topColor: "danger",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [api, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = useCallback((payment: Paymentprop) => {
    setSelectedPayment(payment);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedPayment(null);
  }, []);

  const handleGenerateInvoice = useCallback(async (payment: Paymentprop) => {
    if (!payment) {
      dispatch(
        authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
          topDisplay: true,
          topMessage: "Please select a valid payment",
          topColor: "warning",
        })
      );
      return;
    }

    setLoading(true);
    try {
      const invoice = await generateInvoice(payment);
      await downloadInvoicePDF(invoice);
      dispatch(
        authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
          topDisplay: true,
          topMessage: "Invoice generated and downloaded successfully",
          topColor: "success",
        })
      );
    } catch (error) {
      console.error('Error generating invoice:', error);
      dispatch(
        authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
          topDisplay: true,
          topMessage: "Failed to generate invoice",
          topColor: "danger",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleSendInvoice = useCallback(async (payment: Paymentprop) => {
    setLoading(true);
    try {
      const invoice = await generateInvoice(payment);
      const doc = await generateInvoicePDF(invoice);
      const result = await sendInvoice(payment.email, doc);
      if (result) {
        dispatch(
          authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
            topDisplay: true,
            topMessage: "Invoice sent",
            topColor: "primary",
          })
        );
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      dispatch(
        authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
          topDisplay: true,
          topMessage: "Failed to send invoice",
          topColor: "danger",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
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
    legend: {
      position: 'top',
    },
    title: {
      text: 'Invoice Amounts Over Time',
      align: 'left',
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
  }), []);

  const series = useMemo(() => [
    {
      name: 'Rent',
      data: invoiceData.totalRentAmount,
    },
    {
      name: 'Water',
      data: invoiceData.totalswater,
    },
    {
      name: 'Garbage',
      data: invoiceData.totalsgarbage,
    },
  ], [invoiceData]);

  const columns: Column<Paymentprop>[] = useMemo(
    () => [
      { Header: 'Tenant', accessor: 'tenantName' },
      { 
        Header: 'Property', 
        accessor: (row: Paymentprop) => `${row.propertyName}, ${row.unitNumber}` 
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }: { value: number }) => `$${value.toLocaleString()}`
      },
      {
        Header: 'Due Date',
        accessor: 'leaseEndDate',
        Cell: ({ value }: { value: string }) => format(new Date(value), 'MMM dd, yyyy')
      },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: { original: Paymentprop } }) => (
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenModal(row.original)}
            disabled={loading}
          >
            Generate Invoice
          </Button>
        )
      }
    ],
    [loading, handleOpenModal]
  );

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Chart options={chartOptions} series={series} type="bar" height={350} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">Invoices List</h4>
              <PaginatedTable columns={columns} data={invoices} pageSize={10} searchData={searchData}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Generate Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <Form>
              <TopDisplay />
              <Form.Group className="mb-3">
                <Form.Label>Tenant</Form.Label>
                <Form.Control type="text" value={selectedPayment.tenantName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Property</Form.Label>
                <Form.Control type="text" value={selectedPayment.propertyName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" value={`$${selectedPayment.amount.toLocaleString()}`} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="text" value={format(new Date(selectedPayment.leaseEndDate), 'MMM dd, yyyy')} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Water Usage</Form.Label>
                <Form.Control type="text" value={`${selectedPayment.currentReading - selectedPayment.previousReading} units`} readOnly />
              </Form.Group>
              <Button 
                variant="primary" 
                onClick={() => handleGenerateInvoice(selectedPayment)}
                disabled={loading}
                className="me-2"
              >
                {loading ? 'Generating...' : 'Download Invoice'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSendInvoice(selectedPayment)}
                disabled={loading}
              >
                Send Invoice
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(InvoicingTab);