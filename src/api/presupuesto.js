import axios from "axios";

const API_URL = "http://localhost:4000/presupuestos";

// Obtener todos los presupuestos
export const getPresupuestos = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Crear un nuevo presupuesto
export const createPresupuesto = async (token, presupuestoData) => {
  const response = await axios.post(API_URL, presupuestoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Editar un presupuesto
export const updatePresupuesto = async (token, id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Eliminar un presupuesto
export const deletePresupuesto = async (token, id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

