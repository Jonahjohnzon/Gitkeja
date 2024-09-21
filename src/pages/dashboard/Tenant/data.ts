import profilePicPath from "../../../assets/images/user-1.png";

export type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

const profilePic: StaticImageData = {
  src: profilePicPath,
  height: 100,
  width: 100,
};

export interface TenantData {
  currentBalance: number;
  nextPaymentDue: {
    amount: number;
    date: string;
  };
  lastPayment: {
    amount: number;
    date: string;
  };
}

export interface UtilityUsage {
  month: string;
  waterStartReading: number;
  waterEndReading: number;
  garbageCost: number;
}

export interface LeaseInfo {
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  renewalOption: boolean;
}

export interface Message {
  id: number;
  userPic: StaticImageData;
  userName: string;
  text: string;
  postedOn: string;
  isAnnouncement?: boolean;
}

export interface RentPayment {
  month: string;
  onTimeAmount: number;
  lateAmount: number;
}

// Mock data
export const tenantData: TenantData = {
  currentBalance: 1200,
  nextPaymentDue: {
    amount: 1000,
    date: "2024-10-01"
  },
  lastPayment: {
    amount: 1000,
    date: "2024-09-01"
  }
};

export const utilityData: UtilityUsage[] = [
  { month: "Jan", waterStartReading: 1000, waterEndReading: 1150, garbageCost: 500 },
  { month: "Feb", waterStartReading: 1150, waterEndReading: 1290, garbageCost: 500 },
  { month: "Mar", waterStartReading: 1290, waterEndReading: 1450, garbageCost: 500 },
  { month: "Apr", waterStartReading: 1450, waterEndReading: 1605, garbageCost: 500 },
  { month: "May", waterStartReading: 1605, waterEndReading: 1770, garbageCost: 500 },
  { month: "Jun", waterStartReading: 1770, waterEndReading: 1950, garbageCost: 500 },
];

export const leaseData: LeaseInfo = {
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: 1000,
  securityDeposit: 1500,
  renewalOption: true
};

export const messages: Message[] = [
  {
    id: 1,
    userPic: profilePic,
    userName: "Property Manager",
    text: "Your maintenance request has been received and scheduled for tomorrow.",
    postedOn: "10:00",
    isAnnouncement: false
  },
  {
    id: 2,
    userPic: profilePic,
    userName: "Admin",
    text: "Building-wide pest control scheduled for next week. Please secure your pets.",
    postedOn: "14:30",
    isAnnouncement: true
  },
  {
    id: 3,
    userPic: profilePic,
    userName: "Property Manager",
    text: "Reminder: Rent is due in 5 days. Please ensure timely payment.",
    postedOn: "09:15",
    isAnnouncement: false
  }
];

export const rentPaymentData: RentPayment[] = [
  { month: "Jan", onTimeAmount: 8000, lateAmount: 2000 },
  { month: "Feb", onTimeAmount: 8500, lateAmount: 1500 },
  { month: "Mar", onTimeAmount: 9000, lateAmount: 1000 },
  { month: "Apr", onTimeAmount: 8800, lateAmount: 1200 },
  { month: "May", onTimeAmount: 9200, lateAmount: 800 },
  { month: "Jun", onTimeAmount: 9500, lateAmount: 500 },
];