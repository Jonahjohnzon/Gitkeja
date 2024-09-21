import { Reducer } from 'redux';
import { AuthActionTypes } from "./constants";
import { APICore } from "../../helpers/api/apiCore";

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
  __v:number
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
  mainload:boolean
}

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
  mainload:true
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
    default:
      return { ...state };
  }

    case AuthActionTypes.UPDATEUSER:
      return {...state, user:action.payload.data as UserData, mainload:false}

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