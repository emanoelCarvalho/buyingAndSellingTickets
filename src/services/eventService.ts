import api from "./api";

// URL base do JSON Server
const API_URL = "http://localhost:3000/events";

export default {
  // Busca todos os eventos
  async fetchEvents() {
    // Adiciona um timestamp à URL para evitar cache
    const timestamp = new Date().getTime();
    const response = await api.get(`${API_URL}?_=${timestamp}`);
    return response.data;
  },

  // Cria um novo evento
  async createEvent(eventData: any) {
    const response = await api.post(API_URL, eventData);
    return response.data;
  },

  // Atualiza um evento existente
  async updateEvent(id: number, eventData: any) {
    const response = await api.put(`${API_URL}/${id}`, eventData);
    return response.data;
  },

  // Exclui um evento
  async deleteEvent(id: number) {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
