import api from './api';  // Importe a configuração do axios

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
  }
};
