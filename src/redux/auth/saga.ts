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
  createproperty as createproperty
} from '../../helpers/';

// actions
import { authApiResponseSuccess, authApiResponseError, userUpdate, getDashboard } from './actions';

// constants
import { AuthActionTypes } from './constants';

interface UserData {
  payload: {
    name?: string;
    password?: string;
    fullname?: string;
    email?: string;
    token?: string;
  };
  type: string;
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
  image?: File | null;};
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

function* signup({ payload: { name = '', email = '', password = '' } }: UserData): SagaIterator {
  try {
    if (!name || !email || !password) throw new Error('Fullname, email, and password are required');
    const response = yield call(() => signupApi({ name, email, password }));
    const user = response.data;
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error.message || 'Signup Failed'));
  }
}

function* createProperty({ payload: { name = '', location = '', type = '', units = 0, rentAmount = 0, leaseTerms = '', description = '', amenities = [], nearbyFacilities = [], managers = [] , acquisitionDate = new Date() , image = null  } }: FormData): SagaIterator {
  try {
    if (!name || !location || !type) throw new Error('Fullname, email, and password are required');
    yield put(authApiResponseSuccess(AuthActionTypes.POSTPROPERTY, {
      propertyLoading:true
  }));
    const response = yield call(() => createproperty({ name, location, type, units, rentAmount, leaseTerms, description, amenities, nearbyFacilities, managers, acquisitionDate, image}));
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
    fork(watchPostProperty)
  ]);
}

export default authSaga;
