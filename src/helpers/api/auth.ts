import { APICore } from "./apiCore";

const api = new APICore();

// account
function login(params: { email: string; password: string }) {
  const baseUrl = "/api/login";
  return api.create(`${baseUrl}`, params);
}

function logout() {
  const baseUrl = "/logout/";
  return api.create(`${baseUrl}`, {});
}

function signup(params: { name: string; email: string; password: string }) {
  const baseUrl = "/api/signup/";
  return api.create(`${baseUrl}`, params);
}

function createproperty(params: { name: string; location: string; type: string, units: number, rentAmount: number, leaseTerms: string, description: string, amenities: string[], nearbyFacilities: string[], managers: { name: string; phone: string }[], acquisitionDate: Date, image: File | null}){
  const baseUrl = "/api/createProperty/";
  return api.create(`${baseUrl}`, params);
}

function createtenant(params: {    
  propertyId:string,
  name:string,
  email:string,
  phone:string,
  idPassportNumber:string,
  unit:string,
  leaseStartDate:Date,
  leaseEndDate:Date,
  rentAmount:number,
  securityDeposit:number,
  numberOfOccupants:number,
  pets:boolean}){
  const baseUrl = "/api/createTenant/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { name: string }) {
  const baseUrl = "/forget-password/";
  return api.create(`${baseUrl}`, params);
}

function getData(){
  const baseUrl = "/api/userdetails/";
  return api.get(`${baseUrl}`);
}

function getPropertyData(params:{ limit: string}){
  const baseUrl = "/api/getProperty/";
  return api.get(`${baseUrl}`, params);
}

function getPropertyDataId(params:{ propertyId: string}){
  const baseUrl = "/api/getPropertyById/";
  return api.get(`${baseUrl}`, params);
}


function getDash(){
  const baseUrl = "/api/getTotalProperty/";
  return api.get(`${baseUrl}`);
}

function activateUser(params: { token: string }) {
  const baseUrl = "/activate/";
  return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword, activateUser, getData , getDash,createproperty,getPropertyData,getPropertyDataId, createtenant};
