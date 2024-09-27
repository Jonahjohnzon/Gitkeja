export enum AuthActionTypes {
  API_RESPONSE_SUCCESS = "@@auth/API_RESPONSE_SUCCESS",
  API_RESPONSE_ERROR = "@@auth/API_RESPONSE_ERROR",
  ACTIVATE_USER = "@@auth/ACTIVATE_USER",

  LOGIN_USER = "@@auth/LOGIN_USER",
  LOGOUT_USER = "@@auth/LOGOUT_USER",
  SIGNUP_USER = "@@auth/SIGNUP_USER",
  FORGOT_PASSWORD = "@@auth/FORGOT_PASSWORD",
  FORGOT_PASSWORD_CHANGE = "@@auth/FORGOT_PASSWORD_CHANGE",


  RESET = "@@auth/RESET",

  GETDATA = "@@auth/GETDATA",
  UPDATEUSER = "@@auth/UPDATEUSER",
  GETDASHBOARD = "@@auth/GETDASHBOARD",
  PUTDASHBOARD = "@@auth/PUTDASHBOARD",

  POSTPROPERTY = "@@auth/POSTPROPERTY",
  GETPROPERTY = "@@auth/GETPROPERTY",
  GETPROPERTYID = "@@auth/GETPROPERTYID",
  POSTTENANT = "@@auth/POSTTENANT",
  GETOCCUPANCY = "@@auth/GETOCCUPANCY"
}
