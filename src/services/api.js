import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ajusta si tu backend corre en otro puerto

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;