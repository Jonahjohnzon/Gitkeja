import { Reducer } from 'redux';
import { AuthActionTypes } from "./constants";
import { APICore } from "../../helpers/api/apiCore";
import { PropertyType,PropertyGetId } from './propertyReducer';
import { OccupancyReportsType } from '../../pages/apps/CRM/Occupancy/types';
import { TenantDetailsManagement } from '../../pages/apps/CRM/Tenants/data';

const api = new APICore();

// Define more specific types for better type checking
interface UserData {
  _id: string;
  name: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
  email:string;
  notification: any;
  createdAt:string;
  verified:boolean;
  updatedAt:string;
  __v:number;
  data:any
}

export interface OccupancyReportType {
  totalProperties:number,
  totalunits:number,
  totalOccupancy:number,
  averageOccupancyRate:number,
  totalRentCollected:number,
  occupancyRatesMonthly:number[]

}

export interface OccupancyReportTypes {
  totalProperties:number,
  totalunits:number,
  totalOccupancy:number,
  averageOccupancyRate:number,
  totalRentCollected:number,
  occupancyRatesMonthly:number[]

}

interface Tenant {
  id: number;
  avatar: string;
  name: string;
  unitNumber: string;
  rentAmount: number;
  paymentStatus: any;
  tenancyStartDate: string;
}

interface Transaction {
  id: number;
  transactionType: string;
  property: string;
  amount: number;
  date: string;
  status: string;
}

interface Maintenance{
  pending: number,
  inProgress: number,
  completed: number,
  averageResolutionTime: number
}

interface LeaseExpiryData {
  x: string;  // Represents the label (e.g., 'Next 30 days', '31-60 days', etc.)
  y: number;  // Represents the corresponding value (e.g., the count of expiring leases)
}

interface dashboard {
  totalRentCollected?:number,
  occupancyRate?:number,
  maintenanceRequests?:number,
  propertyValue?:number,
  monthlyRentCollection?:number,
  totalRentCollectable?:number,
  latePayment?:number,
  rentalIncome?:number[],
  occupancyRates?:number[],
  toptenant?:Tenant[],
  recentTransactions?:Transaction[],
  MaintenanceOverview?:Maintenance,
  leaseExpiryData?:LeaseExpiryData[]
}


const PropertyList:PropertyType[] =[]

export const Propertybyid:PropertyGetId = {
  _id: 1,
  name: "",
  location: "",
  type: "",
  units: 0,
  rentAmount: 0, // Per unit in Kenyan Shillings
  leaseTerms: "",
  description: "",
  amenities: [],
  nearbyFacilities: [],
  managers: [],
  acquisitionDate: new Date(),
  image: "",
  occupancyUnits: 0,
  maintenanceRequests:0,
  tenantSatisfaction: 0,
  occupancy:0,
  monthlyRevenue:0,
  garbageFee: 0,
  utilities: []
}

const Dashboard:dashboard = {
  totalRentCollectable:0,
  occupancyRate:0,
  maintenanceRequests:0,
  propertyValue:0,
  monthlyRentCollection:0,
  totalRentCollected:0,
  latePayment:0,
  rentalIncome:[0,0,0,0,0,0,0,0,0,0,0,0],
  occupancyRates:[0,0,0,0,0,0,0,0,0,0,0,0],
  toptenant:[],
  recentTransactions:[],
  MaintenanceOverview:{
    pending: 0,
    inProgress: 0,
    completed: 0,
    averageResolutionTime: 0.0 
  },
  leaseExpiryData:[
    { x: 'Next 30 days', y: 0 },
    { x: '31-60 days', y: 0 },
    { x: '61-90 days', y: 0 },
    { x: 'Beyond 90 days', y: 0 }
  ]
  
}
interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  userLoggedIn: boolean;
  userSignUp: boolean;
  userLogout: boolean;
  passwordReset: boolean;
  passwordChange: boolean;
  resetPasswordSuccess: boolean | null;
  activationSuccess: boolean | null;
  mainload:boolean,
  dashboard?:dashboard,
  topMessage:string,
  topDisplay:boolean,
  topColor:string,
  propertyLoading:boolean,
  propertiesList:PropertyType[]
  tenantlist:boolean,
  tenantLoading:boolean,
  OccupancyReport:OccupancyReportType ,
  OccupancyLoad:boolean,
  OccupancyReports:OccupancyReportsType[],
  tenantManagement:TenantDetailsManagement[],
}  


const OccupancyReportState:OccupancyReportType = {
    totalOccupancy:0,
    totalunits:0,
    totalProperties:0,
    averageOccupancyRate:0,
    totalRentCollected:0,
    occupancyRatesMonthly:[0,0,0,0,0,0,0,0,0,0,0,0]
}

