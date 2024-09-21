import avatar3 from "../../../../assets/images/users/user-3.jpg";
import avatar4 from "../../../../assets/images/users/user-4.jpg";


interface LeaseInfo {
  startDate: string;
  endDate: string;
  rentAmount: number;
  securityDeposit: number;
}

interface PaymentHistory {
  lastPaymentDate: string;
  lastPaymentAmount: number;
  paymentMethod: string;
  outstandingBalance: number;
}

interface MaintenanceRequest {
  id: number;
  issue: string;
  status: 'Open' | 'In Progress' | 'Closed';
  dateSubmitted: string;
}

export interface TenantDetails {
  id: number;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  unitNumber: string;
  leaseInfo: LeaseInfo;
  paymentHistory: PaymentHistory;
  maintenanceRequests: MaintenanceRequest[];
  occupants: number;
  pets: boolean;
  parkingSpace: string | null;
  tenantScore: number;
}

const tenants: TenantDetails[] = [
  {
    id: 1,
    avatar: avatar4,
    name: "Paul J. Friend",
    phone: "937-330-1634",
    email: "pauljfrnd@jourrapide.com",
    unitNumber: "A101",
    leaseInfo: {
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      rentAmount: 1200,
      securityDeposit: 1200
    },
    paymentHistory: {
      lastPaymentDate: "2023-07-01",
      lastPaymentAmount: 1200,
      paymentMethod: "Bank Transfer",
      outstandingBalance: 0
    },
    maintenanceRequests: [
      {
        id: 101,
        issue: "Leaky faucet in kitchen",
        status: "Open",
        dateSubmitted: "2023-07-15"
      }
    ],
    occupants: 2,
    pets: false,
    parkingSpace: "P45",
    tenantScore: 95
  },
  {
    id: 2,
    avatar: avatar3,
    name: "Bryan J. Luellen",
    phone: "215-302-3376",
    email: "bryuellen@dayrep.com",
    unitNumber: "B205",
    leaseInfo: {
      startDate: "2023-03-01",
      endDate: "2024-02-29",
      rentAmount: 1500,
      securityDeposit: 1500
    },
    paymentHistory: {
      lastPaymentDate: "2023-07-02",
      lastPaymentAmount: 1500,
      paymentMethod: "Credit Card",
      outstandingBalance: 0
    },
    maintenanceRequests: [],
    occupants: 1,
    pets: true,
    parkingSpace: "P22",
    tenantScore: 88
  },
  // ... Add more tenant data here
];

export { tenants };