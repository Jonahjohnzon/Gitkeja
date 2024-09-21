import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Property } from "./data";

interface RentCollectionChartProps {
  properties: Property[];
}

const RentCollectionChart: React.FC<RentCollectionChartProps> = ({ properties }) => {
  // For this example, we'll assume the expected rent is 20% higher than collected rent
  const expectedRent = properties.reduce((sum, property) => sum + property.rentCollected * 1.2, 0);
  const collectedRent = properties.reduce((sum, property) => sum + property.rentCollected, 0);
  const collectionRate = (collectedRent / expectedRent) * 100;

  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        }
      },
    },
    colors: ['#20E647'],
    labels: ['Rent Collection'],
    title: {
      text: 'Rent Collection Progress',
      align: 'center',
      style: {
        fontSize: '18px'
      }
    }
  };

  const series = [Math.round(collectionRate)];

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
        <h4 className="header-title mb-3">Rent Collection</h4>
        <Chart
          options={chartOptions}
          series={series}
          type="radialBar"
          height={350}
        />
        <div className="text-center mt-2">
          <h5 className="mb-0">Total Collected: ${collectedRent.toLocaleString()}</h5>
          <p className="text-muted">Expected: ${expectedRent.toLocaleString()}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RentCollectionChart;