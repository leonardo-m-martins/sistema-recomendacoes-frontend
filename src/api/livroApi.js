import apiClient from "./apiClient";

export const getLivros = async (params) => {
    const response = await apiClient.get('/livro/', { params });
    return response.data;
}

export const getLivroById = async (id) => {
    const response = await apiClient.get(`/livro/${id}`);
    return response.data;
}

export const searchLivros = async (params) => {
    try {
        const response = await apiClient.get('/livro/search', { params });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw error;
    }
    
}