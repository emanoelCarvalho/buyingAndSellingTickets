<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">Eventos Disponíveis</h1>
      </v-col>

      <v-col v-for="event in events" :key="event.getId()" cols="12" md="6" lg="4">
        <v-card class="ma-4">
          <v-card-title>{{ event.name }}</v-card-title>
          <v-card-subtitle>
            Tipo: {{ event.type }} | Data: {{ event.date }} | Sessão: {{ event.session }}
          </v-card-subtitle>
          <v-card-text>
            <p>Artistas: {{ event.artists.join(", ") }}</p>
            <p>Capacidade: {{ event.capacity }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="buyTicket(event.getId())">
              Comprar Ingresso
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal de CPF -->
    <v-dialog v-model="showCpfModal" max-width="500px">
      <v-card>
        <v-card-title>Informe o CPF</v-card-title>
        <v-card-text>
          <v-text-field v-model="cpf" label="CPF" outlined />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeCpfModal">Cancelar</v-btn>
          <v-btn color="primary" @click="validateCpf">Validar CPF</v-btn>
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

        localStorage.setItem("cpf", this.cpf);
        localStorage.setItem("eventId", this.eventId.toString());

        console.log("Cliente encontrado:", this.client);
        console.log("Evento selecionado:", this.eventId);

        // Corrigindo a lógica de 'hasConvenio'
        this.hasConvenio = this.client?.hasConvenio ? "meia-fila" : "ultima-fila";

        const position = this.hasConvenio === "meia-fila" ? Math.floor(this.queue.length / 2) : this.queue.length;

        console.log()
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
</style>
