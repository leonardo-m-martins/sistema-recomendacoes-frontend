import apiClient from "./apiClient";

export const getHistorico = async (usuario_id, params) => {
    const response = await apiClient.get(`/usuario/${usuario_id}/historico`, {params});
    return response.data;
}