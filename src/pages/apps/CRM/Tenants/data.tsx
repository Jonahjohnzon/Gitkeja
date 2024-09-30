import avatar3 from "../../../../assets/images/users/user-3.jpg";
import avatar4 from "../../../../assets/images/users/user-4.jpg";


interface LeaseInfo {
  startDate: Date;
  endDate: Date;
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
  avatar?: string;
  name?: string;
  phone?: string;
  email?: string;
  unitNumber?: string;
  leaseInfo?: LeaseInfo;
  paymentHistory?: PaymentHistory;
  maintenanceRequests?: MaintenanceRequest[];
  occupants?: number;
  pets?: boolean;
  parkingSpace?: string | null;
}

export interface TenantDetailsManagement {
  id: number;
  avatar: string;
  name: string;
  phone: number;
  email: string;
  unitNumber: string;
  rentAmount: number;
  occupancyStartDate:Date | null;
  occupancyEndDate:Date | null;
  status:string;
}

const tenants: TenantDetails[] = [
  
];

export { tenants };