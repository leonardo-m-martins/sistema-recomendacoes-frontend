import apiClient from "./apiClient";

export const avaliar = async (body) => {
    const response = await apiClient.post('/avaliacao/', body);
    return response.data;
}

export const getAvaliacaoByUsuarioAndLivro = async (params) => {
    const response = await apiClient.get('/avaliacao/livro-usuario', { params });
    if (response.status == 404) return null;
    return response.data;
}