import React, { useEffect } from "react";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../../../../components";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { AuthActionTypes } from "../../../../redux/auth/constants";
import { AppDispatch } from "../../../../redux/store";
import { useForm, Controller } from "react-hook-form";
import { createNewTenant } from "../../../../redux/actions";

interface Property {
  _id: string;
  name: string;
}

interface TenantFormData {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  idPassportNumber: string;
  unit: string;
  leaseStartDate: string;
  leaseEndDate: string;
  rentAmount: number;
  securityDeposit: number;
  numberOfOccupants: number;
  pets: boolean;
}

const schema = yup.object().shape({
  propertyId: yup.string().required("Please select a property"),
  name: yup.string().required("Please enter name"),
  email: yup.string().required("Please enter email").email("Please enter valid email"),
  phone: yup.string().required("Please enter phone").matches(/^\d{10}$/, "Phone number is not valid"),
  idPassportNumber: yup.string().required("Please enter ID or Passport number"),
  unitNumber: yup.string().required("Please enter unit number"),
  leaseStartDate: yup.date().required("Please enter lease start date"),
  leaseEndDate: yup.date()
    .required("Please enter lease end date")
    .min(yup.ref('leaseStartDate'), "End date can't be before start date"),
  rentAmount: yup.number()
    .required("Please enter rent amount")
    .positive("Rent amount must be positive"),
  securityDeposit: yup.number()
    .required("Please enter security deposit")
    .positive("Security deposit must be positive"),
  occupants: yup.number()
    .required("Please enter number of occupants")
    .positive("Number of occupants must be positive")
    .integer("Number of occupants must be an integer"),
  pets: yup.boolean().required("Please specify if pets are allowed"),
});

const AddTenantPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { propertiesList, tenantlist, loading, error } = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    dispatch({ type: AuthActionTypes.GETPROPERTY, payload: { limit: 1000 } });
  }, [dispatch]);

  const { control, handleSubmit, formState: { errors }, watch } = useForm<TenantFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      propertyId: "",
      name: "",
      email: "",
      phone: "",
      idPassportNumber: "",
      unit: "",
      leaseStartDate: "",
      leaseEndDate: "",
      rentAmount: 0,
      securityDeposit: 0,
      numberOfOccupants: 1,
      pets: false,
    }
  });

  // Log form values as they change
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => 
      console.log(`Field ${name} changed to ${value} (type: ${type})`));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: TenantFormData) => {
    try {
      console.log(data)
} catch (error) {
  console.log(error)
}

  };

  if (loading) {
    return <Alert variant="info">Loading...</Alert>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!propertiesList || propertiesList.length === 0) {
    return (
      <Alert variant="warning">
        No properties available. Please <Alert.Link href="/apps/projects/create">add a property</Alert.Link> first.
      </Alert>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add New Tenant</Card.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <Controller
                name="propertyId"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Property"
                    type="select"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  >
                    <option value="">Select a property</option>
                    {propertiesList.map((property: Property) => (
                      <option key={property._id} value={property._id}>
                        {property.name}
                      </option>
                    ))}
                  </FormInput>
                )}
              />
            </Col>
            <Col md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Name"
                    type="text"
                    placeholder="Enter tenant's full name"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
            <Col md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Phone"
                    type="tel"
                    placeholder="Enter phone number"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Controller
                name="idPassportNumber"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="ID/Passport Number"
                    type="text"
                    placeholder="Enter ID or Passport number"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
            <Col md={6}>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Unit Number"
                    type="text"
                    placeholder="Enter unit number"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}

              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Controller
                name="leaseStartDate"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Lease Start Date"
                    type="date"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
            <Col md={6}>
              <Controller
                name="leaseEndDate"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Lease End Date"
                    type="date"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Controller
                name="rentAmount"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Rent Amount"
                    type="number"
                    placeholder="Enter monthly rent amount"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
            <Col md={6}>
              <Controller
                name="securityDeposit"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Security Deposit"
                    type="number"
                    placeholder="Enter security deposit amount"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Controller
                name="numberOfOccupants"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Number of Occupants"
                    type="number"
                    placeholder="Enter number of occupants"
                    containerClass={"mb-3"}
                    {...field}
                    errors={errors}
                  />
                )}

              />
            </Col>
            <Col md={6}>
              <Controller
                name="pets"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormInput
                    label="Pets Allowed"
                    type="checkbox"
                    containerClass={"mb-3"}
                    {...field}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    errors={errors}
                  />
                )}
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
        </form>
      </Card.Body>
    </Card>
  );
};

export default AddTenantPage;