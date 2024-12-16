import axios from "axios";

const API_URL = "https://api-presupuestos-6dce377b170c.herokuapp.com/usuarios";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};
