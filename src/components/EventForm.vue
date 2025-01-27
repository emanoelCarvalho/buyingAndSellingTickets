<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12">
        <h1>Cadastrar Eventos</h1>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn color="primary" class="mr-2" @click="openDialog">
          Criar Evento
        </v-btn>
      </v-col>
    </v-row>

    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">Cadastrar Evento</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Nome do Evento" outlined dense></v-text-field>
          <v-text-field v-model="form.type" label="Tipo do Evento" outlined dense></v-text-field>
          <v-textarea v-model="form.artists" label="Artistas (separados por vírgula)" outlined dense></v-textarea>
          <v-text-field v-model="form.date" label="Data" type="date" outlined dense></v-text-field>
          <v-text-field v-model="form.session" label="Sessão" outlined dense></v-text-field>
          <v-text-field v-model="form.capacity" label="Capacidade" type="number" outlined dense></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="createEvent">Salvar</v-btn>
          <v-btn color="error" @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Lista de Eventos -->
    <v-row class="mt-4">
      <v-col v-for="event in events" :key="event.id" cols="12">
        <v-card class="mb-4">
          <v-card-title>{{ event.name }}</v-card-title>
          <v-card-subtitle>{{ event.type }}</v-card-subtitle>
          <v-card-text>
            <p>Artistas: {{ event.artists.join(', ') }}</p>
            <p>Data: {{ event.date }}</p>
            <p>Sessão: {{ event.session }}</p>
            <p>Capacidade: {{ event.capacity }}</p>
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
    // Abre o modal
    openDialog() {
      this.dialog = true;
    },
    // Fecha o modal e reseta o formulário
    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
    // Busca todos os eventos usando o service
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

        // Cria o evento no backend
        const createdEvent = await EventService.createEvent(newEvent);

        // Atualiza a lista de eventos para refletir o estado atual do servidor
        this.fetchEvents();

        // Reseta o formulário e fecha o modal
        this.resetForm();
        this.closeDialog();
      } catch (error) {
        console.error("Erro ao criar evento:", error);
      }
    },

    async deleteEvent(id: number) {
      try {
        // Exclui o evento no backend
        await EventService.deleteEvent(id);

        // Atualiza a lista de eventos para refletir a exclusão
        this.fetchEvents();
      } catch (error) {
        console.error("Erro ao deletar evento:", error);
      }
    },

    // Reseta o formulário
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
    this.fetchEvents(); // Busca eventos ao montar o componente
  },
});
</script>


<style scoped>
/* Título */
.title {
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
  text-align: center;
  margin-bottom: 20px;
}

/* Subtítulo */
.subtitle {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

/* Lista de Eventos */
.event-list-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.event-list-item:hover {
  background-color: #f9f9f9;
}

.v-btn {
  color: #3f51b5;
}
</style>
