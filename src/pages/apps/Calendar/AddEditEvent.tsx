import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Row, Col, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventInput } from "@fullcalendar/core";
import { FormInput } from "../../../components/";

interface FormValues {
  title: string;
  eventType: string;
  start: string;
  end: string;
  description: string;
}

interface AddEditEventProps {
  isOpen: boolean;
  onClose: () => void;
  isEditable: boolean;
  eventData: EventInput;
  userType: 'tenant' | 'landlord' | 'manager';
  onRemoveEvent?: () => void;
  onUpdateEvent: (value: any) => void;
  onAddEvent: (value: any) => void;
}

const AddEditEvent: React.FC<AddEditEventProps> = ({
  isOpen,
  onClose,
  isEditable,
  eventData,
  userType,
  onRemoveEvent,
  onUpdateEvent,
  onAddEvent,
}) => {
  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required("Please enter event title"),
      eventType: yup.string().required("Please select event type"),
      start: yup.date().required("Please enter start date"),
      end: yup.date().required("Please enter end date"),
      description: yup.string(),
    })
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      title: eventData.title as string,
      eventType: (eventData.extendedProps?.eventType as string) || "rent",
      start: eventData.start as string,
      end: eventData.end as string,
      description: eventData.extendedProps?.description as string,
    },
    resolver: schemaResolver,
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitEvent = (data: FormValues) => {
    isEditable ? onUpdateEvent(data) : onAddEvent(data);
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditable ? "Edit Event" : "Add New Event"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitEvent)}>
          <Row>
            <Col sm={12}>
              <FormInput
                type="text"
                label="Event Title"
                name="title"
                placeholder="Enter event title"
                containerClass="mb-3"
                register={register}
                key="title"
                errors={errors}
                control={control}
              />
            </Col>
            <Col sm={12}>
              <FormInput
                type="select"
                label="Event Type"
                name="eventType"
                containerClass="mb-3"
                register={register}
                key="eventType"
                errors={errors}
                control={control}
              >
                <option value="rent">Rent Payment</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Inspection</option>
                {userType !== 'tenant' && <option value="leaseExpiry">Lease Expiry</option>}
              </FormInput>
            </Col>
            <Col sm={6}>
              <FormInput
                type="date"
                label="Start Date"
                name="start"
                containerClass="mb-3"
                register={register}
                key="start"
                errors={errors}
                control={control}
              />
            </Col>
            <Col sm={6}>
              <FormInput
                type="date"
                label="End Date"
                name="end"
                containerClass="mb-3"
                register={register}
                key="end"
                errors={errors}
                control={control}
              />
            </Col>
            <Col sm={12}>
              <FormInput
                type="textarea"
                label="Description"
                name="description"
                placeholder="Enter event description"
                containerClass="mb-3"
                register={register}
                key="description"
                errors={errors}
                control={control}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-end">
              {isEditable && userType !== 'tenant' && (
                <Button variant="danger" className="me-2" onClick={onRemoveEvent}>
                  Delete
                </Button>
              )}
              <Button variant="light" className="me-2" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Col>
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditEvent;