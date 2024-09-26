import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VerticalForm, FormInput } from "../../../../components";
import { useNavigate } from 'react-router-dom';

interface Property {
  id: number;
  name: string;
}

// Dummy data for properties
const dummyProperties: Property[] = [
  { id: 1, name: "Sunset Apartments" },
  { id: 2, name: "Green Valley Condos" },
  { id: 3, name: "Riverside Townhouses" },
  { id: 4, name: "Mountain View Villas" },
];

const AddTenantPage: React.FC = () => {
  const navigate = useNavigate();

  const schemaResolver = yupResolver(
    yup.object().shape({
      propertyId: yup.number().required("Please select a property"),
      name: yup.string().required("Please enter name"),
      email: yup.string().required("Please enter email").email("Please enter valid email"),
      phone: yup.string().required("Please enter phone").matches(/^\d{10}$/, "Phone number is not valid"),
      unitNumber: yup.string().required("Please enter unit number"),
      leaseStartDate: yup.date().required("Please enter lease start date"),
      leaseEndDate: yup.date().required("Please enter lease end date")
        .min(yup.ref('leaseStartDate'), "End date can't be before start date"),
      rentAmount: yup.number().required("Please enter rent amount").positive("Rent amount must be positive"),
      securityDeposit: yup.number().required("Please enter security deposit").positive("Security deposit must be positive"),
      occupants: yup.number().required("Please enter number of occupants").positive().integer(),
      pets: yup.boolean().required("Please specify if pets are allowed"),
      parkingSpace: yup.string().nullable(),
    })
  );

  const handleSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend
    // For now, we'll just log it and navigate back to the tenants list
    navigate('/apps/crm/tenants');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add New Tenant</Card.Title>
        <VerticalForm onSubmit={handleSubmit} resolver={schemaResolver} defaultValues={{}}>
          <Row>
            <Col md={6}>
              <FormInput
                label="Property"
                type="select"
                name="propertyId"
                containerClass={"mb-3"}
              >
                <option value="">Select a property</option>
                {dummyProperties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </FormInput>
            </Col>
            <Col md={6}>
              <FormInput
                label="Name"
                type="text"
                name="name"
                placeholder="Enter tenant's full name"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Email address"
                type="email"
                name="email"
                placeholder="Enter email"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Phone"
                type="text"
                name="phone"
                placeholder="Enter phone number"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Unit Number"
                type="text"
                name="unitNumber"
                placeholder="Enter unit number"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Lease Start Date"
                type="date"
                name="leaseStartDate"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Lease End Date"
                type="date"
                name="leaseEndDate"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Rent Amount"
                type="number"
                name="rentAmount"
                placeholder="Enter monthly rent amount"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Security Deposit"
                type="number"
                name="securityDeposit"
                placeholder="Enter security deposit amount"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Number of Occupants"
                type="number"
                name="occupants"
                placeholder="Enter number of occupants"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Pets Allowed"
                type="checkbox"
                name="pets"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Parking Space"
                type="text"
                name="parkingSpace"
                placeholder="Enter parking space number (if applicable)"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <div className="text-end">
            <Button variant="success" type="submit" className="waves-effect waves-light me-1">
              Add Tenant
            </Button>
            <Button variant="danger" className="waves-effect waves-light" onClick={() => navigate('/apps/crm/tenants')}>
              Cancel
            </Button>
          </div>
        </VerticalForm>
      </Card.Body>
    </Card>
  );
};

export default AddTenantPage;