import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "@fullcalendar/react";
import { DateSelectArg, EventClickArg, EventDropArg, EventInput } from "@fullcalendar/core";

// components
import PageTitle from "../../../components/PageTitle";
import Calendar from "./Calendar";
import AddEditEvent from "./AddEditEvent";

// data
import { getEventsByUserType } from "./data";

const SidePanel = () => {
  const externalEvents = [
    {
      id: 1,
      className: "bg-success",
      title: "New Tenant",
    },
    {
      id: 2,
      className: "bg-info",
      title: "Property Inspection",
    },
    {
      id: 3,
      className: "bg-warning",
      title: "Maintenance Request",
    },
    {
      id: 4,
      className: "bg-danger",
      title: "Rent Collection",
    },
  ];

  return (
    <>
      <div id="external-events" className="m-t-20">
        <br />
        <p className="text-muted">Drag and drop your event or click in the calendar</p>
        {externalEvents.map((event, index) => {
          return (
            <div
              key={index}
              className={`external-event ${event.className}`}
              title={event.title}
              data-class={event.className}
            >
              <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
              {event.title}
            </div>
          );
        })}
      </div>
    </>
  );
};

const CalendarApp = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [userType, setUserType] = useState<'tenant' | 'landlord' | 'manager'>('manager');

  useEffect(() => {
    const fetchedEvents = getEventsByUserType(userType);
    setEvents(fetchedEvents);
  }, [userType]);

  const onDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
    setIsEditable(false);
    setIsOpen(true);
  };

  const onEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event.toPlainObject() as EventInput);
    setIsEditable(true);
    setIsOpen(true);
  };

  const onEventDrop = (dropInfo: EventDropArg) => {
    setEvents(prevEvents => prevEvents.map(event =>
      event.id === dropInfo.event.id
        ? { ...event, start: dropInfo.event.startStr, end: dropInfo.event.endStr }
        : event
    ));
    // Here you would typically update the event in your backend
  };

  const onAddEvent = (newEvent: EventInput) => {
    setEvents(prevEvents => [...prevEvents, { ...newEvent, id: String(prevEvents.length + 1) }]);
    setIsOpen(false);
    // Here you would typically add the event to your backend
  };

  const onUpdateEvent = (updatedEvent: EventInput) => {
    setEvents(prevEvents => prevEvents.map(event =>
      event.id === selectedEvent?.id ? { ...event, ...updatedEvent } : event
    ));
    setIsOpen(false);
    // Here you would typically update the event in your backend
  };

  const onRemoveEvent = () => {
    if (selectedEvent) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));
      setIsOpen(false);
      // Here you would typically remove the event from your backend
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setSelectedEvent(null);
    setIsEditable(false);
  };

  const changeUserType = (newUserType: 'tenant' | 'landlord' | 'manager') => {
    setUserType(newUserType);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Apps", path: "/apps/calendar" },
          { label: "Calendar", path: "/apps/calendar", active: true },
        ]}
        title={"Calendar"}
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={3}>
                  <Button
                    className="btn btn-lg font-16 btn-primary w-100 mb-3"
                    id="btn-new-event"
                    onClick={toggleModal}
                  >
                    <i className="mdi mdi-plus-circle-outline"></i> Create New Event
                  </Button>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={userType}
                      onChange={(e) => changeUserType(e.target.value as 'tenant' | 'landlord' | 'manager')}
                    >
                      <option value="tenant">Tenant View</option>
                      <option value="landlord">Landlord View</option>
                      <option value="manager">Manager View</option>
                    </select>
                  </div>
                  <SidePanel />
                </Col>
                <Col lg={9}>
                  <Calendar
                    userType={userType}
                    onDateSelect={onDateSelect}
                    onEventClick={onEventClick}
                    onEventDrop={onEventDrop}
                    events={events}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {isOpen && (
        <AddEditEvent
          isOpen={isOpen}
          onClose={toggleModal}
          isEditable={isEditable}
          eventData={selectedEvent || {}}
          userType={userType}
          onRemoveEvent={onRemoveEvent}
          onUpdateEvent={onUpdateEvent}
          onAddEvent={onAddEvent}
        />
      )}
    </>
  );
};

export default CalendarApp;