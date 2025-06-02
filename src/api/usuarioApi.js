import apiClient from "./apiClient";

export const historico = async (usuario_id) => {
    const response = await apiClient.get(`/usuario/${usuario_id}/historico`);
    return response.data;
}