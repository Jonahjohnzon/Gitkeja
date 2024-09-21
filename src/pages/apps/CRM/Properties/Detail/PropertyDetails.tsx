import React, { useState } from "react";
import { Row, Col, Card, Dropdown, Button } from "react-bootstrap";

// Import sub-components
import PageTitle from "../../../../../components/PageTitle";
import PropertyStatistics from "./PropertyStatistics";
import PropertyManagers from "./PropertyManagers";
import TenantCommunications from "./TenantCommunications";
import PropertyDocuments from "./PropertyDocuments";

// Placeholder components (to be implemented later)
const OccupancyChart: React.FC<{ propertyId: number }> = () => <div>Occupancy Chart Placeholder</div>;
const RentCollection: React.FC<{ propertyId: number }> = () => <div>Rent Collection Placeholder</div>;
const MaintenanceRequests: React.FC<{ propertyId: number }> = () => <div>Maintenance Requests Placeholder</div>;
const LeaseManagement: React.FC<{ propertyId: number }> = () => <div>Lease Management Placeholder</div>;

// Define the Property interface
interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  status: 'Fully Occupied' | 'Partially Occupied' | 'Vacant';
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  yearBuilt: number;
  lastRenovation?: string;
  propertyManagers: {
    image: string;
    name: string;
  }[];
  description: string;
  amenities: string[];
  nearbyFacilities: string[];
  maintenanceRequests: number;
  tenantSatisfaction: number;
}

const PropertyDetails: React.FC = () => {
  const [property] = useState<Property>({
    id: 1,
    name: "Sunset Apartments",
    address: "123 Moi Avenue, Nairobi, Kenya",
    type: "Residential Apartment Complex",
    status: "Partially Occupied",
    totalUnits: 50,
    occupiedUnits: 45,
    monthlyRevenue: 2500000, // In Kenyan Shillings
    yearBuilt: 2015,
    lastRenovation: "2022",
    propertyManagers: [
      { name: "John Doe", image: "/path/to/john-doe.jpg" },
      { name: "Jane Smith", image: "/path/to/jane-smith.jpg" },
    ],
    description: "Sunset Apartments is a modern residential complex offering comfortable living in the heart of Nairobi. With a range of amenities and excellent location, it's perfect for young professionals and families alike.",
    amenities: ["24/7 Security", "Swimming Pool", "Gym", "Covered Parking", "Children's Play Area"],
    nearbyFacilities: ["Shopping Mall", "Hospital", "School", "Public Transport"],
    maintenanceRequests: 5,
    tenantSatisfaction: 4.2,
  });

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Properties", path: "/apps/properties" },
          { label: property.name, path: "/apps/properties/details", active: true },
        ]}
        title={property.name}
      />
      <Row>
        <Col xl={8}>
          <Card>
            <Card.Body>
              <Dropdown className="float-end" align="end">
                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Edit Property</Dropdown.Item>
                  <Dropdown.Item>Generate Report</Dropdown.Item>
                  <Dropdown.Item>Add Maintenance Schedule</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <h4 className="mb-3">Property Overview</h4>
              <Row>
                <Col md={6}>
                  <p><strong>Address:</strong> {property.address}</p>
                  <p><strong>Type:</strong> {property.type}</p>
                  <p><strong>Status:</strong> {property.status}</p>
                  <p><strong>Year Built:</strong> {property.yearBuilt}</p>
                  {property.lastRenovation && (
                    <p><strong>Last Renovation:</strong> {property.lastRenovation}</p>
                  )}
                </Col>
                <Col md={6}>
                  <p><strong>Total Units:</strong> {property.totalUnits}</p>
                  <p><strong>Occupied Units:</strong> {property.occupiedUnits}</p>
                  <p><strong>Occupancy Rate:</strong> {((property.occupiedUnits / property.totalUnits) * 100).toFixed(2)}%</p>
                  <p><strong>Monthly Revenue:</strong> KES {property.monthlyRevenue.toLocaleString()}</p>
                </Col>
              </Row>
              <h5 className="mt-3">Description</h5>
              <p>{property.description}</p>
              <h5 className="mt-3">Amenities</h5>
              <ul>
                {property.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
              <h5 className="mt-3">Nearby Facilities</h5>
              <ul>
                {property.nearbyFacilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
              <PropertyManagers managers={property.propertyManagers} />
              <div className="mt-4">
                <Button variant="primary" className="me-2">View All Units</Button>
                <Button variant="outline-secondary">Schedule Inspection</Button>
              </div>
            </Card.Body>
          </Card>
          <Row>
            <Col md={6}>
              <PropertyStatistics
                totalUnits={property.totalUnits}
                occupiedUnits={property.occupiedUnits}
                monthlyRevenue={property.monthlyRevenue}
                maintenanceRequests={property.maintenanceRequests}
                tenantSatisfaction={property.tenantSatisfaction}
              />
            </Col>
            <Col md={6}>
              <OccupancyChart propertyId={property.id} />
            </Col>
          </Row>
          <RentCollection propertyId={property.id} />
          <MaintenanceRequests propertyId={property.id} />
        </Col>
        <Col xl={4}>
          <LeaseManagement propertyId={property.id} />
          <PropertyDocuments propertyId={property.id} />
          <TenantCommunications propertyId={property.id} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PropertyDetails;