import api from "./api";

export default {
  // Função para obter todos os clientes
  getClients() {
    return api.get("/clients");
  },
  
  // Função para adicionar um novo cliente
  addClient(client) {
    return api.post("/clients", client);
  },

  // Função para excluir um cliente
  deleteClient(id) {
    return api.delete(`/clients/${id}`);
  }
};
