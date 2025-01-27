<template>
    <v-container>
      <v-row class="mb-4">
        <v-col cols="12">
          <h1>Compra de Ingresso</h1>
          <v-select
            v-model="selectedEvent"
            :items="eventNames"
            item-text="name"
            item-value="id"
            label="Escolha o Evento"
            outlined
            dense
          ></v-select>
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
          <v-select
            v-model="ticketType"
            :items="ticketTypes"
            label="Tipo de Ingresso"
            outlined
            dense
          ></v-select>
        </v-col>
  
        <v-col cols="12" sm="6">
          <v-select
            v-model="seat"
            :items="seats"
            label="Selecione seu assento"
            outlined
            dense
          ></v-select>
        </v-col>
      </v-row>
  
      <v-row class="mb-4">
        <v-col cols="12">
          <v-select
            v-model="selectedClient"
            :items="clientsMock"
            item-text="name"
            item-value="id"
            label="Cliente"
            outlined
            dense
          ></v-select>
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
import Client from "@/model/client";
import Event from "@/model/event";
import Ticket from "@/model/ticket";

// Dados mockados diretamente nas classes Client e Event
const clientsMock = [
  new Client(1,"João Silva", "Rua A, 123", "123.456.789-00", "1990-01-01", true),
  new Client(2,"Maria Oliveira", "Avenida B, 456", "987.654.321-00", "1985-05-10", true),
  new Client(3,"Carlos Souza", "Praça C, 789", "135.246.357-00", "1992-07-20", false)
];

const eventsMock = [
  new Event(1,"Festival de Música", "Festival", ["Artista 1", "Artista 2"], new Date("2025-06-15"), "Sessão 1", 500),
  new Event(2,"Show de Comédia", "Comédia", ["Artista 3", "Artista 4"], new Date("2025-07-10"), "Sessão 2", 300)
];

export default defineComponent({
  data() {
    return {
      eventsMock, // Dados mockados dos eventos
      clientsMock, // Dados mockados dos clientes
      selectedEvent: null as Event | null, // Evento selecionado
      selectedClient: null as Client | null, // Cliente selecionado
      ticketType: "",
      seat: "",
      ticket: null as Ticket | null, // Ingresso que será gerado
      ticketTypes: ["Camarote", "Pista", "VIP", "Open Bar", "Foto com o Artista"],
      seats: ["A1", "A2", "B1", "B2", "C1", "C2"],
    };
  },
  methods: {
    // Função para gerar o ingresso
    buyTicket() {
      if (this.selectedEvent && this.selectedClient && this.seat) {
        const newTicket = new Ticket(
          this.selectedClient,
          this.selectedEvent,
          this.selectedEvent.session,
          this.seat
        );
        this.ticket = newTicket; // Atribuindo o ingresso gerado
      }
    }
  },
  computed: {
    // Lista de nomes dos eventos
    eventNames() {
      return this.eventsMock.map((event) => ({
        id: event,
        name: event.name,
        date: event.date.toLocaleDateString(),
        capacity: event.capacity
      }));
    }
  }
});
</script>
