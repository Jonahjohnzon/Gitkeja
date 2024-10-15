import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore';

// helpers
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  forgotPassword as forgotPasswordApi,
  activateUser as activateUserApi,
  getData as getDataApi,
  getDash as getDashApi,
  createproperty,
  getPropertyData,
  createtenant,
  getOccupancy,
  getReport
} from '../../helpers/';

// actions
import { authApiResponseSuccess, authApiResponseError, userUpdate, getDashboard, getPropertyApi, getPropertyApiId,getOccupancyApi, getOccupancyApiReport } from './actions';

// constants
import { AuthActionTypes } from './constants';

interface GetProperty {
  type: AuthActionTypes.GETPROPERTY;
  payload:{
  limit? :string
  };
}

interface GetPropertyId {
  type: AuthActionTypes.GETPROPERTY;
  payload:{
    propertyId? :string
  };
}
interface UserData {
  payload: {
    name?: string;
    password?: string;
    fullname?: string;
    email?: string;
    token?: string;
    role?:string;
  };
  type: string;
}

interface TenantForm{
  payload:{
    propertyId:string,
    name:string,
    email:string,
    phone:string,
    idPassportNumber:string,
    unit:string,
    leaseStartDate:string,
    leaseEndDate:string,
    rentAmount:number,
    securityDeposit:number,
    numberOfOccupants:number,
    pets:boolean
  };
  type:string;
}
interface FormData {
  payload: {
  name: string;
  location: string;
  type: string;
  units: number;
  rentAmount?: number;
  leaseTerms?: string;
  description?: string;
  amenities?: string[];
  nearbyFacilities?: string[];
  managers?: { name: string; phone: string }[];
  acquisitionDate?: Date;
  image?: File | null;
  garbageFee: number;
  utilities: { name: string; cost: number }[];
  estimatedPropertyValue:number;
};
  type: string;

}
const api = new APICore();

function* login({ payload: { email = '', password = '' } }: UserData): SagaIterator {
  try {
    
    if (!email || !password) throw new Error('Email and password are required');
    const response = yield call(() => loginApi({ email, password }));
    const user = response?.data;
    if(user['result'])
    {
      api.setLoggedInUser(user);
      setAuthorization(user['token']);
      yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    }
    else{
      yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, user['message']));
      api.setLoggedInUser(null);
      setAuthorization(null);
    }
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error.message || 'Login Failed'));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

function* logout(): SagaIterator {
  try {
    yield call(logoutApi);
    api.setLoggedInUser(null);
    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error.message || 'Logout Failed'));
  }
}

function* signup({ payload: { name = '', email = '', password = '', role='' } }: UserData): SagaIterator {
  try {
    if (!name || !email || !password) throw new Error('Fullname, email, and password are required');
    const response = yield call(() => signupApi({ name, email, password, role }));
    const user = response.data;
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error.message || 'Signup Failed'));
  }
}

function* createProperty({ payload: { name = '', location = '', type = '', units = 0, rentAmount = 0, leaseTerms = '', description = '', amenities = [], nearbyFacilities = [], managers = [] , acquisitionDate = new Date() , image = null, garbageFee = 0, utilities = [],  estimatedPropertyValue = 0  } }: FormData): SagaIterator {
  try {
    if (!name || !location || !type) throw new Error('Fullname, email, and password are required');
    yield put(authApiResponseSuccess(AuthActionTypes.POSTPROPERTY, {
      propertyLoading:true
  }));
    const response = yield call(() => createproperty({ name, location, type, units, rentAmount, leaseTerms, description, amenities, nearbyFacilities, managers, acquisitionDate, image, garbageFee, utilities, estimatedPropertyValue}));
    const data = response.data;
    yield put(authApiResponseSuccess(AuthActionTypes.POSTPROPERTY, {
      topMessage:"Property Creation Successful",
      topDisplay:true,
      propertyLoading:false,
      topColor:"primary"}));
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: makes the scrolling smooth
    });
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.POSTPROPERTY, 'Creation Failed'));
  }
}

function* createTenant({ payload: { name = '', propertyId = '', email = '', unit = "", rentAmount = 0, leaseStartDate = "", phone = '', leaseEndDate = "", securityDeposit=0, numberOfOccupants=0, pets=false, idPassportNumber=""  } }: TenantForm): SagaIterator {
  try {
    if (!name || !propertyId || !email) throw new Error('Fullname, email, and password are required');
    yield put(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
      tenantLoading:true,
   }));

    const response = yield call(() => createtenant({ name, propertyId, email, unit, rentAmount, leaseStartDate, leaseEndDate, phone, securityDeposit, numberOfOccupants, pets, idPassportNumber}));
    const data = response.data;
    yield put(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
      tenantLoading:false,
      topColor: data.result ? "primary": "danger",
      topMessage:data.message,
      topDisplay:true,
  }));
    window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: makes the scrolling smooth
    });
  } catch (error: any) {
    yield put(authApiResponseSuccess(AuthActionTypes.POSTTENANT, {
      tenantLoading:false,
      topColor:  "danger",
      topMessage:"Error creating tenants",
      topDisplay:true,
  }));
  }
}

