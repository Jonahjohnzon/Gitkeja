import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget from "../../../components/StatisticsWidget";

interface Dashboard {
  totalRentCollected:number,
  occupancyRate:number,
  maintenanceRequests:number,
  propertyValue:number,
  monthlyRentCollection:number,
  totalRentCollectable:number,
}

interface StatisticsProps {
  dashboard: Dashboard; // match prop name with lowercased 'dashboard'
}

const Statistics = ({dashboard}: StatisticsProps) => {

  //Suffix
  const formatSuffix = (num: number):string => {
    if (num >= 1_000_000_000) {
      return "B"
    } else if (num >= 1_000_000) {
      return "M"
    } else if (num >= 1_000) {
      return "K"
    } else {
      return "";
    }
  };

  const formatNumber = (num: number, decimals: number = 1): string => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(decimals); // Billions
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(decimals); // Millions
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(decimals); // Thousands
    } else {
      return num.toString(); // No suffix for smaller numbers
    }
  };
  return (
    <Row>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="primary"
          counterOptions={{
            prefix: "$",
          }}
          description="Total Rent Collected"
          stats={dashboard?.totalRentCollected?.toString()}
          icon="fe-dollar-sign"
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="success"
          description="Occupancy Rate"
          stats={dashboard?.occupancyRate?.toString()}
          counterOptions={{
            suffix: "%",
            decimals: 2,
          }}
          icon="fe-home"
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="info"
          description="Maintenance Requests"
          stats={dashboard?.maintenanceRequests?.toString()}
          icon="fe-tool"
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget
          variant="warning"
          description="Property Value"
          stats={formatNumber(dashboard?.propertyValue).toString()}
          counterOptions={{
            prefix: "$",
            suffix: formatSuffix(dashboard?.propertyValue),
            decimals: 1,
          }}
          icon="fe-trending-up" 
        />
      </Col>
    </Row>
  );
};

export default Statistics;