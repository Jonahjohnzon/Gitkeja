// src/services/billsService.ts

import axios from 'axios';

const API_URL = '/api/bills';

export const getBills = () => axios.get(API_URL);
export const addBill = (bill: any) => axios.post(API_URL, bill);
export const updateBill = (id: number, bill: any) => axios.put(`${API_URL}/${id}`, bill);
export const deleteBill = (id: number) => axios.delete(`${API_URL}/${id}`);