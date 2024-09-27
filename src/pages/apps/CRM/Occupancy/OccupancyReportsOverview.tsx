import React, { useEffect, useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// components
import StatisticsWidget from '../../../../components/StatisticsWidget';

// types
import { OccupancyReportsType, PropertyOccupancy } from './types';
import { OccupancyReportType } from '../../../../redux/auth/reducers';

interface OccupancyReportsOverviewProps {
  occupancyReports: OccupancyReportsType[];
  propertyOccupancies: PropertyOccupancy[];
  OccupancyReportType:OccupancyReportType
}

const OccupancyReportsOverview: React.FC<OccupancyReportsOverviewProps> = ({
  occupancyReports,
  propertyOccupancies,
  OccupancyReportType
}) => {
  // Calculate summary statistics

 
  const stats = useMemo(() => {
    const totalProperties = OccupancyReportType.totalProperties;
    const totalUnits = OccupancyReportType.totalunits;
    const overallOccupancyRate = OccupancyReportType.averageOccupancyRate;
    const totalRentCollected = OccupancyReportType.totalRentCollected;
    return {
      totalProperties,
      totalUnits,
      overallOccupancyRate,
      totalRentCollected
    };
  }, [occupancyReports, propertyOccupancies,OccupancyReportType]);

  // Prepare data for occupancy trends chart
  const chartData = useMemo(() => {
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    // This is a placeholder. In a real application, you would calculate this from actual data
    const occupancyTrendsData = OccupancyReportType.occupancyRatesMonthly;

    return {
      categories: last12Months,
      series: occupancyTrendsData
    };
  }, [OccupancyReportType]);

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
            description="Overall Occupancy Rate"   counterOptions={{
              suffix: "%",
              decimals: 2,
            }}
            stats={stats.overallOccupancyRate.toString()}
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
            counterOptions={{
              prefix: "$",
            }}
            stats={stats.totalRentCollected.toString()}
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