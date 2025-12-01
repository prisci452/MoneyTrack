import { API_BASE } from "./api";

export async function obtenerUsuarios() {
  try {
    const response = await fetch(`${API_BASE}/usuarios/get/all`);
    return await response.json();
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    throw err;
  }
}

export async function crearUsuario(usuario) {
  try {
    const response = await fetch(`${API_BASE}/usuarios/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return await response.json();
  } catch (err) {
    console.error("Error al crear usuario:", err);
    throw err;
  }
}

export async function actualizarUsuario(usuario) {
  try {
    const response = await fetch(`${API_BASE}/usuarios/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return await response.json();
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    throw err;
  }
}

export async function eliminarUsuario(id) {
  try {
    const response = await fetch(`${API_BASE}/usuarios/delete/${id}`);
    return await response.json();
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    throw err;
  }
}