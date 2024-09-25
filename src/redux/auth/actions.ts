// constants
import { AuthActionTypes } from "./constants";

export interface AuthActionType {
  type:
    | AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.FORGOT_PASSWORD
    | AuthActionTypes.FORGOT_PASSWORD_CHANGE
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.LOGOUT_USER
    | AuthActionTypes.RESET
    | AuthActionTypes.ACTIVATE_USER
    | AuthActionTypes.SIGNUP_USER
    | AuthActionTypes.UPDATEUSER
    | AuthActionTypes.PUTDASHBOARD
    | AuthActionTypes.POSTPROPERTY
    | AuthActionTypes.GETPROPERTY
  payload: {} | string;
}

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
  __v:number
}

interface FormData {
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
  image: File | null;
}

export const userUpdate = (
  actionType: string,
  data: UserData | {}
): AuthActionType => ({
  type: AuthActionTypes.UPDATEUSER,
  payload: { actionType, data },
});

export const getDashboard =( 
  actionType: string,
 data: UserData | {}
): AuthActionType => ({
  type: AuthActionTypes.PUTDASHBOARD,
  payload:{actionType, data}
});

export const getPropertyApi =( 
  actionType: string,
 data: UserData | {}
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_SUCCESS,
  payload:{actionType, data}
});

// common success
export const authApiResponseSuccess = (
  actionType: string,
  data: UserData | {}
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const authApiResponseError = (
  actionType: string,
  error: string
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const loginUser = (
  email: string,
  password: string
): AuthActionType => ({
  type: AuthActionTypes.LOGIN_USER,
  payload: { email, password },
});

export const logoutUser = (): AuthActionType => ({
  type: AuthActionTypes.LOGOUT_USER,
  payload: {},
});

export const signupUser = (
  name: string,
  email: string,
  password: string
): AuthActionType => ({
  type: AuthActionTypes.SIGNUP_USER,
  payload: { name, email, password },
});

export const createNewProperty = (
  name: string,
  location: string,
  type: string,
  units: number,
  rentAmount?: number,
  leaseTerms?: string,
  description?: string,
  amenities?: string[],
  nearbyFacilities?: string[],
  managers?: { name: string, phone: string }[],
  acquisitionDate?: Date,
  image?: File | null,
): AuthActionType =>({
  type: AuthActionTypes.POSTPROPERTY,
  payload: { name, location, type,units,rentAmount,leaseTerms, description, amenities, nearbyFacilities, managers, acquisitionDate, image }
})

export const forgotPassword = (username: string): AuthActionType => ({
  type: AuthActionTypes.FORGOT_PASSWORD,
  payload: { username },
});

export const resetAuth = (): AuthActionType => ({
  type: AuthActionTypes.RESET,
  payload: {},
});

export const activateUser = (token: string): AuthActionType => ({
  type: AuthActionTypes.ACTIVATE_USER,
  payload: { token },
});


