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
  _id: number;
  name: string;
  avatar: string;
  position: string;
  email: string;
  phone?: string;
  property?: string;
  profile_image:string
}

export interface AdminItem extends UserItem {
  dateAdded: string;
}

export interface ManagerItem extends UserItem {
  property: string;
}



const managers: ManagerItem[] = [
  {
    _id: 3,
    name: "Joseph M. Rohr",
    avatar: avatar4,
    position: "Property Manager",
    email: "joseph@example.com",
    phone: "+1 (345) 678-9012",
    property: "Sunset Apartments",
    profile_image:""
  },
  {
    _id: 4,
    name: "Mark K. Horne",
    avatar: avatar5,
    position: "Property Manager",
    email: "mark@example.com",
    phone: "+1 (456) 789-0123",
    property: "Lakeside Villas",
    profile_image:""

  },
  {
    _id: 5,
    name: "James M. Fonville",
    avatar: avatar6,
    position: "Property Manager",
    email: "james@example.com",
    phone: "+1 (567) 890-1234",
    property: "Downtown Lofts",
    profile_image:""

  },
  {
    _id: 6,
    name: "Jade M. Walker",
    avatar: avatar7,
    position: "Property Manager",
    email: "jade@example.com",
    phone: "+1 (678) 901-2345",
    property: "Green Valley Homes",
    profile_image:""

  },
  {
    _id: 7,
    name: "Marie E. Tate",
    avatar: avatar8,
    position: "Property Manager",
    email: "marie@example.com",
    phone: "+1 (789) 012-3456",
    property: "Hillside Apartments",
    profile_image:""

  },
];

export {  managers };