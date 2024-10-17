import axios from 'axios';

const API_URL = '/api/maintenance';

export const getMaintenanceTasks = () => axios.get(API_URL);
export const addMaintenanceTask = (task: any) => axios.post(API_URL, task);
export const updateMaintenanceTask = (id: number, task: any) => axios.put(`${API_URL}/${id}`, task);
export const deleteMaintenanceTask = (id: number) => axios.delete(`${API_URL}/${id}`);

