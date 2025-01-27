<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12">
        <h1>Compra de Ingresso</h1>
        <v-select v-model="selectedEvent" :items="eventNames" item-text="name" item-value="id" label="Escolha o Evento"
          outlined dense></v-select>
      </v-col>
    </v-row>

    <v-row v-if="selectedEvent" class="mb-4">
      <v-col cols="12">
        <h2>{{ selectedEvent.name }}</h2>
        <p><strong>Data:</strong> {{ selectedEvent.date }}</p>
        <p><strong>Capacidade:</strong> {{ selectedEvent.capacity }} pessoas</p>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <v-select v-model="ticketType" :items="ticketTypes" label="Tipo de Ingresso" outlined dense></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select v-model="seat" :items="seats" label="Selecione seu assento" outlined dense></v-select>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12">
        <v-select v-model="selectedClient" :items="clientNames" item-text="name" item-value="id" label="Cliente"
          outlined dense></v-select>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn color="primary" @click="buyTicket">Comprar Ingresso</v-btn>
      </v-col>
    </v-row>

    <!-- Exibir o ingresso comprado -->
    <v-row v-if="ticket" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ ticket.toString() }}</v-card-title>
          <v-card-subtitle>{{ ticket.getSession() }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Assento:</strong> {{ ticket.getSeat() }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import clientService from "@/services/clientService";
import eventService from "@/services/eventService";
import Client from "@/model/client";
import Event from "@/model/event";
import Ticket from "@/model/ticket";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      events: [] as Event[],
      clients: [] as Client[], 
      selectedEvent: null as Event | null,
      selectedClient: null as Client | null,
      ticketType: "",
      seat: "",
      ticket: null as Ticket | null,
      ticketTypes: ["Camarote", "Pista", "VIP", "Open Bar", "Foto com o Artista"],
      seats: ["A1", "A2", "B1", "B2", "C1", "C2"],
    };
  },
  mounted() {
    // Carregar eventos e clientes ao montar o componente
    this.loadEvents();
    this.loadClients();
  },
  methods: {
    async loadEvents() {
      try {
        const response = await eventService.fetchEvents();
        console.log(response);
        this.events = response;
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    },
    async loadClients() {
      try {
        const response = await clientService.fetchClients();
        console.log(response);
        this.clients = response;
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    },
    async buyTicket() {
      if (this.selectedEvent && this.selectedClient && this.seat) {
        // Ensure selectedEvent is an instance of Event, if not create one
        const event = this.selectedEvent instanceof Event ? this.selectedEvent : new Event(
          this.selectedEvent.name,
          this.selectedEvent.type,
          this.selectedEvent.artists,
          new Date(this.selectedEvent.date),
          this.selectedEvent.session,
          this.selectedEvent.capacity
        );

        const client = this.selectedClient instanceof Client ? this.selectedClient : new Client(
          this.selectedClient.name,
          this.selectedClient.address,
          this.selectedClient.cpf,
          this.selectedClient.dateOfBirth,
          this.selectedClient.agreement,
          this.selectedClient.hasConvenio
        );

        const newTicket = new Ticket(
          client,
          event,
          event.session,
          this.seat
        );
        this.ticket = newTicket;
        await this.saveTicket(newTicket);
      }
    },
    async saveTicket(ticket: Ticket) {
      try {
        await axios.post(`${API_URL}/tickets`, {
          clientId: ticket.client.getId(),
          eventId: ticket.event.getId(),
          session: ticket.session,
          seat: ticket.seat,
        });
      } catch (error) {
        console.error("Erro ao salvar ingresso:", error);
      }
    },
  },
  computed: {
    eventNames() {
      return this.events.map((event) => ({
        id: event.getId(),
        name: event.name,
        date: new Date(event.date).toLocaleDateString(),
        capacity: event.capacity,
      }));
    },

    clientNames() {
      return this.clients.map((client) => ({
        id: client.getId(),
        name: client.name,
      }));
    },
  },
});
</script>
