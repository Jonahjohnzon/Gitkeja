import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import PropertyStatistics from "./PropertyStatistics";
import PropertyOccupancyChart from "./PropertyOccupancyChart";
import RentCollectionChart from "./RentCollectionChart";
import MaintenanceRequestsChart from "./MaintenanceRequestsChart";
import PropertyLocationMap from "./PropertyLocationMap";
import PropertyPerformance from "./PropertyPerformance";
import LeaseExpiryWidget from "./LeaseExpiryWidget";
import VacancyAlertWidget from "./VacancyAlertWidget";

// data
import { properties, maintenanceRequests, leaseExpirations } from "./data";

const PropertyManagerDashboard = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Property Management", path: "/property-management" },
          { label: "Dashboard", path: "/property-management/dashboard", active: true },
        ]}
        title={"Property Manager Dashboard"}
      />
      
      <PropertyStatistics properties={properties} />
      
      <Row>
        <Col md={12} xl={4}>
          <PropertyOccupancyChart properties={properties} />
        </Col>
        <Col md={6} xl={4}>
          <RentCollectionChart properties={properties} />
        </Col>
        <Col md={6} xl={4}>
          <MaintenanceRequestsChart requests={maintenanceRequests} />
        </Col>
      </Row>
      
      <Row>
        <Col xl={6}>
          <PropertyLocationMap properties={properties} />
        </Col>
        <Col xl={6}>
          <PropertyPerformance properties={properties} />
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <LeaseExpiryWidget leaseExpirations={leaseExpirations} />
        </Col>
        <Col md={6}>
          <VacancyAlertWidget properties={properties} />
        </Col>
      </Row>
    </>
  );
};

export default PropertyManagerDashboard;