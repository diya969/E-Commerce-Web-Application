import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every outgoing request, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, clear session and send the user to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---- Auth ----
export const loginRequest = (credentials) => api.post("/auth/login", credentials);
export const registerRequest = (userData) => api.post("/auth/register", userData);

// ---- Products ----
export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);

// ---- Orders ----
export const createOrder = (orderData) => api.post("/orders", orderData);
export const getMyOrders = () => api.get("/orders/my");

// Profile
export const getProfile = () => api.get("/user/profile");
export const updateProfile = (data) => api.put("/user/profile", data);

export default api;
