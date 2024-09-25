import React, { useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// components
import StatisticsWidget from '../../../../components/StatisticsWidget';

// types
import { OccupancyReport, PropertyOccupancy } from './types';

interface OccupancyReportsOverviewProps {
  occupancyReports: OccupancyReport[];
  propertyOccupancies: PropertyOccupancy[];
}

const OccupancyReportsOverview: React.FC<OccupancyReportsOverviewProps> = ({
  occupancyReports,
  propertyOccupancies,
}) => {
  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalProperties = propertyOccupancies.length;
    const totalUnits = propertyOccupancies.reduce((sum, property) => sum + property.totalUnits, 0);
    const occupiedUnits = propertyOccupancies.reduce((sum, property) => sum + property.occupiedUnits, 0);
    const overallOccupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;
    const totalRentCollected = occupancyReports.reduce((sum, report) => sum + report.rentAmount, 0);

    return {
      totalProperties,
      totalUnits,
      overallOccupancyRate,
      totalRentCollected
    };
  }, [occupancyReports, propertyOccupancies]);

  // Prepare data for occupancy trends chart
  const chartData = useMemo(() => {
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    // This is a placeholder. In a real application, you would calculate this from actual data
    const occupancyTrendsData = last12Months.map(() => Math.floor(Math.random() * 20) + 80);

    return {
      categories: last12Months,
      series: occupancyTrendsData
    };
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      title: {
        text: 'Occupancy Rate (%)',
      },
      min: 0,
      max: 100,
    },
    colors: ['#0acf97'],
    title: {
      text: 'Occupancy Rate Trends (Last 12 Months)',
      align: 'left',
    },
  };

  const series = [{
    name: 'Occupancy Rate',
    data: chartData.series,
  }];

  return (
    <>
      <Row>
        <Col sm={6} xl={3}>
          <StatisticsWidget
            description="Total Properties"
            stats={stats.totalProperties.toString()}
            icon="fe-home"
            variant="primary"
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatisticsWidget
            description="Overall Occupancy Rate"
            stats={`${stats.overallOccupancyRate.toFixed(2)}%`}
            icon="fe-users"
            variant="success"
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatisticsWidget
            description="Total Units"
            stats={stats.totalUnits.toString()}
            icon="fe-grid"
            variant="info"
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatisticsWidget
            description="Total Rent Collected"
            stats={`$${stats.totalRentCollected.toLocaleString()}`}
            icon="fe-dollar-sign"
            variant="warning"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">Occupancy Trends</h4>
              <Chart options={chartOptions} series={series} type="line" height={350} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OccupancyReportsOverview;