// src/services/api.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Generic error handler
const handleError = (error) => {
  if (error.response) {
    
    console.error('API Error Response:', error.response.data);
    console.error('API Error Status:', error.response.status);
    console.error('API Error Headers:', error.response.headers);
    throw error.response.data;
  } else if (error.request) {
    
    console.error('API Error Request:', error.request);
    throw new Error('No response received from server.');
  } else {
    
    console.error('API Error Message:', error.message);
    throw new Error(`Error setting up request: ${error.message}`);
  }
};

export const auth = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export const patients = {
  create: async (patientData) => {
    try {
      const response = await api.post('/patients', patientData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getAll: async () => {
    try {
      const response = await api.get('/patients');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  update: async (id, patientData) => {
    try {
      const response = await api.put(`/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  remove: async (id) => {
    try {
      const response = await api.delete(`/patients/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export const vitals = {
  create: async (vitalsData) => {
    try {
      const response = await api.post('/vitals', vitalsData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getAll: async () => {
    try {
      const response = await api.get('/vitals');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByPatientId: async (patientId) => {
    try {
      const response = await api.get(`/vitals/patient/${patientId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  update: async (id, vitalsData) => {
    try {
      const response = await api.put(`/vitals/${id}`, vitalsData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  remove: async (id) => {
    try {
      const response = await api.delete(`/vitals/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export const assessments = {
  create: async (assessmentData) => {
    try {
      const response = await api.post('/assessments', assessmentData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getAll: async () => {
    try {
      const response = await api.get('/assessments');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByPatientId: async (patientId) => {
    try {
      const response = await api.get(`/assessments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  update: async (id, assessmentData) => {
    try {
      const response = await api.put(`/assessments/${id}`, assessmentData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  remove: async (id) => {
    try {
      const response = await api.delete(`/assessments/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};
