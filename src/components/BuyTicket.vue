<template>
  <v-container class="pa-5">
    <!-- Título -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-center">Compra de Ingresso</h1>
      </v-col>
    </v-row>

    <!-- Seleção de Evento -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-select
          v-model="selectedEvent"
          :items="events"
          item-title="name"
          item-value="id"
          label="Escolha o Evento"
          outlined
          dense
          return-object
          class="mb-2"
        ></v-select>
        <p v-if="events.length === 0" class="text-red">Nenhum evento disponível.</p>
      </v-col>
    </v-row>

    <!-- Detalhes do Evento -->
    <v-row v-if="selectedEvent" class="mb-4">
      <v-col cols="12">
        <v-divider></v-divider>
        <h2 class="mt-2">{{ selectedEvent.name || "Evento não informado" }}</h2>
        <p><strong>Data:</strong> {{ selectedEvent.date ? formatDate(selectedEvent.date) : "Data não disponível" }}</p>
        <p><strong>Capacidade:</strong> {{ selectedEvent.capacity ? `${selectedEvent.capacity} pessoas` : "Capacidade não informada" }}</p>
      </v-col>
    </v-row>

    <!-- Seleção de Cliente -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-select
          v-model="selectedClient"
          :items="clients"
          item-title="name"
          item-value="id"
          label="Cliente"
          outlined
          dense
          return-object
          class="mb-2"
        ></v-select>
        <p v-if="clients.length === 0" class="text-red">Nenhum cliente cadastrado.</p>
      </v-col>
    </v-row>

    <!-- Seleção de Assento -->
    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <v-select
          v-model="seat"
          :items="seats"
          label="Selecione seu assento"
          outlined
          dense
          class="mb-2"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Botão para Comprar Ingresso -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn color="primary" @click="buyTicket" class="w-100">Comprar Ingresso</v-btn>
      </v-col>
    </v-row>

    <!-- Confirmação de Compra -->
    <v-row v-if="ticket" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Ingresso Confirmado</v-card-title>
          <v-card-text>
            <p><strong>Cliente:</strong> {{ ticket.clientName }}</p>
            <p><strong>Evento:</strong> {{ ticket.eventName }}</p>
            <p><strong>Assento:</strong> {{ ticket.seat }}</p>
            <p><strong>VIP:</strong> {{ ticket.isVip ? "Sim" : "Não" }}</p>
            <v-btn color="success" @click="downloadPDF" class="mt-2">Baixar Comprovante</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import jsPDF from "jspdf";

const API_URL = "http://localhost:3000";

export default defineComponent({
  data() {
    return {
      events: [] as any[],
      clients: [] as any[],
      selectedEvent: null as any | null,
      selectedClient: null as any | null,
      seat: "",
      ticket: null as any | null,
      seats: ["A1", "A2", "B1", "B2", "C1", "C2"],
    };
  },
  async mounted() {
    await this.loadEvents();
    await this.loadClients();
    this.restoreFromLocalStorage();
  },
  methods: {
    async loadEvents() {
      try {
        const response = await axios.get(`${API_URL}/events`);
        this.events = response.data || [];
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        alert("Falha ao carregar a lista de eventos.");
      }
    },
    async loadClients() {
      try {
        const response = await axios.get(`${API_URL}/clients`);
        this.clients = response.data || [];
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        alert("Falha ao carregar a lista de clientes.");
      }
    },
    restoreFromLocalStorage() {
      const storedCpf = localStorage.getItem("cpf");
      const storedEventId = localStorage.getItem("eventId");
      const storedEventName = localStorage.getItem("eventName");
      const storedEventDate = localStorage.getItem("eventDate");
      const storedEventCapacity = localStorage.getItem("eventCapacity");

      if (storedCpf && this.clients.length > 0) {
        this.selectedClient = this.clients.find(client => client.cpf === storedCpf) || null;
      }

      if (storedEventId && this.events.length > 0) {
        this.selectedEvent = this.events.find(event => event.id === Number(storedEventId)) || null;

        if (!this.selectedEvent && storedEventName && storedEventDate && storedEventCapacity) {
          this.selectedEvent = {
            id: Number(storedEventId),
            name: storedEventName,
            date: new Date(storedEventDate),
            capacity: Number(storedEventCapacity),
          };
        }
      }
    },
    formatDate(dateString: string) {
      if (!dateString) return "Data indisponível";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return "Data inválida";
        }
        return date.toLocaleDateString("pt-BR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      } catch {
        return "Data inválida";
      }
    },
    async buyTicket() {
      if (!this.selectedEvent || !this.selectedClient || !this.seat) {
        alert("Preencha todos os campos para comprar o ingresso!");
        return;
      }

      const newTicket = {
        id: crypto.randomUUID(),
        clientId: this.selectedClient.id,
        clientName: this.selectedClient.name,
        eventId: this.selectedEvent.id,
        eventName: this.selectedEvent.name,
        seat: this.seat,
        isVip: this.selectedClient.hasConvenio || false,
      };

      this.ticket = newTicket;

      try {
        await axios.post(`${API_URL}/tickets`, newTicket);
        alert("Ingresso comprado com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar ingresso:", error);
        alert("Houve um erro ao processar a compra.");
      }
    },
    downloadPDF() {
      if (!this.ticket) return;

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Comprovante de Compra", 20, 20);
      doc.setFontSize(12);
      doc.text(`Cliente: ${this.ticket.clientName}`, 20, 40);
      doc.text(`Evento: ${this.ticket.eventName}`, 20, 50);
      doc.text(`Assento: ${this.ticket.seat}`, 20, 60);
      doc.text(`VIP: ${this.ticket.isVip ? "Sim" : "Não"}`, 20, 70);
      doc.save(`Ingresso_${this.ticket.clientName}.pdf`);
    },
  },
});
</script>

<style scoped>
.v-container {
  background-color: #f7f7f7;
  border-radius: 8px;
}

h1 {
  font-family: 'Roboto', sans-serif;
  color: #1e88e5;
}

v-select {
  background-color: #ffffff;
}

.v-btn {
  font-weight: bold;
  text-transform: none;
  border-radius: 8px;
}

v-card {
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

v-card-title {
  background-color: #1e88e5;
  color: white;
  padding: 16px;
}

v-divider {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
