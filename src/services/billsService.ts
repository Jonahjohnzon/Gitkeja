// src/services/billsService.ts

import { APICore } from "../helpers/api/apiCore";
const API_URL = '/api/bills';
const api = new APICore()

export const getBills = () => api.get('/api/getBills');
export const addBill = (bill: any) => api.create('/api/createBU', bill);
export const updateBill = (_id: string, bill: any) => api.update(`${API_URL}/${_id}`, bill);
export const deleteBill = (_id: string) => api.delete(`/api/billDelete?id=${_id}`);