import placeholderImage from "../../../../assets/images/user-1.png";

export interface PropertyType {
  id: number;
  name: string;
  address: string;
  status: 'Occupied' | 'Partially Occupied' | 'Vacant';
  description: string;
  units: number;
  rentAmount: number;
  managers: {
    image: string;
    name: string;
  }[];
  occupancyRate: number;
}

const properties: PropertyType[] = [
  {
    id: 1,
    name: "Sunset Apartments",
    address: "123 Main St, Nairobi",
    status: "Occupied",
    description: "A modern apartment complex with stunning views of the city skyline.",
    units: 50,
    rentAmount: 1000,
    managers: [
      { image: placeholderImage, name: "John Doe" },
      { image: placeholderImage, name: "Jane Smith" },
    ],
    occupancyRate: 95,
  },
  {
    id: 2,
    name: "Green Valley Homes",
    address: "456 Park Ave, Mombasa",
    status: "Partially Occupied",
    description: "Eco-friendly homes in a quiet suburban neighborhood.",
    units: 30,
    rentAmount: 1200,
    managers: [
      { image: placeholderImage, name: "Alice Johnson" },
    ],
    occupancyRate: 70,
  },
  {
    id: 3,
    name: "City Center Office Complex",
    address: "789 Business Blvd, Nairobi",
    status: "Vacant",
    description: "Prime office space in the heart of the business district.",
    units: 100,
    rentAmount: 2000,
    managers: [
      { image: placeholderImage, name: "Bob Wilson" },
      { image: placeholderImage, name: "Carol Brown" },
    ],
    occupancyRate: 0,
  },
  // Add more properties as needed
];

export { properties };