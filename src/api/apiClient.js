// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base da sua API
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador de requisições (opcional, ex: incluir token JWT)
apiClient.interceptors.request.use(config => {
  if (config.url.includes('/auth/')) return config;
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('token');
      window.location.href = '/login'; // redireciona para login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
