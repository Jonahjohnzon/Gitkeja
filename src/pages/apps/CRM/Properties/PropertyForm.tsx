import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../../../components/PageTitle";
import HyperDatepicker from "../../../../components/Datepicker";
import FileUploader from "../../../../components/FileUploader";
import { FormInput } from "../../../../components";

interface AmenityTypes {
  id: string;
  label: string;
}

interface NearbyFacilityTypes {
  id: string;
  label: string;
}

interface FormData {
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
  image: File | null;
}

const amenities: AmenityTypes[] = [
  { id: "security", label: "24/7 Security" },
  { id: "swimmingPool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "parking", label: "Parking" },
  { id: "playArea", label: "Children's Play Area" },
  { id: "waterSupply", label: "24/7 water supply" },
  { id: "roofTerrace", label: "Roof Terrace" },
  { id: "canteen", label: "Canteen" },
  { id: "sportsFields", label: "Tennis & Golf Fields" },
  { id: "workingSpace", label: "Communal Working Space" },
  { id: "spa", label: "Spa" },
  { id: "sauna", label: "Sauna" },
  { id: "heatedPool", label: "Heated Pool" },
  { id: "restaurant", label: "In house Restaurant" },
  { id: "bar", label: "In house Bar" },
  { id: "carCharging", label: "Electric Car Charging Ports" },
  { id: "kplcMeter", label: "KPLC Token Meter" },
  { id: "conferenceRoom", label: "Conference room" },
  { id: "elevators", label: "Elevators" },
];

const nearbyFacilities: NearbyFacilityTypes[] = [
  { id: "shoppingMall", label: "Shopping Mall" },
  { id: "hospital", label: "Hospital" },
  { id: "primarySchool", label: "Primary School" },
  { id: "secondarySchool", label: "Secondary School" },
  { id: "university", label: "University/College" },
  { id: "foodMarket", label: "Food Market" },
];

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const PropertyForm: React.FC = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = yup.object().shape({
    name: yup.string().required("Please enter Property Name").max(100, "Property Name must not exceed 100 characters"),
    location: yup.string().required("Please enter Property Location").max(200, "Property Location must not exceed 200 characters"),
    type: yup.string().required("Please select Property Type"),
    units: yup.number().required("Please enter Number of Units").positive().integer(),
    rentAmount: yup.number().required("Please enter Rent Amount").positive(),
    leaseTerms: yup.string().required("Please enter Lease Terms & Conditions"),
    description: yup.string().max(1000, "Description must not exceed 1000 characters"),
    amenities: yup.array().of(yup.string()),
    nearbyFacilities: yup.array().of(yup.string()),
    managers: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Manager name is required").max(100, "Manager name must not exceed 100 characters"),
        phone: yup.string().required("Manager phone is required").matches(phoneRegExp, 'Phone number is not valid'),
      })
    ).min(1, "At least one manager is required"),
    acquisitionDate: yup.date().required("Please select Acquisition Date").max(new Date(), "Acquisition Date cannot be in the future"),
    image: yup.mixed().test("fileSize", "File size is too large", (value) => {
      if (!value) return true; // Allow empty files
      return value && value.size <= 5000000; // 5MB limit
    }),
  });

  const { control, handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      managers: [{ name: '', phone: '' }],
      amenities: [],
      nearbyFacilities: [],
      acquisitionDate: new Date(),
      image: null,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "managers"
  });

  const watchAcquisitionDate = watch("acquisitionDate");

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      // Here you would typically send the data to your backend
      console.log(data);
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Property added successfully!");
    } catch (error) {
      setSubmitError("An error occurred while submitting the form. Please try again.");
    }
  };

  const AmenitiesCheckboxes: React.FC = () => (
    <Form.Group className="mb-3">
      <Form.Label>Amenities</Form.Label>
      <Row>
        {amenities.map((amenity) => (
          <Col sm={6} md={4} lg={3} key={amenity.id}>
            <Form.Check
              type="checkbox"
              id={`amenity-${amenity.id}`}
              label={amenity.label}
              {...register("amenities")}
              value={amenity.id}
            />
          </Col>
        ))}
      </Row>
    </Form.Group>
  );

  const NearbyFacilitiesCheckboxes: React.FC = () => (
    <Form.Group className="mb-3">
      <Form.Label>Nearby Facilities</Form.Label>
      <Row>
        {nearbyFacilities.map((facility) => (
          <Col sm={6} md={4} lg={3} key={facility.id}>
            <Form.Check
              type="checkbox"
              id={`facility-${facility.id}`}
              label={facility.label}
              {...register("nearbyFacilities")}
              value={facility.id}
            />
          </Col>
        ))}
      </Row>
    </Form.Group>
  );

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Properties", path: "/apps/properties" },
          { label: "Add Property", path: "/apps/properties/add", active: true },
        ]}
        title={"Add Property"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {submitError && <Alert variant="danger">{submitError}</Alert>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col xl={6}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Property Name"
                          type="text"
                          containerClass={"mb-3"}
                          {...field}
                          errors={errors}
                        />
                      )}
                    />

                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Property Location"
                          type="text"
                          containerClass={"mb-3"}
                          {...field}
                          errors={errors}
                        />
                      )}
                    />

                    <Form.Group className="mb-3">
                      <Form.Label>Property Type</Form.Label>
                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                          <Form.Select {...field} isInvalid={!!errors.type}>
                            <option value="">Select type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Condominium">Condominium</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="SingleFamily">Single Family</option>
                          </Form.Select>
                        )}
                      />
                      {errors.type && <Form.Control.Feedback type="invalid">{errors.type.message}</Form.Control.Feedback>}
                    </Form.Group>

                    <Controller
                      name="units"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Number of Units"
                          type="number"
                          containerClass={"mb-3"}
                          {...field}
                          errors={errors}
                        />
                      )}
                    />

                    <Controller
                      name="rentAmount"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Rent Amount"
                          type="number"
                          containerClass={"mb-3"}
                          {...field}
                          errors={errors}
                        />
                      )}
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Acquisition Date</Form.Label>
                      <HyperDatepicker
                        hideAddon
                        value={watchAcquisitionDate}
                        onChange={(date) => setValue("acquisitionDate", date)}
                        maxDate={new Date()}
                      />
                      {errors.acquisitionDate && <Form.Text className="text-danger">{errors.acquisitionDate.message}</Form.Text>}
                    </Form.Group>

                    {fields.map((field, index) => (
                      <Row key={field.id}>
                        <Col>
                          <Controller
                            name={`managers.${index}.name`}
                            control={control}
                            render={({ field }) => (
                              <FormInput
                                label={`Manager ${index + 1} Name`}
                                type="text"
                                containerClass={"mb-3"}
                                {...field}
                                errors={errors}
                              />
                            )}
                          />
                        </Col>
                        <Col>
                          <Controller
                            name={`managers.${index}.phone`}
                            control={control}
                            render={({ field }) => (
                              <FormInput
                                label={`Manager ${index + 1} Phone`}
                                type="tel"
                                containerClass={"mb-3"}
                                {...field}
                                errors={errors}
                              />
                            )}
                          />
                        </Col>
                        <Col xs="auto" className="d-flex align-items-end mb-3">
                          <Button variant="danger" onClick={() => remove(index)} disabled={fields.length === 1}>
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Button variant="secondary" onClick={() => append({ name: '', phone: '' })} className="mb-3">
                      Add Manager
                    </Button>

                    <Form.Group className="mb-3">
                      <Form.Label>Property Image</Form.Label>
                      <Controller
                        name="image"
                        control={control}
                        render={({ field: { value, onChange, ...field } }) => (
                          <FileUploader
                            {...field}
                            onFileUpload={(files) => onChange(files[0])}
                            showPreview={true}
                          />
                        )}
                      />
                      {errors.image && <Form.Text className="text-danger">{errors.image.message}</Form.Text>}
                    </Form.Group>

                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Property Description"
                          type="textarea"
                          rows="5"
                          containerClass={"mb-3"}
                          {...field}
                          errors={errors}
                        />
                      )}
                    />

                    <Controller
                      name="leaseTerms"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          label="Lease Terms & Conditions"
                          type="textarea"
                          rows="5"
                          containerClass={"mb-3"}
                          {...field}
                          errors={errors}
                        />
                      )}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xl={12}>
                    <AmenitiesCheckboxes />
                    <NearbyFacilitiesCheckboxes />
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col className="text-end">
                    <Button variant="success" type="submit">
                      Add Property
                    </Button>
                    <Button variant="light" className="ms-1">
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PropertyForm;