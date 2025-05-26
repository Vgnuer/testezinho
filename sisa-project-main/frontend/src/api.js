import axios from "axios";

const API = axios.create({
  baseURL: 'https://testezinho-sm9u.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  console.log("Enviando requisição:", {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data,
  });
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error("Erro ao configurar requisição:", error);
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => {
    console.log("Resposta recebida:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default API;
