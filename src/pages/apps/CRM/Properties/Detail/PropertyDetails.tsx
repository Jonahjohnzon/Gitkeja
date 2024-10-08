import React, { useState , useEffect} from "react";
import { Row, Col, Card, Dropdown, Button, Image } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { APICore } from "../../../../../helpers/api/apiCore";

// Import sub-components
import PageTitle from "../../../../../components/PageTitle";
import PropertyStatistics from "./PropertyStatistics";
import PropertyManagers from "./PropertyManagers";
import TenantCommunications from "./TenantCommunications";
import PropertyDocuments from "./PropertyDocuments";
import { Propertybyid } from "../../../../../redux/auth/reducers";

// Placeholder components (to be implemented later)
const OccupancyChart: React.FC<{ propertyId: number }> = () => <div>Occupancy Chart Placeholder</div>;
const RentCollection: React.FC<{ propertyId: number }> = () => <div>Rent Collection Placeholder</div>;
const MaintenanceRequests: React.FC<{ propertyId: number }> = () => <div>Maintenance Requests Placeholder</div>;
const LeaseManagement: React.FC<{ propertyId: number }> = () => <div>Lease Management Placeholder</div>;




const PropertyDetails: React.FC = () => {
  const api = new APICore()
  const { id } = useParams();
  const [property, Setproperty] = useState(Propertybyid)
  const [propertyIdload, setPropertyIdload] = useState(false)
  
  const Get =async()=>{
    try{
      const baseUrl = "/api/getPropertyById/";
      const {data} = await api.get(`${baseUrl}`, {propertyId:id});
      if(data?.result)
      {
        Setproperty(data['data'])
        setPropertyIdload(data['result'])
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
  useEffect(()=>{
    Get()
  },[])
  const calculateMonthlyRevenue = () => property.rentAmount * property.occupancyUnits;

  return (
    <React.Fragment>
     {(property.name != "" && propertyIdload) && <PageTitle
        breadCrumbItems={[
          { label: "Properties", path: "/apps/properties" },
          { label: property.name, path: "/apps/properties/details", active: true },
        ]}
        title={property.name}
      />}
     {(property.name != "" && propertyIdload) && <Row>
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
                  <p><strong>Occupied Units:</strong> {property.occupancyUnits}</p>
                  <p><strong>Occupancy Rate:</strong> {property.occupancy.toFixed(2)}%</p>
                </Col>
                <Col md={6}>
                  <p><strong>Rent Amount (per unit):</strong> KES {property.rentAmount.toLocaleString()}</p>
                  <p><strong>Monthly Revenue:</strong> KES {property.monthlyRevenue}</p>
                  <p><strong>Acquisition Date:</strong> {format(property.acquisitionDate, 'MMMM dd, yyyy' )}</p>
                </Col>
              </Row>
              <h5 className="mt-3">Description</h5>
              <p>{property.description}</p>
              <h5 className="mt-3">Lease Terms</h5>
              <p>{property.leaseTerms}</p>
              <h5 className="mt-3">Amenities</h5>
              <ul >
                {(property?.amenities || []).map((amenity:string, index:number) => (
                  <li key={index} className=" fs-5">{amenity}</li>
                ))}
              </ul>
              <h5 className="mt-3">Nearby Facilities</h5>
              <ul >
                {(property?.nearbyFacilities || []).map((facility:string, index:number) => (
                  <li key={index}  className=" fs-5">{facility}</li>
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
                occupiedUnits={property.occupancyUnits}
                monthlyRevenue={calculateMonthlyRevenue()}
                maintenanceRequests={property.maintenanceRequests}
                tenantSatisfaction={property.tenantSatisfaction}
              />
            </Col>
            <Col md={6}>
              <OccupancyChart propertyId={property._id} />
            </Col>
          </Row>
          <RentCollection propertyId={property._id} />
          <MaintenanceRequests propertyId={property._id} />
        </Col>
        <Col xl={4}>
          <LeaseManagement propertyId={property._id} />
          <PropertyDocuments propertyId={property._id} />
          <TenantCommunications propertyId={property._id} />
        </Col>
      </Row>}
    </React.Fragment>
  );
};

export default PropertyDetails;