function* forgotPassword({ payload: { name = '' } }: UserData): SagaIterator {
  try {
    if (!name) throw new Error('Username is required');
    const response = yield call(() => forgotPasswordApi({ name }));
    yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error.message || 'Password Reset Failed'));
  }
}

function* getData ():SagaIterator{
try{
  const response = yield call(()=> getDataApi() )
  const user = response.data
  yield put(userUpdate(AuthActionTypes.UPDATEUSER, user['userDetails']))
}
catch(error:any)
{
  console.log(error)
}
}

function* getOccupancyData ():SagaIterator{
  try{
    const response = yield call(()=> getOccupancy() )
    const data = response.data
    const body = {
      OccupancyReport : data['data'],
      OccupancyLoad:false
    }
    yield put(getOccupancyApi(AuthActionTypes.GETOCCUPANCY, body))
  }
  catch(error:any)
  {
    console.log(error)
  }
  }

  function* getOccupancyReport ():SagaIterator{
    try{
      const response = yield call(()=> getReport() )
      const data = response.data
    yield put(getOccupancyApiReport(AuthActionTypes.GETOCCREPORT, data['data']))
    }
    catch(error:any)
    {
      console.log(error)
    }
    }

function* getPropertydata (action: GetProperty):SagaIterator{
  try{
    yield put(getPropertyApi(AuthActionTypes.GETPROPERTY, {
      tenantlist:false,
      propertiesList:[]
    }))
    const { payload: { limit = '' } } = action;
    const response = yield call(()=> getPropertyData({limit}) )
    const data = response.data

    const body ={
      tenantlist:true,
      propertiesList:data['data']
    }
    yield put(getPropertyApi(AuthActionTypes.GETPROPERTY, body))
  }
  catch(error:any)
  {
    console.log(error)
  }
  }



function* getdashboard ():SagaIterator{
  try{
    const response = yield call(()=> getDashApi() )
    const data = response.data
    yield put(getDashboard(AuthActionTypes.PUTDASHBOARD, data['data']))
  }
  catch(error:any)
  {
    console.log(error)
  }
  }


  function* getTenantList ():SagaIterator{
    try{
      const response = yield call(()=> getReport() )
      const data = response.data
      yield put(getOccupancyApiReport(AuthActionTypes.GETTENANTLIST, data['data']))
    }
    catch(error:any)
    {
      console.log(error)
    }
    }

function* activateUser({ payload: { token = '' } }: UserData): SagaIterator {
  try {
    if (!token) throw new Error('Activation token is required');
    const response = yield call(() => activateUserApi({ token }));
    yield put(authApiResponseSuccess(AuthActionTypes.ACTIVATE_USER, response.data));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.ACTIVATE_USER, error.message || 'Account Activation Failed'));
  }
}

// Watcher functions
export function* watchLoginUser(): SagaIterator {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout(): SagaIterator {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): SagaIterator {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): SagaIterator {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchActivateUser(): SagaIterator {
  yield takeEvery(AuthActionTypes.ACTIVATE_USER, activateUser);
}

export function* watchGetData(): SagaIterator{
  yield takeEvery(AuthActionTypes.GETDATA, getData)
}

export function* watchGetDash(): SagaIterator{
  yield takeEvery(AuthActionTypes.GETDASHBOARD, getdashboard)
}

export function* watchPostProperty(): SagaIterator{
  yield takeEvery(AuthActionTypes.POSTPROPERTY, createProperty)
}

export function* watchPropertyData(): SagaIterator{
  yield takeEvery(AuthActionTypes.GETPROPERTY , getPropertydata)
}


export function* watchTenant(): SagaIterator{
  yield takeEvery(AuthActionTypes.POSTTENANT , createTenant)
}

export function* watchgetOccupancy(): SagaIterator{
  yield takeEvery(AuthActionTypes.GETOCCUPANCY , getOccupancyData)
}
export function* watchgetOccupancyReport(): SagaIterator{
  yield takeEvery(AuthActionTypes.GETOCCREPORT , getOccupancyReport)
}

export function* watchgetTenantList(): SagaIterator{
  yield takeEvery(AuthActionTypes.GETTENANTLIST , getTenantList)
}

// Root saga
function* authSaga(): SagaIterator {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchForgotPassword),
    fork(watchActivateUser),
    fork(watchGetData),
    fork(watchGetDash),
    fork(watchPostProperty),
    fork(watchPropertyData),
    fork(watchTenant),
    fork( watchgetOccupancy),
    fork(watchgetOccupancyReport),
    fork(watchgetTenantList)
  ]);
}

export default authSaga;
