import axios from 'axios';

// ⚠️ Si pruebas en un dispositivo físico, reemplaza localhost por la IP de tu PC
// Por ejemplo: 'http://192.168.1.10:3000/api'
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000, // opcional
});

// ------------------------
// USERS
// ------------------------
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ------------------------
// CATEGORIES
// ------------------------
export const getCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const createCategory = (category) => api.post('/categories', category);
export const updateCategory = (id, category) => api.put(`/categories/${id}`, category);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// ------------------------
// EXPENSES
// ------------------------
export const getExpenses = () => api.get('/expenses');
export const getExpenseById = (id) => api.get(`/expenses/${id}`);
export const createExpense = (expense) => api.post('/expenses', expense);
export const updateExpense = (id, expense) => api.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

// Export axios instance por si quieres usar interceptors u otras configuraciones
export default api;
