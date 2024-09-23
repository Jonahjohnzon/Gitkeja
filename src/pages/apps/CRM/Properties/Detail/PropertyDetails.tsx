import React, { useState } from "react";
import { Row, Col, Card, Dropdown, Button, Image } from "react-bootstrap";

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

// Define the Property interface to match FormData from PropertyForm
interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  units: number;
  rentAmount: number;
  leaseTerms: string;
  description: string;
  amenities: string[];
  nearbyFacilities: string[];
  managers: { name: string; phone: string }[];
  acquisitionDate: Date;
  image: string | null;
  occupiedUnits: number; // Added for occupancy calculation
  maintenanceRequests: number; // Added for PropertyStatistics
  tenantSatisfaction: number; // Added for PropertyStatistics
}

const PropertyDetails: React.FC = () => {
  const [property] = useState<Property>({
    id: 1,
    name: "Sunset Apartments",
    location: "123 Moi Avenue, Nairobi, Kenya",
    type: "Residential Apartment Complex",
    units: 50,
    rentAmount: 50000, // Per unit in Kenyan Shillings
    leaseTerms: "12-month lease with option to renew. Security deposit required. Pets allowed with additional fee.",
    description: "Sunset Apartments is a modern residential complex offering comfortable living in the heart of Nairobi. With a range of amenities and excellent location, it's perfect for young professionals and families alike.",
    amenities: ["24/7 Security", "Swimming Pool", "Gym", "Covered Parking", "Children's Play Area"],
    nearbyFacilities: ["Shopping Mall", "Hospital", "Primary School", "University", "Public Transport"],
    managers: [
      { name: "John Doe", phone: "+254 712 345 678" },
      { name: "Jane Smith", phone: "+254 723 456 789" },
    ],
    acquisitionDate: new Date("2015-01-15"),
    image: "/path/to/property-image.jpg",
    occupiedUnits: 45,
    maintenanceRequests: 5,
    tenantSatisfaction: 4.2,
  });

  const calculateOccupancyRate = () => ((property.occupiedUnits / property.units) * 100).toFixed(2);
  const calculateMonthlyRevenue = () => property.rentAmount * property.occupiedUnits;

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
              {property.image && (
                <Image src={property.image} alt={property.name} fluid className="mb-3" />
              )}
              <Row>
                <Col md={6}>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p><strong>Type:</strong> {property.type}</p>
                  <p><strong>Total Units:</strong> {property.units}</p>
                  <p><strong>Occupied Units:</strong> {property.occupiedUnits}</p>
                  <p><strong>Occupancy Rate:</strong> {calculateOccupancyRate()}%</p>
                </Col>
                <Col md={6}>
                  <p><strong>Rent Amount (per unit):</strong> KES {property.rentAmount.toLocaleString()}</p>
                  <p><strong>Monthly Revenue:</strong> KES {calculateMonthlyRevenue().toLocaleString()}</p>
                  <p><strong>Acquisition Date:</strong> {property.acquisitionDate.toDateString()}</p>
                </Col>
              </Row>
              <h5 className="mt-3">Description</h5>
              <p>{property.description}</p>
              <h5 className="mt-3">Lease Terms</h5>
              <p>{property.leaseTerms}</p>
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
              <PropertyManagers managers={property.managers} />
              <div className="mt-4">
                <Button variant="primary" className="me-2">View All Units</Button>
                <Button variant="outline-secondary">Schedule Inspection</Button>
              </div>
            </Card.Body>
          </Card>
          <Row>
            <Col md={6}>
              <PropertyStatistics
                totalUnits={property.units}
                occupiedUnits={property.occupiedUnits}
                monthlyRevenue={calculateMonthlyRevenue()}
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