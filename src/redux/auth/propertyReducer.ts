export interface PropertyType {
    _id?: string;
    name?: string;
    location?: string;
    status?: 'Occupied' | 'Partially Occupied' | 'Vacant';
    description?: string;
    units?: number;
    rentAmount?: number;
    managers?: {
      image?: string;
      name?: string;
    }[];
    occupancy?: number;
  }

export interface PropertyGetId {
        _id: number;
        name: string;
        location: string;
        type: string;
        units: number;
        rentAmount: number;
        leaseTerms: string;
        description: string;
        amenities: string[];
        nearbyFacilities: string[];
        managers: { name: string; phone: string }[];
        acquisitionDate: Date;
        image: string | null;
        occupiedUnits: number; // Added for occupancy calculation
        maintenanceRequests: number; // Added for PropertyStatistics
        tenantSatisfaction: number; // Added for PropertyStatistics
        occupancy:number
}