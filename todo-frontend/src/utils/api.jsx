import axios from "axios";

const USER_ID = "123";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};
  config.headers["x-user-id"] = USER_ID;
  return config;
});

export const getTodos = (search = "") => api.get(`/todos?search=${search}`);

export const createTodo = (title) => api.post("/todos", { title });

export const updateTodo = (id, title) => api.put(`/todos/${id}`, { title });

export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export const toggleTodo = (id) => api.patch(`/todos/${id}`);
