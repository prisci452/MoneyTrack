// src/services/userService.js (CORREGIDO)
import API from "./api.js";

export const registerUser = async (userData) => {
  // Esta ruta POST /api/users ya está lista para llamar a userController.registerUser
  return await API.post("/users", userData);
};

export const loginUser = async (email, password) => {
  try {
    // ⭐ AJUSTE CLAVE: La ruta del backend ahora es /users/login
    const response = await API.post("/users/login", { email, password }); 
    
    // Si el backend es exitoso (200 OK), devuelve { user: ... }
    return response.data; 
    
  } catch (error) {
    // Captura el error (ej: 401 Unauthorized) y lo propaga a LoginPage.vue
    throw error; 
  }
};