import apiClient from "./apiClient";

export const avaliar = async (body) => {
    const response = await apiClient.post('/avaliacao/', body);
    return response.data;
}

export const patchAvaliacao = async (id, body) => {
    const response = await apiClient.patch(`/avaliacao/${id}`, body);
    return response.data;
}

export const deleteAvaliacao = async (id) => {
    await apiClient.delete(`/avaliacao/${id}`);
}

export const getAvaliacaoByUsuarioAndLivro = async (params) => {
    const response = await apiClient.get('/avaliacao/livro-usuario', { params });
    if (response.status == 404) return null;
    return response.data;
}