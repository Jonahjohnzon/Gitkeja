import React, { useState } from 'react';
import { Card, Dropdown, Table, ProgressBar } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// types
import { PropertyOccupancy } from './types';

interface PropertyOccupancyDetailsProps {
  propertyOccupancies: PropertyOccupancy[];
}

const PropertyOccupancyDetails: React.FC<PropertyOccupancyDetailsProps> = ({
  propertyOccupancies,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyOccupancy | null>(
    propertyOccupancies[0] || null
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 300,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      text: 'Monthly Occupancy Rate',
      align: 'left',
    },
  };

  // Mock data for the chart - replace with actual data in production
  const series = [{
    name: 'Occupancy Rate',
    data: Array(12).fill(0).map(() => Math.floor(Math.random() * 30) + 70),
  }];

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle variant="light" id="dropdown-property">
            {selectedProperty ? selectedProperty.name : 'Select Property'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {propertyOccupancies.map((property) => (
              <Dropdown.Item 
                key={property.id} 
                onClick={() => setSelectedProperty(property)}
              >
                {property.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Property Occupancy Details</h4>

        {selectedProperty ? (
          <>
            <Table striped bordered hover className="mb-3">
              <tbody>
                <tr>
                  <th>Total Units</th>
                  <td>{selectedProperty.totalUnits}</td>
                </tr>
                <tr>
                  <th>Occupied Units</th>
                  <td>{selectedProperty.occupiedUnits}</td>
                </tr>
                <tr>
                  <th>Occupancy Rate</th>
                  <td>{(selectedProperty.occupancyRate * 100).toFixed(2)}%</td>
                </tr>
                <tr>
                  <th>Average Rent</th>
                  <td>${selectedProperty.averageRent.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>

            <h5>Occupancy Rate</h5>
            <ProgressBar 
              now={selectedProperty.occupancyRate * 100} 
              label={`${(selectedProperty.occupancyRate * 100).toFixed(2)}%`}
              variant={selectedProperty.occupancyRate > 0.9 ? 'success' : selectedProperty.occupancyRate > 0.7 ? 'warning' : 'danger'}
              className="mb-3"
            />

            <Chart
              options={chartOptions}
              series={series}
              type="line"
              height={300}
            />

            <div className="mt-3">
              <h5>Key Metrics</h5>
              <p>Total Revenue: ${(selectedProperty.occupiedUnits * selectedProperty.averageRent).toFixed(2)}</p>
              <p>Vacant Units: {selectedProperty.totalUnits - selectedProperty.occupiedUnits}</p>
              <p>Potential Additional Revenue: ${((selectedProperty.totalUnits - selectedProperty.occupiedUnits) * selectedProperty.averageRent).toFixed(2)}</p>
            </div>
          </>
        ) : (
          <p>No property selected. Please choose a property from the dropdown.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default PropertyOccupancyDetails;