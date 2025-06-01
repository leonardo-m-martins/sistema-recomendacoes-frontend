import apiClient from './apiClient';

export const recomendacaoConteudo = async (usuario_id) => {
  try {
    const response = await apiClient.get(`/recomendacao/conteudo/${usuario_id}`);
    return response.data;  // JSON retornado pelo backend
  } catch (error) {
    if (error.response) {
      // Erro do backend, pode ter mensagem específica
      throw error.response.data;
    }
    throw error;
  }
};

export const recomendacaoColaborativa = async (usuario_id) => {
  try {
    const response = await apiClient.get(`/recomendacao/colaborativa/${usuario_id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const livrosEmAlta = async () => {
  try {
    const response = await apiClient.post(`/recomendacao/em-alta`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
}