const OccuReport:OccupancyReportsType[] = []

const INIT_STATE: AuthState = {
  user: api.getLoggedInUser(),
  loading: false,
  error: null,
  userLoggedIn: false,
  userSignUp: false,
  userLogout: false,
  passwordReset: false,
  passwordChange: false,
  resetPasswordSuccess: null,
  activationSuccess: null,
  mainload:true,
  dashboard:Dashboard,
  topMessage:"",
  topDisplay:false,
  topColor:"primary",
  propertyLoading:false,
  propertiesList:PropertyList,
  tenantlist:false,
  tenantLoading:false,
  OccupancyReport:OccupancyReportState ,
  OccupancyLoad:true,
  OccupancyReports : OccuReport,
  tenantManagement:[],
};

interface AuthActionType {
  type: AuthActionTypes;
  payload: {
    actionType?: string;
    data?: UserData | {};
    error?: string;
  };
}

const Auth: Reducer<AuthState, AuthActionType> = (state = INIT_STATE, action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthActionTypes.LOGIN_USER:
          return {
            ...state,
            user: action.payload.data as UserData,
            userLoggedIn: true,
            loading: false,
          };
        case AuthActionTypes.SIGNUP_USER:
          return {
            ...state,
            loading: false,
            userSignUp: true,
          };
        case AuthActionTypes.LOGOUT_USER:
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        case AuthActionTypes.FORGOT_PASSWORD:
          return {
            ...state,
            resetPasswordSuccess: true,
            loading: false,
            passwordReset: true,
          };
        case AuthActionTypes.ACTIVATE_USER:
          return {
            ...state,
            activationSuccess: true,
            loading: false,
          };
        case AuthActionTypes.POSTPROPERTY:
          return {
            ...state,
           ...action.payload.data
          };
        case AuthActionTypes.POSTTENANT:
          return {
            ...state,
           ...action.payload.data
          };
        case AuthActionTypes.GETPROPERTY:
          return {
            ...state,
           ...action.payload.data as PropertyType[] }
        case AuthActionTypes.GETOCCREPORT:
          return {
            ...state,
            OccupancyReports:action.payload.data as OccupancyReportsType[]
          }

        case AuthActionTypes.GETOCCUPANCY:
          return {
            ...state,
            ...action.payload.data as OccupancyReportType
            
          }
        case AuthActionTypes.GETTENANTLIST:
          return  {
            ...state,
            tenantManagement:action.payload.data as TenantDetailsManagement[]
          }
        default:
          return { ...state };
      }
case AuthActionTypes.API_RESPONSE_ERROR:
  switch (action.payload.actionType) {
    case AuthActionTypes.LOGIN_USER:
      return {
        ...state,
        error: action.payload.error ?? null,
        userLoggedIn: false,
        loading: false,
      };
    case AuthActionTypes.SIGNUP_USER:
      return {
        ...state,
        error: action.payload.error ?? null,
        userSignUp: false,
        loading: false,
      }; 
    case AuthActionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        error: action.payload.error ?? null,
        loading: false,
        passwordReset: false,
      };
    case AuthActionTypes.ACTIVATE_USER:
      return {
        ...state,
        error: action.payload.error ?? null,
        activationSuccess: false,
        loading: false,
      };
    case AuthActionTypes.POSTPROPERTY:
      return {
          ...state,
          topMessage:"Property Creation Failed",
          topDisplay:true,
          topColor:"danger"
        };
    default:
      return { ...state };
  }

    case AuthActionTypes.UPDATEUSER:
      return {...state, user:action.payload.data as UserData, mainload:false}
    case AuthActionTypes.PUTDASHBOARD:
      return {...state, dashboard:{
        ...state.dashboard,
        ...action.payload.data as dashboard}}
    case AuthActionTypes.LOGIN_USER:
      return { ...state, loading: true, userLoggedIn: false };
    case AuthActionTypes.LOGOUT_USER:
      return { ...state, loading: true, userLogout: false };
    case AuthActionTypes.SIGNUP_USER:
      return { ...state, loading: true, userSignUp: false };
    case AuthActionTypes.FORGOT_PASSWORD:
      return { ...state, loading: true, passwordReset: false };
    case AuthActionTypes.ACTIVATE_USER:
      return { ...state, loading: true, activationSuccess: null };
    case AuthActionTypes.RESET:
      return {
        ...state,
        loading: false,
        error: null,
        userSignUp: false,
        userLoggedIn: false,
        passwordReset: false,
        passwordChange: false,
        resetPasswordSuccess: null,
        activationSuccess: null,
      };
    default:
      return { ...state };
  }
};

export default Auth;