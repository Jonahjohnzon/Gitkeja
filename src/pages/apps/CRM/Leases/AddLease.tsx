import React from "react";
import { Modal, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VerticalForm, FormInput } from "../../../../components/";

interface AddLeaseProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (value: any) => void;
}

const AddLease = ({ show, onHide, onSubmit }: AddLeaseProps) => {
  const schemaResolver = yupResolver(
    yup.object().shape({
      property: yup.string().required("Please enter property name"),
      unit: yup.string().required("Please enter unit number"),
      tenantName: yup.string().required("Please enter tenant name"),
      startDate: yup.date().required("Please enter lease start date"),
      endDate: yup.date().required("Please enter lease end date"),
      rentAmount: yup.number().required("Please enter monthly rent"),
      securityDeposit: yup.number().required("Please enter security deposit"),
    })
  );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Lease</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label="Property"
            type="text"
            name="property"
            placeholder="Enter property name"
            containerClass={"mb-3"}
          />
          <FormInput
            label="Unit"
            type="text"
            name="unit"
            placeholder="Enter unit number"
            containerClass={"mb-3"}
          />
          <FormInput
            label="Tenant Name"
            type="text"
            name="tenantName"
            placeholder="Enter tenant name"
            containerClass={"mb-3"}
          />
          <FormInput
            label="Start Date"
            type="date"
            name="startDate"
            containerClass={"mb-3"}
          />
          <FormInput
            label="End Date"
            type="date"
            name="endDate"
            containerClass={"mb-3"}
          />
          <FormInput
            label="Monthly Rent"
            type="number"
            name="rentAmount"
            placeholder="Enter monthly rent"
            containerClass={"mb-3"}
          />
          <FormInput
            label="Security Deposit"
            type="number"
            name="securityDeposit"
            placeholder="Enter security deposit"
            containerClass={"mb-3"}
          />
          <Button variant="primary" type="submit">
            Add Lease
          </Button>
        </VerticalForm>
      </Modal.Body>
    </Modal>
  );
};

export default AddLease;