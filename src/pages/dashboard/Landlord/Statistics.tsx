import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget from "../../../components/StatisticsWidget";

const Statistics = () => {
  return (
    <Row>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="primary"
          counterOptions={{
            prefix: "$",
          }}
          description="Total Rent Collected"
          stats="58947"
          icon="fe-dollar-sign"
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="success"
          description="Occupancy Rate"
          stats="94.5"
          counterOptions={{
            suffix: "%",
            decimals: 1,
          }}
          icon="fe-home"
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="info"
          description="Maintenance Requests"
          stats="28"
          icon="fe-tool"
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="warning"
          description="Property Value"
          stats="5.2"
          counterOptions={{
            prefix: "$",
            suffix: "M",
            decimals: 1,
          }}
          icon="fe-trending-up"
        />
      </Col>
    </Row>
  );
};

export default Statistics;