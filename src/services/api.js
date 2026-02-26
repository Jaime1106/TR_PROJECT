import axios from 'axios';

// IMPORTANTE: Usar la variable de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🌐 Conectando a backend:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Logging para debug
api.interceptors.request.use(request => {
  console.log('📤 Petición:', request.method, request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('📥 Respuesta:', response.data);
    return response;
  },
  error => {
    console.error('❌ Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;