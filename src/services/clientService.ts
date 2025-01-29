import api from './api';
import Client from '@/model/client';

const API_URL = "http://localhost:3000/clients";

export default {
  async fetchClients() {
    const timestamp = new Date().getTime();
    const response = await api.get(`${API_URL}?_=${timestamp}`);
    return response.data;
  },
  async addClient(clientData: any) {
    const response = await api.post(API_URL, clientData);
    return response.data;
  },
  async updateClient(id: number, clientData: any) {
    const response = await api.put(`${API_URL}/${id}`, clientData);
    return response.data;
  },
  async deleteClient(id: number) {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  },
  // Retorna os clientes de uma fila para um evento específico
  async getClientsInQueue(eventId: number): Promise<Client[]> {
    const response = await api.get(`${API_URL}?queueEventId=${eventId}`);
    return response.data;
  },
  // Remove um cliente da fila (finaliza sua compra ou sai da fila)
  async removeClientFromQueue(clientId: string): Promise<void> {
    await api.delete(`${API_URL}/${clientId}`);
  }
};
