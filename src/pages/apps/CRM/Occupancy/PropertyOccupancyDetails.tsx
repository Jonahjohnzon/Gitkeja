import React, { useState, useMemo, useEffect } from 'react';
import { Card, Dropdown, Table, ProgressBar } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// types
import { PropertyOccupancy } from './types';
import axios from 'axios';
import config from '../../../../config';

interface PropertyOccupancyDetailsProps {
  propertyOccupancies: PropertyOccupancy[];
  propertiesList:any
}


const PropertyOccupancyDetails: React.FC<PropertyOccupancyDetailsProps> = ({
  propertyOccupancies,
  propertiesList
}) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyOccupancy | null>(
    propertyOccupancies[0] || null
  )

  const [pid, setPid] = useState(propertiesList[0]._id)
  const [name, setName] = useState<string | null>(selectedProperty?.name || null)

useEffect(()=>{
  setSelectedProperty(null)
axios.get(`${config.API_URL}/api/getMonthlyProperty?propertyId=${pid}`).then(resp =>{
  const result = resp.data
  if(result.result)
  {
    setArray(result.occupancyRates)
    setSelectedProperty(result.data)
    setName(result.data.name)
  }
})
},[pid])
  const [arrayData, setArray] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])

  const chartData = useMemo(() => {
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    // This is a placeholder. In a real application, you would calculate this from actual data

    return {
      categories: last12Months,
    };
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 300,
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
      text: 'Monthly Occupancy Rate',
      align: 'left',
    },
  };

  // Mock data for the chart - replace with actual data in production
  const series = [{
    name: 'Occupancy Rate',
    data: arrayData
  }];

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle variant="light" id="dropdown-property">
            {name ? name : 'Select Property'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {propertiesList.map((property:any) => (
              <Dropdown.Item 
                key={property._id} 
                onClick={() => {
                  setPid(property._id)
                  setName(property.name)
                }
                 
              }
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
                  <td>{selectedProperty.occupancyRate}%</td>
                </tr>
                <tr>
                  <th>Average Rent</th>
                  <td>${selectedProperty.averageRent}</td>
                </tr>
              </tbody>
            </Table>

            <h5>Occupancy Rate</h5>
            <ProgressBar 
              now={selectedProperty.occupancyRate} 
              label={`${selectedProperty.occupancyRate}%`}
              variant={selectedProperty.occupancyRate > 90 ? 'success' : selectedProperty.occupancyRate > 70 ? 'warning' : 'danger'}
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
          <p>Loading...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default PropertyOccupancyDetails;