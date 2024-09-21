import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typeahead } from "react-bootstrap-typeahead";

// components
import PageTitle from "../../../../components/PageTitle";
import HyperDatepicker from "../../../../components/Datepicker";
import FileUploader from "../../../../components/FileUploader";
import { FormInput } from "../../../../components";

import placeholderImage from "../../../../assets/images/user-1.png";

interface ManagerTypes {
  value: string;
  name: string;
  image: string;
}

const PropertyForm = () => {
  const [acquisitionDate, setAcquisitionDate] = useState<Date>(new Date());
  const [managers] = useState<ManagerTypes[]>([
    { value: "John Doe", name: "John Doe", image: placeholderImage },
    { value: "Jane Smith", name: "Jane Smith", image: placeholderImage },
    // Add more managers as needed
  ]);
  const [selectedManagers, setSelectedManagers] = useState<ManagerTypes[]>([]);

  const selectManagers = (e: any) => {
    if (e.length !== 0) {
      const isAlreadySelected = selectedManagers.filter(
        (x) => x["name"] === e[0].name
      );
      if (isAlreadySelected && isAlreadySelected.length === 0) {
        setSelectedManagers([...selectedManagers, e[0]]);
      }
    }
  };

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter Property Name"),
      address: yup.string().required("Please enter Property Address"),
      type: yup.string().required("Please select Property Type"),
      units: yup.number().required("Please enter Number of Units").positive().integer(),
      rentAmount: yup.number().required("Please enter Rent Amount").positive(),
    })
  );

  const methods = useForm({ resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

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
              <form onSubmit={handleSubmit(() => {})}>
                <Row>
                  <Col xl={6}>
                    <FormInput
                      name="name"
                      label="Property Name"
                      placeholder="Enter property name"
                      containerClass={"mb-3"}
                      register={register}
                      key="name"
                      errors={errors}
                      control={control}
                    />

                    <FormInput
                      name="address"
                      label="Property Address"
                      placeholder="Enter property address"
                      containerClass={"mb-3"}
                      register={register}
                      key="address"
                      errors={errors}
                      control={control}
                    />

                    <Form.Group className="mb-3">
                      <Form.Label>Property Type</Form.Label>
                      <Form.Select {...register("type")}>
                        <option value="">Select type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Commercial">Commercial</option>
                      </Form.Select>
                    </Form.Group>

                    <FormInput
                      name="units"
                      label="Number of Units"
                      placeholder="Enter number of units"
                      type="number"
                      containerClass={"mb-3"}
                      register={register}
                      key="units"
                      errors={errors}
                      control={control}
                    />

                    <FormInput
                      name="rentAmount"
                      label="Rent Amount"
                      placeholder="Enter rent amount"
                      type="number"
                      containerClass={"mb-3"}
                      register={register}
                      key="rentAmount"
                      errors={errors}
                      control={control}
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Acquisition Date</Form.Label>
                      <HyperDatepicker
                        hideAddon
                        value={acquisitionDate}
                        onChange={(date) => setAcquisitionDate(date)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Property Managers</Form.Label>
                      <Typeahead
                        id="managers"
                        labelKey="name"
                        multiple={false}
                        options={managers}
                        placeholder="Select Property Manager..."
                        onChange={selectManagers}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Property Image</Form.Label>
                      <FileUploader />
                    </Form.Group>

                    <FormInput
                      name="description"
                      label="Property Description"
                      placeholder="Enter property description"
                      type="textarea"
                      rows="5"
                      containerClass={"mb-3"}
                      register={register}
                      key="description"
                      errors={errors}
                      control={control}
                    />
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