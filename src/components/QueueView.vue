<template>
  <v-container class="queue">
    <v-card class="text-center pa-6">
      <v-card-title class="text-h5 font-weight-bold">
        Fila de Espera para o Evento
      </v-card-title>
      <v-card-subtitle class="text-h6 mb-4">
        Evento: {{ eventName }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <p class="text-body-1">Sua posição atual: <strong>{{ userPosition }}</strong></p>
        <p class="text-body-1">Total de pessoas na fila: <strong>{{ queue.size() }}</strong></p>
      </v-card-text>
      <v-list dense>
        <v-list-item v-for="(person, index) in queueList()" :key="person.getId()">
          <v-list-item-content>
            <v-list-item-title>{{ index + 1 }}. {{ person.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Queue from "@/model/queue.ts"; 
import Client from "@/model/client.ts"; 

export default {
  name: "QueueView",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const eventName = ref("");
    const queue = new Queue();
    const userPosition = ref(0);

    const hasConvenio = route.query.convenio === "meia-fila";
    const userName = route.query.name as string;

    const addUserToQueue = () => {
      const newUser = new Client(userName, "Endereço Exemplo", "555.555.555-55", "1995-03-25", hasConvenio);
      queue.getInQueue(newUser);
      updateUserPosition();
    };

    const updateUserPosition = () => {
      const clients = queue.listQueue();
      userPosition.value = clients.findIndex((c) => c.name === userName) + 1;
    };

    const processQueue = () => {
      setInterval(() => {
        queue.removeFromQueue();
        updateUserPosition();

        if (userPosition.value === 0) {
          router.push("/buyTicket");
        }
      }, 2000);
    };

    onMounted(() => {
      const eventId = route.params.eventId;
      eventName.value = `Evento ${eventId}`;

      addUserToQueue();
      processQueue();
    });

    return {
      queue,
      userPosition,
      eventName,
      queueList: () => queue.listQueue(),
    };
  },
};
</script>

<style scoped>
.queue {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.text-center {
  max-width: 600px;
  width: 100%;
}
</style>
