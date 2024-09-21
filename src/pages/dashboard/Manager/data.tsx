
export interface Property {
  id: number;
  name: string;
  units: number;
  occupancyRate: number;
  rentCollected: number;
  maintenanceRequests: number;
}

export const properties: Property[] = [
  {
    id: 1,
    name: "Sunset Apartments",
    units: 50,
    occupancyRate: 0.92,
    rentCollected: 75000,
    maintenanceRequests: 5
  },
  {
    id: 2,
    name: "Lakeside Villas",
    units: 30,
    occupancyRate: 0.87,
    rentCollected: 60000,
    maintenanceRequests: 3
  },
  {
    id: 3,
    name: "Downtown Lofts",
    units: 40,
    occupancyRate: 0.95,
    rentCollected: 90000,
    maintenanceRequests: 2
  },
  {
    id: 4,
    name: "Green Valley Homes",
    units: 25,
    occupancyRate: 0.88,
    rentCollected: 45000,
    maintenanceRequests: 4
  },
  {
    id: 5,
    name: "Hillside Apartments",
    units: 35,
    occupancyRate: 0.91,
    rentCollected: 70000,
    maintenanceRequests: 6
  }
];

export interface MaintenanceRequest {
  id: number;
  property: string;
  unit: string;
  issue: string;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
}

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 1,
    property: "Sunset Apartments",
    unit: "A101",
    issue: "Leaking faucet",
    status: "Open",
    priority: "Low"
  },
  {
    id: 2,
    property: "Lakeside Villas",
    unit: "B205",
    issue: "AC not working",
    status: "In Progress",
    priority: "High"
  },
  {
    id: 3,
    property: "Downtown Lofts",
    unit: "C304",
    issue: "Broken window",
    status: "Open",
    priority: "Medium"
  },
  {
    id: 4,
    property: "Green Valley Homes",
    unit: "D102",
    issue: "Clogged drain",
    status: "Closed",
    priority: "Low"
  },
  {
    id: 5,
    property: "Hillside Apartments",
    unit: "E201",
    issue: "Electrical outlet not working",
    status: "In Progress",
    priority: "Medium"
  }
];

export interface LeaseExpiry {
  id: number;
  property: string;
  unit: string;
  tenant: string;
  expiryDate: string;
}

export const leaseExpirations: LeaseExpiry[] = [
  {
    id: 1,
    property: "Sunset Apartments",
    unit: "A105",
    tenant: "John Doe",
    expiryDate: "2024-09-30"
  },
  {
    id: 2,
    property: "Lakeside Villas",
    unit: "B210",
    tenant: "Jane Smith",
    expiryDate: "2024-10-15"
  },
  {
    id: 3,
    property: "Downtown Lofts",
    unit: "C302",
    tenant: "Mike Johnson",
    expiryDate: "2024-09-20"
  },
  {
    id: 4,
    property: "Green Valley Homes",
    unit: "D104",
    tenant: "Emily Brown",
    expiryDate: "2024-11-05"
  },
  {
    id: 5,
    property: "Hillside Apartments",
    unit: "E205",
    tenant: "David Wilson",
    expiryDate: "2024-10-31"
  }
];