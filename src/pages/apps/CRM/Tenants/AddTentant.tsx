import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VerticalForm, FormInput } from "../../../../components";

interface AddTenantProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (value: any) => void;
}

const AddTenant = ({ show, onHide, onSubmit }: AddTenantProps) => {
  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter name"),
      email: yup.string().required("Please enter email").email("Please enter valid email"),
      phone: yup.string().required("Please enter phone").matches(/^\d{10}$/, "Phone number is not valid"),
      unitNumber: yup.string().required("Please enter unit number"),
      leaseStartDate: yup.date().required("Please enter lease start date"),
      leaseEndDate: yup.date().required("Please enter lease end date"),
      rentAmount: yup.number().required("Please enter rent amount").positive("Rent amount must be positive"),
      securityDeposit: yup.number().required("Please enter security deposit").positive("Security deposit must be positive"),
      occupants: yup.number().required("Please enter number of occupants").positive().integer(),
      pets: yup.boolean().required("Please specify if pets are allowed"),
      parkingSpace: yup.string().nullable(),
    })
  );

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add New Tenant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
          <Row>
            <Col md={6}>
              <FormInput
                label="Name"
                type="text"
                name="name"
                placeholder="Enter tenant's full name"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Email address"
                type="email"
                name="email"
                placeholder="Enter email"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Phone"
                type="text"
                name="phone"
                placeholder="Enter phone number"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Unit Number"
                type="text"
                name="unitNumber"
                placeholder="Enter unit number"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Lease Start Date"
                type="date"
                name="leaseStartDate"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Lease End Date"
                type="date"
                name="leaseEndDate"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormInput
                label="Rent Amount"
                type="number"
                name="rentAmount"
                placeholder="Enter monthly rent amount"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={6}>
              <FormInput
                label="Security Deposit"
                type="number"
                name="securityDeposit"
                placeholder="Enter security deposit amount"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormInput
                label="Number of Occupants"
                type="number"
                name="occupants"
                placeholder="Enter number of occupants"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={4}>
              <FormInput
                label="Pets Allowed"
                type="checkbox"
                name="pets"
                containerClass={"mb-3"}
              />
            </Col>
            <Col md={4}>
              <FormInput
                label="Parking Space"
                type="text"
                name="parkingSpace"
                placeholder="Enter parking space number"
                containerClass={"mb-3"}
              />
            </Col>
          </Row>
          <div className="text-end">
            <Button variant="success" type="submit" className="waves-effect waves-light me-1">
              Save
            </Button>
            <Button variant="danger" className="waves-effect waves-light" onClick={onHide}>
              Cancel
            </Button>
          </div>
        </VerticalForm>
      </Modal.Body>
    </Modal>
  );
};

export default AddTenant;