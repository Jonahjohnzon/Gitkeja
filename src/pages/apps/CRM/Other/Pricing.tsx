import React from "react";
import { Row, Col } from "react-bootstrap";
import PageTitle from "../../../../components/PageTitle";
import PricingCard, { PlanItemsTypes } from "../../../../components/PricingCard";

const Pricing = () => {
  const plans: PlanItemsTypes[] = [
    {
      id: 1,
      name: "Basic",
      icon: "fe-home",
      price: 1000,
      duration: "Month",
      features: [
        "Up to 5 units",
        "Automated invoicing",
        "Basic financial dashboard",
        "Maintenance request tracking",
        "Email support",
      ],
      isRecommended: false,
    },
    {
      id: 2,
      name: "Professional",
      icon: "fe-building",
      price: 2500,
      duration: "Month",
      features: [
        "Up to 20 units",
        "Advanced financial analytics",
        "Lease management",
        "Mpesa integration",
        "Kenya Power API integration",
        "24/7 support",
      ],
      isRecommended: true,
    },
    {
      id: 3,
      name: "Enterprise",
      icon: "fe-briefcase",
      price: 5000,
      duration: "Month",
      features: [
        "Unlimited units",
        "Custom reporting",
        "Multi-property management",
        "API access",
        "Dedicated account manager",
        "Priority support",
      ],
      isRecommended: false,
    },
  ];

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Pricing", path: "/pricing" },
          { label: "Plans", path: "/pricing/plans", active: true },
        ]}
        title={"Pricing Plans"}
      />
      <Row className="justify-content-center">
        <Col xl={10}>
          <div className="text-center">
            <h3 className="mb-2">
              Choose the plan that's right for you
            </h3>
            <p className="text-muted w-50 m-auto">
              Keja Plus offers flexible plans to suit your property management needs.
              Start with our free trial and upgrade as your portfolio grows.
            </p>
          </div>
          <PricingCard plans={plans} containerClass={"my-3"} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Pricing;