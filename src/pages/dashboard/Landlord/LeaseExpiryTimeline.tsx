import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LeaseExpiryData {
  x: string;  // Represents the label (e.g., 'Next 30 days', '31-60 days', etc.)
  y: number;  // Represents the corresponding value (e.g., the count of expiring leases)
}


interface Dashboard {
  leaseExpiryData: LeaseExpiryData[]
}

interface StatisticsProps {
  dashboard: Dashboard; // match prop name with lowercased 'dashboard'
}

const LeaseExpiryTimeline = ({dashboard}:StatisticsProps) => {
  const leaseExpiryData = dashboard.leaseExpiryData
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'top'
        },
      }
    },
    colors: ['#ff4560', '#feb019', '#00e396', '#008ffb'],
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: leaseExpiryData.map(d => d.x)
    },
    yaxis: {
      title: {
        text: "Number of Leases Expiring"
      }
    }
  };

  const series = [{
    data: leaseExpiryData.map(d => d.y)
  }];

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Generate Report</Dropdown.Item>
            <Dropdown.Item>Export Data</Dropdown.Item>
            <Dropdown.Item>Set Reminders</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Lease Expiry Timeline</h4>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
        <div className="mt-3 text-center">
          <p className="text-muted mb-0">
            Total leases expiring in next 90 days: {leaseExpiryData.slice(0, 3).reduce((sum, d) => sum + d.y, 0)}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LeaseExpiryTimeline;