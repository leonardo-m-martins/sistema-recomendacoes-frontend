import apiClient from "./apiClient";

export const getGeneroLivros = async (generoId, params) => {
    const response = await apiClient.get(`/genero/livros/${generoId}`, { params });
    return response.data;
}

export const getGenero = async (generoId) => {
    const response = await apiClient.get(`/genero/${generoId}`);
    return response.data;
}