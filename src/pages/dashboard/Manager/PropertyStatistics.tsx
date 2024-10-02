import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget2 from "../../../components/StatisticsWidget2";

interface PropertyStatisticsProps {
  properties: any;
}

const PropertyStatistics: React.FC<PropertyStatisticsProps> = ({ properties }) => {
  // Calculate total properties
  const totalProperties = properties.totalProperties;

  // Calculate overall occupancy rate
  const overallOccupancyRate = (properties.totalOccupied/properties.totalUnits);

  // Calculate total rent collected
  const totalRentCollected = properties.totalCollected

  //rentPercent
  const rentPercent = Math.ceil((totalRentCollected/properties.totalRentAmount) * 100) | 0

  // Calculate total open maintenance requests
  const openMaintenanceRequests = properties?.getOpenmaintenance?.statuses?.Open
  const totalMaintenance = properties?.getOpenmaintenance?.totalMaintenance

  const maintenancePercent = Math.ceil((openMaintenanceRequests/totalMaintenance) * 100) | 0

  return (
    <Row>
      <Col md={6} xl={3}>
        <StatisticsWidget2
          variant="blue"
          description="Total Properties"
          stats={totalProperties?.toString()}
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
          progress={Math.ceil(overallOccupancyRate * 100) | 0}
          counterOptions={{
            suffix: "%",
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget2
          variant="warning"
          description="Total Rent Collected"
          stats={totalRentCollected?.toString()}
          icon="fe-dollar-sign"
          progress={rentPercent} // You might want to calculate this based on expected rent
          counterOptions={{
            prefix: "$",
          }}
        />
      </Col>
      <Col md={6} xl={3}>
        <StatisticsWidget2
          variant="info"
          description="Open Maintenance Requests"
          stats={openMaintenanceRequests?.toString()}
          icon="fe-tool"
          progress={maintenancePercent} // Assuming an average of 5 requests per property is 100%
          counterOptions={{
            suffix: "",
          }}
        />
      </Col>
    </Row>
  );
};

export default PropertyStatistics;