import React from "react";
import { Row, Col } from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import RentPaymentOverview from "./RentPaymentOverview";
import RentPaymentGraph from "./RentPaymentGraph";
import UtilityUsageChart from "./UtilityUsageChart";
import LeaseInformation from "./LeaseInformation";
import CommunicationCenter from "./CommunicationCenter";
import { tenantData, rentPaymentData, utilityData, leaseData, messages } from "./data";

const TenantDashboard: React.FC = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboards", path: "/tenant-dashboard" },
          { label: "Tenant Dashboard", path: "/tenant-dashboard", active: true },
        ]}
        title={"Tenant Dashboard"}
      />
      <Row>
        <Col xl={12}>
          <RentPaymentOverview data={tenantData} />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <RentPaymentGraph rentData={rentPaymentData} />
        </Col>
        <Col xl={6}>
          <UtilityUsageChart data={utilityData} />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <LeaseInformation data={leaseData} />
        </Col>
        <Col xl={6}>
          <CommunicationCenter messages={messages} />
        </Col>
      </Row>
    </>
  );
};

export default TenantDashboard;