import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../../../../components/Spinner";
import { RootState } from "../../../../redux/store";

// components
import PageTitle from "../../../../components/PageTitle";
import HyperDatepicker from "../../../../components/Datepicker";
import FileUploader from "../../../../components/FileUploader";
import { FormInput } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { createNewProperty } from "../../../../redux/actions";
import TopDisplay from "../../../../layouts/TopDisplay";

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
  { id: "Security", label: "24/7 Security" },
  { id: "Swimming Pool", label: "Swimming Pool" },
  { id: "Gym", label: "Gym" },
  { id: "Parking", label: "Parking" },
  { id: "PlayArea", label: "Children's Play Area" },
  { id: "WaterSupply", label: "24/7 water supply" },
  { id: "RoofTerrace", label: "Roof Terrace" },
  { id: "Canteen", label: "Canteen" },
  { id: "SportsFields", label: "Tennis & Golf Fields" },
  { id: "Working Space", label: "Communal Working Space" },
  { id: "Spa", label: "Spa" },
  { id: "Sauna", label: "Sauna" },
  { id: "HeatedPool", label: "Heated Pool" },
  { id: "Restaurant", label: "In house Restaurant" },
  { id: "Bar", label: "In house Bar" },
  { id: "Car Charging", label: "Electric Car Charging Ports" },
  { id: "Kplc Meter", label: "KPLC Token Meter" },
  { id: "Conference Room", label: "Conference room" },
  { id: "Elevators", label: "Elevators" },
];

const nearbyFacilities: NearbyFacilityTypes[] = [
  { id: "Shopping Mall", label: "Shopping Mall" },
  { id: "Hospital", label: "Hospital" },
  { id: "Primary School", label: "Primary School" },
  { id: "Secondary School", label: "Secondary School" },
  { id: "University", label: "University/College" },
  { id: "Food Market", label: "Food Market" },
];

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const PropertyForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {propertyLoading} = useSelector((state:RootState) => state.Auth)

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
            dispatch(createNewProperty(data['name'], data['location'], data['type'], data['units'], data['rentAmount'], data['leaseTerms'], data['description'], data['amenities'], data['nearbyFacilities'], data['managers'], data['acquisitionDate'], data['image']))
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
    <TopDisplay/>
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
                    <Button variant="success"  type="submit" disabled={propertyLoading}>
                    {propertyLoading&&<Spinner
                  className="spinner-grow-sm me-1"
                  tag="span"
                  color="white"
                  type="grow"
                />}
                      <span>Add Property</span>
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