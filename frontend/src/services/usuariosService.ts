import axios from 'axios';

export interface Usuario {
  id: number;
  activo: boolean;
  nombre: string;
  email: string;
  contrasena: string;
  edad: number;
  presupuesto: number;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

// Obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get<Usuario[]>('/usuarios/get/all');
  return response.data;
};

// Agregar usuario
export const addUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const response = await api.post<Usuario>('/usuarios/add', usuario);
  return response.data;
};

// Eliminar usuario
export const deleteUsuario = async (id: number): Promise<void> => {
  await api.get(`/usuarios/delete/${id}`);
};
