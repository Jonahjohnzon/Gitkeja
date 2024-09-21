import { EventInput } from "@fullcalendar/core";

// Helper function to get a date n days from now
const getDatePlusDays = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const defaultEvents: EventInput[] = [
  {
    id: "1",
    title: "Rent Due",
    start: new Date(),
    end: new Date(),
    className: "bg-danger",
    extendedProps: {
      eventType: "rent",
      description: "Monthly rent payment due"
    }
  },
  {
    id: "2",
    title: "Maintenance: Plumbing Check",
    start: getDatePlusDays(3),
    end: getDatePlusDays(3),
    className: "bg-warning",
    extendedProps: {
      eventType: "maintenance",
      description: "Routine plumbing inspection for all units"
    }
  },
  {
    id: "3",
    title: "Property Inspection",
    start: getDatePlusDays(7),
    end: getDatePlusDays(7),
    className: "bg-info",
    extendedProps: {
      eventType: "inspection",
      description: "Annual property inspection by management"
    }
  },
  {
    id: "4",
    title: "Lease Renewal - Unit 301",
    start: getDatePlusDays(14),
    end: getDatePlusDays(14),
    className: "bg-success",
    extendedProps: {
      eventType: "leaseRenewal",
      description: "Lease renewal for Unit 301"
    }
  },
  {
    id: "5",
    title: "Tenant Move-In - Unit 205",
    start: getDatePlusDays(20),
    end: getDatePlusDays(20),
    className: "bg-primary",
    extendedProps: {
      eventType: "moveIn",
      description: "New tenant moving into Unit 205"
    }
  }
];

// Function to get events based on user type
export const getEventsByUserType = (userType: 'tenant' | 'landlord' | 'manager'): EventInput[] => {
  switch (userType) {
    case 'tenant':
      return defaultEvents.filter(event => 
        ['rent', 'maintenance', 'inspection'].includes(event.extendedProps?.eventType as string)
      );
    case 'landlord':
      return defaultEvents.filter(event => 
        ['rent', 'inspection', 'leaseRenewal'].includes(event.extendedProps?.eventType as string)
      );
    case 'manager':
      return defaultEvents; // Managers can see all events
    default:
      return [];
  }
};

export { defaultEvents };