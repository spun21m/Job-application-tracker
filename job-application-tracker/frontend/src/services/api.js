import axios from "axios";

// const API_BASE_URL = "https://job-application-tracker-production-f049.up.railway.app/api/job-applications";
// const API_AUTH_URL =
//   "https://job-application-tracker-production-f049.up.railway.app/api/auth";

const API_BASE_URL = "http://localhost:8080/api/job-applications";
const API_AUTH_URL = "http://localhost:8080/api/auth";

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
