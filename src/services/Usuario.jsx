import axios from 'axios';

const API_URL = 'http://localhost:8080/usuario'; // ajuste a porta se necessário

export const cadastrarUsuario = async (usuario) => {
  return await axios.post(`${API_URL}/salvar`, usuario);
};

export const loginUsuario = async (usuario) => {
  return await axios.post(`${API_URL}/login`, usuario);
};
