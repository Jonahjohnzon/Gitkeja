import avatar1 from "../../../../assets/images/users/user-2.jpg";
import avatar2 from "../../../../assets/images/users/user-3.jpg";
import avatar3 from "../../../../assets/images/users/user-4.jpg";
import avatar4 from "../../../../assets/images/users/user-5.jpg";
import avatar5 from "../../../../assets/images/users/user-6.jpg";
import avatar6 from "../../../../assets/images/users/user-7.jpg";
import avatar7 from "../../../../assets/images/users/user-8.jpg";
import avatar8 from "../../../../assets/images/users/user-9.jpg";
import avatar9 from "../../../../assets/images/users/user-10.jpg";

export interface UserItem {
  id: number;
  name: string;
  avatar: string;
  position: string;
  email: string;
  phone?: string;
  property?: string;
}

export interface AdminItem extends UserItem {
  dateAdded: string;
}

export interface ManagerItem extends UserItem {
  property: string;
}

const administrators: AdminItem[] = [
  {
    id: 1,
    name: "Freddie J. Plourde",
    avatar: avatar2,
    position: "Super Admin",
    email: "freddie@example.com",
    phone: "+1 (123) 456-7890",
    dateAdded: "2023-01-01",
  },
  {
    id: 2,
    name: "Christopher Gallardo",
    avatar: avatar3,
    position: "Admin",
    email: "chris@example.com",
    phone: "+1 (234) 567-8901",
    dateAdded: "2023-03-15",
  },
];

const managers: ManagerItem[] = [
  {
    id: 3,
    name: "Joseph M. Rohr",
    avatar: avatar4,
    position: "Property Manager",
    email: "joseph@example.com",
    phone: "+1 (345) 678-9012",
    property: "Sunset Apartments",
  },
  {
    id: 4,
    name: "Mark K. Horne",
    avatar: avatar5,
    position: "Property Manager",
    email: "mark@example.com",
    phone: "+1 (456) 789-0123",
    property: "Lakeside Villas",
  },
  {
    id: 5,
    name: "James M. Fonville",
    avatar: avatar6,
    position: "Property Manager",
    email: "james@example.com",
    phone: "+1 (567) 890-1234",
    property: "Downtown Lofts",
  },
  {
    id: 6,
    name: "Jade M. Walker",
    avatar: avatar7,
    position: "Property Manager",
    email: "jade@example.com",
    phone: "+1 (678) 901-2345",
    property: "Green Valley Homes",
  },
  {
    id: 7,
    name: "Marie E. Tate",
    avatar: avatar8,
    position: "Property Manager",
    email: "marie@example.com",
    phone: "+1 (789) 012-3456",
    property: "Hillside Apartments",
  },
];

export { administrators, managers };