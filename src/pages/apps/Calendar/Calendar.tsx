import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import BootstrapTheme from "@fullcalendar/bootstrap";
import { EventInput, DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/core";

interface CalendarProps {
  userType: 'tenant' | 'landlord' | 'manager';
  onDateSelect: (arg: DateSelectArg) => void;
  onEventClick: (arg: EventClickArg) => void;
  onEventDrop: (arg: any) => void;
  events: EventInput[];
}

const Calendar: React.FC<CalendarProps> = ({
  userType,
  onDateSelect,
  onEventClick,
  onEventDrop,
  events,
}) => {
  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'rent': return '#4CAF50';
      case 'maintenance': return '#FFC107';
      case 'inspection': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    const eventType = eventContent.event.extendedProps?.eventType || 'default';
    const backgroundColor = getEventColor(eventType);
    return (
      <div style={{ backgroundColor, color: '#fff', padding: '2px 5px', borderRadius: '3px' }}>
        {eventContent.event.title}
      </div>
    );
  };

  return (
    <div id="property-management-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        themeSystem="bootstrap"
        editable={userType !== 'tenant'}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={onDateSelect}
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default Calendar;