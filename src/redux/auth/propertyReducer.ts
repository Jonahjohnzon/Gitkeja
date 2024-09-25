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