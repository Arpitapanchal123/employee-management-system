import axios from 'axios';

const API = axios.create({
  baseURL: 'https://employee-management-system-pfk3.onrender.com/api/employees'
});

export const getEmployees = (params) => API.get('/', { params });
export const getEmployeeById = (id) => API.get(`/${id}`);
export const createEmployee = (data) => API.post('/', data);
export const updateEmployee = (id, data) => API.put(`/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/${id}`);