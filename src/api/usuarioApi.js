import apiClient from "./apiClient";

export const historico = (usuario_id) => apiClient.get(`/livro/${usuario_id}/historico`);