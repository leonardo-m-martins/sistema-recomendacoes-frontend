import apiClient from "./apiClient";

export const getLivrosByAutor = async (autorId, params) => {
    const response = await apiClient.get(`/autor/livros/${autorId}`, { params });
    return response.data;
}

export const getAutor = async (autorId) => {
    const response = await apiClient.get(`/autor/${autorId}`);
    return response.data;
}