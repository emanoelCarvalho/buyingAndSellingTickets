// src/services/EventService.ts
import axios from "axios";

// URL base do JSON Server
const API_URL = "http://localhost:3000/events";

export default {
  // Busca todos os eventos
  async fetchEvents() {
    // Adiciona um timestamp à URL para evitar cache
    const timestamp = new Date().getTime();
    const response = await axios.get(`${API_URL}?_=${timestamp}`);
    return response.data;
  },

  // Cria um novo evento
  async createEvent(eventData: any) {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  },

  // Atualiza um evento existente
  async updateEvent(id: number, eventData: any) {
    const response = await axios.put(`${API_URL}/${id}`, eventData);
    return response.data;
  },

  // Exclui um evento
  async deleteEvent(id: number) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
