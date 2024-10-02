import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PropertyOccupancyChartProps {
  properties: any;
}

const PropertyOccupancyChart: React.FC<PropertyOccupancyChartProps> = ({ properties }) => {
  const sortedProperties = properties?.eachOccupancy

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      },
      formatter: function (val) {
        return val + "%";
      }
    },
    xaxis: {
      categories: sortedProperties?.map((property:any) => property?.name),
      labels: {
        formatter: function (val) {
          return val + "%";
        }
      }
    },
    yaxis: {
      title: {
        text: 'Properties'
      }
    },
    colors: ['#008FFB'],
    title: {
      text: 'Property Occupancy Rates',
      align: 'center',
      style: {
        fontSize: '18px'
      }
    }
  };

  const series = [{
    name: 'Occupancy Rate',
    data: sortedProperties?.map((property:any) => +((property?.tenants/property?.units) * 100).toFixed(1))
  }];

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>View Details</Dropdown.Item>
            <Dropdown.Item>Export Data</Dropdown.Item>
            <Dropdown.Item>Generate Report</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Property Occupancy</h4>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
      </Card.Body>
    </Card>
  );
};

export default PropertyOccupancyChart;