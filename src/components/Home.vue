<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center text-primary font-weight-bold">Eventos Disponíveis</h1>
      </v-col>

      <v-col v-for="event in events" :key="event.getId()" cols="12" md="6" lg="4">
        <v-card class="ma-4 elevation-5 rounded-lg">
          <v-card-title class="text-h6 font-weight-bold text-primary">
            {{ event.name }}
          </v-card-title>
          <v-card-subtitle class="text-grey-darken-1">
            <v-icon class="mr-1">mdi-calendar</v-icon> {{ event.date }} |
            <v-icon class="mr-1">mdi-ticket</v-icon> {{ event.session }}
          </v-card-subtitle>
          <v-card-text class="text-body-2">
            <p><v-icon class="mr-1">mdi-account-music</v-icon> Artistas: {{ event.artists.join(", ") }}</p>
            <p><v-icon class="mr-1">mdi-seat</v-icon> Capacidade: {{ event.capacity }}</p>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" class="rounded-lg" @click="buyTicket(event.getId())">
              <v-icon left>mdi-cart</v-icon> Comprar Ingresso
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal de CPF -->
    <v-dialog v-model="showCpfModal" max-width="450">
      <v-card class="pa-4">
        <v-card-title class="text-h6 font-weight-bold">Informe o CPF</v-card-title>
        <v-card-text>
          <v-text-field v-model="cpf" label="CPF" outlined dense color="primary" />
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn color="grey darken-1" text @click="closeCpfModal">Cancelar</v-btn>
          <v-btn color="primary" class="rounded-lg" @click="validateCpf">
            <v-icon left>mdi-check</v-icon> Validar CPF
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import api from "@/services/api";
import Client from "@/model/client.ts";
import Event from "@/model/event.ts";

export default {
  data() {
    return {
      events: [] as Event[],
      showModal: false,
      showCpfModal: false,
      cpf: "",
      hasConvenio: "",
      eventId: 0,
      client: null as Client | null,
      queue: [] as Client[],
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await api.get("http://localhost:3000/events");
        console.log("Eventos recebidos:", response.data);

        //mapeie os dados
        this.events = response.data.map((eventData: any) =>
          new Event(
            eventData.name,
            eventData.type,
            eventData.artists,
            new Date(eventData.date),
            eventData.session,
            eventData.capacity
          )
        );
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    },
    buyTicket(eventId: number) {
      this.eventId = eventId;
      this.showCpfModal = true;
    },
    closeCpfModal() {
      this.showCpfModal = false;
    },
    async validateCpf() {
      try {
        // Busca o cliente pelo CPF
        const response = await api.get(`http://localhost:3000/clients?cpf=${this.cpf}`);

        if (response.data.length === 0) {
          alert("CPF não encontrado!");
          return;
        }

        this.client = response.data[0];
        this.closeCpfModal();

        // Armazenar CPF e ID do evento no localStorage
        localStorage.setItem("cpf", this.cpf);
        localStorage.setItem("eventId", this.eventId.toString());

        // Encontrar o evento selecionado
        const selectedEvent = this.events.find(event => event.getId() === this.eventId);

        if (selectedEvent) {
          // Armazenar detalhes do evento no localStorage
          localStorage.setItem("eventName", selectedEvent.name);
          localStorage.setItem("eventDate", selectedEvent.date.toISOString());
          localStorage.setItem("eventCapacity", selectedEvent.capacity.toString());
        }

        console.log("Cliente encontrado:", this.client);
        console.log("Evento selecionado:", this.eventId);

        // Corrigindo a lógica de 'hasConvenio'
        this.hasConvenio = this.client?.hasConvenio ? "meia-fila" : "ultima-fila";

        const position = this.hasConvenio === "meia-fila" ? Math.floor(this.queue.length / 2) : this.queue.length;

        console.log(`Usuário ${this.client?.name} com CPF ${this.cpf} irá para a ${this.hasConvenio} na fila para o evento ${this.eventId}`);

        this.$router.push({
          path: `/queue/${this.eventId}`,
          query: { position: position, name: this.client?.name, convenio: this.hasConvenio },
        });

      } catch (error) {
        console.error("Erro ao validar CPF:", error);
      }
    },

    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    this.fetchEvents();
  },
};

</script>


<style scoped>
.text-center {
  text-align: center;
}

.elevation-5 {
  transition: all 0.3s ease;
}

.elevation-5:hover {
  transform: scale(1.03);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
