import avatar1 from "../../../assets/images/users/user-2.jpg";
import avatar2 from "../../../assets/images/users/user-3.jpg";
import avatar3 from "../../../assets/images/users/user-4.jpg";
import avatar4 from "../../../assets/images/users/user-5.jpg";
import avatar5 from "../../../assets/images/users/user-6.jpg";

// Define types for our data structures
export type PaymentStatus = "Paid" | "Pending" | "Late";
export type TransactionType = "Rent" | "Maintenance" | "Deposit" | "Refund";
export type TransactionStatus = "Completed" | "Pending" | "Failed";

export interface Tenant {
  id: number;
  avatar: string;
  name: string;
  unitNumber: string;
  rentAmount: number;
  paymentStatus: PaymentStatus;
  tenancyStartDate: string;
}

export interface Transaction {
  id: number;
  transactionType: TransactionType;
  property: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}

// Top tenants data
export const topTenants: Tenant[] = [
  {
    id: 1,
    avatar: avatar1,
    name: "John Doe",
    unitNumber: "A101",
    rentAmount: 1500,
    paymentStatus: "Paid",
    tenancyStartDate: "2022-01-01",
  },
  {
    id: 2,
    avatar: avatar2,
    name: "Jane Smith",
    unitNumber: "B205",
    rentAmount: 1800,
    paymentStatus: "Pending",
    tenancyStartDate: "2021-06-15",
  },
  {
    id: 3,
    avatar: avatar3,
    name: "Robert Johnson",
    unitNumber: "C310",
    rentAmount: 2000,
    paymentStatus: "Late",
    tenancyStartDate: "2023-03-01",
  },
  {
    id: 4,
    avatar: avatar4,
    name: "Emily Brown",
    unitNumber: "A205",
    rentAmount: 1600,
    paymentStatus: "Paid",
    tenancyStartDate: "2022-11-01",
  },
  {
    id: 5,
    avatar: avatar5,
    name: "Michael Wilson",
    unitNumber: "B410",
    rentAmount: 2200,
    paymentStatus: "Paid",
    tenancyStartDate: "2023-01-15",
  },
];

// Recent transactions data
export const recentTransactions: Transaction[] = [
  {
    id: 1,
    transactionType: "Rent",
    property: "Sunrise Apartments",
    amount: 1500,
    date: "2024-08-01",
    status: "Completed",
  },
  {
    id: 2,
    transactionType: "Maintenance",
    property: "Sunset Condos",
    amount: 250,
    date: "2024-07-28",
    status: "Pending",
  },
  {
    id: 3,
    transactionType: "Deposit",
    property: "Lakeside Villas",
    amount: 2000,
    date: "2024-07-25",
    status: "Completed",
  },
  {
    id: 4,
    transactionType: "Rent",
    property: "Downtown Lofts",
    amount: 1800,
    date: "2024-07-20",
    status: "Failed",
  },
  {
    id: 5,
    transactionType: "Refund",
    property: "Hillside Apartments",
    amount: 500,
    date: "2024-07-15",
    status: "Completed",
  },
  {
    id: 6,
    transactionType: "Rent",
    property: "Riverside Apartments",
    amount: 1700,
    date: "2024-07-10",
    status: "Completed",
  },
];