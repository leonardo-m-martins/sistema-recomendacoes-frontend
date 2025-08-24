import apiClient from './apiClient';

export const cadastrar = async (usuario) => {
  const response = await apiClient.post('/auth/cadastrar', usuario);
  if (response.status == 401) return null;
  return response.data;
};

export const login = async (usuario) => {
  const response = await apiClient.post('/auth/login', usuario);
  if (response.status != 200) return null;
  return response.data;
};

export const guestLogin = async () => {
  try {
    const response = await apiClient.post('/auth/guest');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
}
