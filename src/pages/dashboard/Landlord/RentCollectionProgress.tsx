import React from "react";
import { Card, Dropdown, Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// components
import ChartStatistics from "../../../components/ChartStatistics";

const RentCollectionProgress = () => {
  // Simulated data - replace with actual data from your backend
  const totalRent = 50000;
  const collectedRent = 42500;
  const outstandingRent = totalRent - collectedRent;
  const latePayments = 3500;

  const collectionPercentage = (collectedRent / totalRent) * 100;

  const apexOpts: ApexOptions = {
    chart: {
      height: 242,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%",
        },
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Collected",
            formatter: function (w) {
              return collectionPercentage.toFixed(1) + "%";
            },
          },
        },
      },
    },
    colors: ["#1abc9c"],
    labels: ["Rent Collection"],
  };

  const apexData = [collectionPercentage];

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Generate Report</Dropdown.Item>
            <Dropdown.Item>Export Data</Dropdown.Item>
            <Dropdown.Item>Set Reminders</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-0">Rent Collection Progress</h4>
        <div className="widget-chart text-center" dir="ltr">
          <Chart
            options={apexOpts}
            series={apexData}
            type="radialBar"
            height={242}
            className="apex-charts mt-0"
          />
          <h5 className="text-muted mt-0">Total Rent Collected This Month</h5>
          <h2>${collectedRent.toLocaleString()}</h2>
          <p className="text-muted w-75 mx-auto sp-line-2">
            Keep track of your monthly rent collection progress and outstanding payments.
          </p>
          <Row className="mt-3">
            <Col className="col-4">
              <ChartStatistics
                title="Total Rent"
                stats={`$${totalRent.toLocaleString()}`}
                icon="fe-arrow-up"
                variant="success"
              />
            </Col>
            <Col className="col-4">
              <ChartStatistics
                title="Outstanding"
                stats={`$${outstandingRent.toLocaleString()}`}
                icon="fe-arrow-down"
                variant="danger"
              />
            </Col>
            <Col className="col-4">
              <ChartStatistics
                title="Late Payments"
                stats={`$${latePayments.toLocaleString()}`}
                icon="fe-alert-triangle"
                variant="warning"
              />
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RentCollectionProgress;