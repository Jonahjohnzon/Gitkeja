// types.ts

export interface OccupancyReport {
    id: number;
    propertyName: string;
    unitNumber: string;
    tenantName: string;
    occupancyStartDate: string;
    occupancyEndDate: string;
    status: 'Active' | 'Upcoming' | 'Expired';
    rentAmount: number;
  }
  
  export interface PropertyOccupancy {
    _id: number;
    name: string;
    totalUnits: number;
    occupiedUnits: number;
    occupancyRate: number;
    averageRent: number;
  }
  
  // Additional types that might be useful
  
  export type OccupancyStatus = 'Active' | 'Upcoming' | 'Expired';
  
  export interface OccupancyFilter {
    propertyName?: string;
    status?: OccupancyStatus | 'All';
    startDate?: string;
    endDate?: string;
  }
  
  export interface OccupancySortOption {
    field: keyof OccupancyReport;
    direction: 'asc' | 'desc';
  }
  
  export interface PropertyOccupancyTrend {
    propertyId: number;
    month: string;
    occupancyRate: number;
  }
  
  export interface RentCollectionSummary {
    totalExpectedRent: number;
    totalCollectedRent: number;
    collectionRate: number;
  }
  
  export interface MaintenanceRequest {
    id: number;
    propertyName: string;
    unitNumber: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdDate: string;
    lastUpdatedDate: string;
  }
  
  export interface LeaseExpiryAlert {
    id: number;
    propertyName: string;
    unitNumber: string;
    tenantName: string;
    leaseExpiryDate: string;
    daysUntilExpiry: number;
  }