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

function forgotPassword(params: { name: string }) {
  const baseUrl = "/forget-password/";
  return api.create(`${baseUrl}`, params);
}

function getData(){
  const baseUrl = "/api/userdetails/";
  return api.get(`${baseUrl}`);
}

function activateUser(params: { token: string }) {
  const baseUrl = "/activate/";
  return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword, activateUser, getData };
