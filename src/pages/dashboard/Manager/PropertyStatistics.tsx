import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget2 from "../../../components/StatisticsWidget2";
import { Property } from "./data";

interface PropertyStatisticsProps {
  properties: Property[];
}

const PropertyStatistics: React.FC<PropertyStatisticsProps> = ({ properties }) => {
  // Calculate total properties
  const totalProperties = properties.length;

  // Calculate overall occupancy rate
  const overallOccupancyRate = properties.reduce((sum, property) => sum + property.occupancyRate, 0) / totalProperties;

  // Calculate total rent collected
  const totalRentCollected = properties.reduce((sum, property) => sum + property.rentCollected, 0);

  // Calculate total open maintenance requests
  const openMaintenanceRequests = properties.reduce((sum, property) => sum + property.maintenanceRequests, 0);

  return (
    <Row>
      <Col md={6} xl={3}>
        <StatisticsWidget2
          variant="blue"
          description="Total Properties"
          stats={totalProperties.toString()}
          icon="fe-home"
          progress={100}
          counterOptions={{
            suffix: "",
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget2
          variant="success"
          description="Overall Occupancy Rate"
          stats={(overallOccupancyRate * 100).toFixed(1)}
          icon="fe-users"
          progress={overallOccupancyRate * 100}
          counterOptions={{
            suffix: "%",
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget2
          variant="warning"
          description="Total Rent Collected"
          stats={totalRentCollected.toString()}
          icon="fe-dollar-sign"
          progress={75} // You might want to calculate this based on expected rent
          counterOptions={{
            prefix: "$",
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget2
          variant="info"
          description="Open Maintenance Requests"
          stats={openMaintenanceRequests.toString()}
          icon="fe-tool"
          progress={(openMaintenanceRequests / (totalProperties * 5)) * 100} // Assuming an average of 5 requests per property is 100%
          counterOptions={{
            suffix: "",
          }}
        />
      </Col>
    </Row>
  );
};

export default PropertyStatistics;