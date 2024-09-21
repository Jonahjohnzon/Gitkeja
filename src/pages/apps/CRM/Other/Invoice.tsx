import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import PageTitle from "../../../../components/PageTitle";
import logoDark from "../../../../assets/images/logo-dark.png";

interface Address {
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface InvoiceItem {
  id: number;
  name: string;
  description: string;
  amount: number;
}

const Invoice: React.FC = () => {
  const [tenant] = useState<string>("John Doe");
  const [notes] = useState<string>(
    "Thank you for your timely rent payment. If you have any questions about this invoice, please contact our property management office."
  );
  const [invoice_date] = useState<string>("Sep 1, 2024");
  const [invoice_status] = useState<string>("Unpaid");
  const [invoice_no] = useState<string>("INV-2024-001");
  const [property_address] = useState<Address>({
    line_1: "Sunset Apartments, Unit 301",
    line_2: "123 Moi Avenue",
    city: "Nairobi",
    state: "Nairobi",
    zip: "00100", // Fixed: Changed to string to avoid octal literal
    phone: "+254 20 1234567",
  });

  const [items] = useState<InvoiceItem[]>([
    {
      id: 1,
      name: "Monthly Rent",
      description: "Rent for September 2024",
      amount: 50000,
    },
    {
      id: 2,
      name: "Electricity",
      description: "Electricity charges for August 2024",
      amount: 3500,
    },
    {
      id: 3,
      name: "Water",
      description: "Water charges for August 2024",
      amount: 1500,
    },
    {
      id: 4,
      name: "Parking",
      description: "Monthly parking fee",
      amount: 2000,
    },
  ]);

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  const handlePayNow = () => {
    // TODO: Implement Mpesa Daraja API integration
    console.log("Initiating Mpesa payment...");
  };

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Invoices", path: "/invoices" },
          { label: "View Invoice", path: "/invoices/view", active: true },
        ]}
        title={"Invoice"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="clearfix">
                <div className="float-start mb-3">
                  <img src={logoDark} alt="Keja Plus logo" height="30" />
                </div>
                <div className="float-end">
                  <h4 className="m-0 d-print-none">Invoice</h4>
                </div>
              </div>

              <Row>
                <Col md={6}>
                  <div className="mt-3">
                    <p>
                      <strong>Hello, {tenant}</strong>
                    </p>
                    <p className="text-muted">{notes}</p>
                  </div>
                </Col>
                <Col md={4} className="offset-md-2">
                  <div className="mt-3 float-end">
                    <p className="m-b-10">
                      <strong>Invoice Date : </strong>
                      <span className="float-end">{invoice_date}</span>
                    </p>
                    <p className="m-b-10">
                      <strong>Status : </strong>
                      <span className="float-end">
                        <span className={`badge bg-${invoice_status === 'Paid' ? 'success' : 'danger'}`}>
                          {invoice_status}
                        </span>
                      </span>
                    </p>
                    <p className="m-b-10">
                      <strong>Invoice No. : </strong>
                      <span className="float-end">{invoice_no}</span>
                    </p>
                  </div>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col sm={6}>
                  <h6>Property Address:</h6>
                  <address>
                    {property_address.line_1}<br />
                    {property_address.line_2}<br />
                    {property_address.city}, {property_address.state} {property_address.zip}<br />
                    <abbr title="Phone">P:</abbr> {property_address.phone}
                  </address>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <div className="table-responsive">
                    <table className="table mt-4 table-centered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                          <th>Description</th>
                          <th className="text-end">Amount (KES)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td><strong>{item.name}</strong></td>
                            <td>{item.description}</td>
                            <td className="text-end">{item.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <div className="clearfix pt-5">
                    <h6 className="text-muted">Notes:</h6>
                    <small className="text-muted">
                      All payments are due within 5 days of the invoice date. Late payments may incur additional fees.
                      For any queries, please contact our property management office.
                    </small>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="float-end">
                    <h3>Total: KES {total.toLocaleString()}</h3>
                  </div>
                  <div className="clearfix"></div>
                </Col>
              </Row>

              <div className="mt-4 mb-1">
                <div className="text-end d-print-none">
                  <Button variant="primary" className="me-1" onClick={handlePrint}>
                    <i className="mdi mdi-printer me-1"></i> Print
                  </Button>
                  <Button variant="success" onClick={handlePayNow}>
                    <i className="mdi mdi-cash-multiple me-1"></i> Pay Now
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Invoice;