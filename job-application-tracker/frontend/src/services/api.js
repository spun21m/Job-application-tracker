import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080";

const API_BASE_URL = `${API_URL}/api/job-applications`;
const API_AUTH_URL = `${API_URL}/api/auth`;


export const getAllApplications = (userId) =>
  axios.get(`${API_BASE_URL}?userId=${userId}`);

export const getApplicationById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const addApplication = (application) => {
  return axios.post(`${API_BASE_URL}`, application);
};

export const updateApplication = (id, updatedData) => {
  return axios.put(`${API_BASE_URL}/${id}`, updatedData);
};

export const deleteApplication = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_AUTH_URL}/login`, credentials);
};

export const registerUser = (userData) => {
  return axios.post(`${API_AUTH_URL}/signup`, userData);
};
