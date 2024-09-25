import placeholderImage from "../../../../assets/images/user-1.png";


export interface PropertyType {
  _id: number;
  name: string;
  location: string;
  status?: 'Occupied' | 'Partially Occupied' | 'Vacant';
  description: string;
  units: number;
  rentAmount: number;
  managers: {
    image: string;
    name: string;
  }[];
  occupancy: number;
}



