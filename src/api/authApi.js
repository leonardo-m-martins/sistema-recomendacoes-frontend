import apiClient from './apiClient';

export const cadastrar = async (usuario) => {
  try {
    const response = await apiClient.post('/auth/cadastrar', usuario);
    return response.data;  // JSON retornado pelo backend
  } catch (error) {
    if (error.response) {
      // Erro do backend, pode ter mensagem específica
      throw error.response.data;
    }
    throw error;
  }
};

export const login = async (usuario) => {
  try {
    const response = await apiClient.post('/auth/login', usuario);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
