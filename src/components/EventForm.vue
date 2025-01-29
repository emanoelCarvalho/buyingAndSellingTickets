<template>
  <v-container>
    <v-row class="mb-4 text-center">
      <v-col cols="12">
        <h1 class="title">Cadastrar Eventos</h1>
      </v-col>
    </v-row>
    <v-row class="mb-4 d-flex justify-center">
      <v-col cols="12" md="6" class="text-center">
        <v-btn color="primary" class="btn-primary" @click="openDialog">
          Criar Evento
        </v-btn>
      </v-col>
    </v-row>

    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6 primary-title">Cadastrar Evento</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Nome do Evento" outlined dense></v-text-field>
          <v-text-field v-model="form.type" label="Tipo do Evento" outlined dense></v-text-field>
          <v-textarea v-model="form.artists" label="Artistas (separados por vírgula)" outlined dense></v-textarea>
          <v-text-field v-model="form.date" label="Data" type="date" outlined dense></v-text-field>
          <v-text-field v-model="form.session" label="Sessão" outlined dense></v-text-field>
          <v-text-field v-model="form.capacity" label="Capacidade" type="number" outlined dense></v-text-field>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn color="success" class="btn-success" @click="createEvent">Salvar</v-btn>
          <v-btn color="error" class="btn-error" @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Lista de Eventos -->
    <v-row class="mt-4">
      <v-col v-for="event in events" :key="event.id" cols="12" md="6" lg="4">
        <v-card class="event-card">
          <v-card-title class="event-title">{{ event.name }}</v-card-title>
          <v-card-subtitle class="event-subtitle">{{ event.type }}</v-card-subtitle>
          <v-card-text class="event-content">
            <p><strong>Artistas:</strong> {{ event.artists.join(', ') }}</p>
            <p><strong>Data:</strong> {{ event.date }}</p>
            <p><strong>Sessão:</strong> {{ event.session }}</p>
            <p><strong>Capacidade:</strong> {{ event.capacity }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventService from "@/services/eventService";

export default defineComponent({
  data() {
    return {
      dialog: false,
      events: [] as any[], // Lista de eventos
      form: {
        name: "",
        type: "",
        artists: "",
        date: "",
        session: "",
        capacity: 0,
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
    async fetchEvents() {
      try {
        this.events = await EventService.fetchEvents();
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    },
    async createEvent() {
      try {
        const artists = this.form.artists.split(",").map((a) => a.trim());

        const newEvent = {
          name: this.form.name,
          type: this.form.type,
          artists: artists,
          date: this.form.date,
          session: this.form.session,
          capacity: this.form.capacity,
        };

        await EventService.createEvent(newEvent);
        this.fetchEvents();
        this.resetForm();
        this.closeDialog();
      } catch (error) {
        console.error("Erro ao criar evento:", error);
      }
    },
    async deleteEvent(id: number) {
      try {
        await EventService.deleteEvent(id);
        this.fetchEvents();
      } catch (error) {
        console.error("Erro ao deletar evento:", error);
      }
    },
    resetForm() {
      this.form = {
        name: "",
        type: "",
        artists: "",
        date: "",
        session: "",
        capacity: 0,
      };
    },
  },
  mounted() {
    this.fetchEvents();
  },
});
</script>

<style scoped>
.title {
  font-size: 28px;
  font-weight: bold;
  color: #3f51b5;
  text-align: center;
}

.primary-title {
  color: #3f51b5;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.btn-primary {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
}

.btn-success {
  background-color: #4caf50;
  color: white;
}

.btn-error {
  background-color: #f44336;
  color: white;
}

.event-card {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 16px;
  transition: 0.3s;
}

.event-card:hover {
  transform: scale(1.02);
}

.event-title {
  font-size: 20px;
  font-weight: bold;
  color: #3f51b5;
}

.event-subtitle {
  font-size: 16px;
  color: #757575;
}

.event-content p {
  margin: 5px 0;
  font-size: 14px;
  color: #424242;
}
</style>
