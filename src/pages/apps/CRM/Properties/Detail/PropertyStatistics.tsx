import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import CountUp from "react-countup";

interface StatisticsProps {
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  maintenanceRequests: number;
  tenantSatisfaction: number;
}

const PropertyStatistics: React.FC<StatisticsProps> = ({
  totalUnits,
  occupiedUnits,
  monthlyRevenue,
  maintenanceRequests,
  tenantSatisfaction
}) => {
  const occupancyRate = (occupiedUnits / totalUnits) * 100;

  const statistics = [
    {
      icon: "fe-home",
      variant: "primary",
      title: "Total Units",
      stats: totalUnits,
      description: `${occupiedUnits} occupied`,
    },
    {
      icon: "fe-pie-chart",
      variant: "success",
      title: "Occupancy Rate",
      stats: occupancyRate.toFixed(1),
      description: "% of units occupied",
    },
    {
      icon: "fe-dollar-sign",
      variant: "info",
      title: "Monthly Revenue",
      stats: monthlyRevenue,
      description: "KES",
    },
    {
      icon: "fe-clipboard",
      variant: "warning",
      title: "Maintenance Requests",
      stats: maintenanceRequests,
      description: "open requests",
    },
    {
      icon: "fe-smile",
      variant: "danger",
      title: "Tenant Satisfaction",
      stats: tenantSatisfaction,
      description: "out of 5",
    }
  ];

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Property Statistics</h4>
        <Row>
          {statistics.map((stat, index) => (
            <Col key={index} sm={6} xl={index < 3 ? 4 : 6}>
              <Card className="widget-flat">
                <Card.Body>
                  <div className="float-end">
                    <i className={`${stat.icon} widget-icon bg-light-${stat.variant} rounded-circle text-${stat.variant}`}></i>
                  </div>
                  <h5 className={`text-muted font-weight-normal mt-0`} title={stat.title}>
                    {stat.title}
                  </h5>
                  <h3 className="mt-3 mb-3">
                    <CountUp 
                      end={Number(stat.stats)} 
                      separator="," 
                      duration={2} 
                      decimals={stat.title === "Occupancy Rate" || stat.title === "Tenant Satisfaction" ? 1 : 0}
                    />
                    {stat.title === "Occupancy Rate" && "%"}
                    {stat.title === "Monthly Revenue" && " KES"}
                  </h3>
                  <p className="mb-0 text-muted">
                    <span className="text-nowrap">{stat.description}</span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PropertyStatistics;