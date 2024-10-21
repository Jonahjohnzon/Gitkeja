import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget2 from "../../../components/StatisticsWidget2";

interface PropertyStatisticsProps {
  properties: any;
}

export const formatNumber = (num: number, decimals: number = 1): string => {
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

    //Suffix
 export const formatSuffix = (num: number):string => {
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

const PropertyStatistics: React.FC<PropertyStatisticsProps> = ({ properties }) => {
  // Calculate total properties
  const totalProperties = properties.totalProperties;
  
  // Calculate overall occupancy rate
  const overallOccupancyRate = (properties.totalOccupied/properties.totalUnits);

  // Calculate total rent collected
  const totalRentCollected = properties.totalCollected

  //rentPercent
  const rentPercent = Math.ceil((totalRentCollected/properties.totalRentAmount) * 100) | 0


  //total property value
  const propertyValue = properties?.totalPropertyAmount




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
          stats={(overallOccupancyRate * 100).toString()}
          icon="fe-users"
          progress={overallOccupancyRate * 100 | 0}
          counterOptions={{
            suffix: "%",
            decimals: 2,
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
          description="Total Property Value"
          stats={formatNumber(propertyValue)?.toString()}
          icon="fe-trending-up"
          progress={100} // Assuming an average of 5 requests per property is 100%
          counterOptions={{
            prefix: "$",
            suffix: formatSuffix(propertyValue),
            decimals: 1,
          }}
        />
      </Col>
    </Row>
  );
};

export default PropertyStatistics;