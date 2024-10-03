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
  profile_image: string;
  name: string;
  unitNumber: string;
  rentAmount: number;
  paymentStatus: PaymentStatus;
  tenancyStartDate: string;
  unit:string;
  status:string;
  leaseStartDate:Date;
  leaseEndDate:Date
}

export interface Transaction {
  id: number;
  transactionType: TransactionType;
  property: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}



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