import axios from 'axios'

const API_BASE_URL = "https://job-application-tracker-production-f049.up.railway.app/api/job-applications";

export const getAllApplications = () => {
    
    return axios.get(`${API_BASE_URL}`)
    
}

export const getApplicationById = (id) => {
    return axios.get(`${API_BASE_URL}/${id}`)
}

export const addApplication = (application) => {
    return axios.post(`${API_BASE_URL}`, application)
}

export const updateApplication = (id, updatedData) => {
    return axios.put(`${API_BASE_URL}/${id}`, updatedData)
}

export const deleteApplication = (id) => {
    return axios.delete(`${API_BASE_URL}/${id}`)
}