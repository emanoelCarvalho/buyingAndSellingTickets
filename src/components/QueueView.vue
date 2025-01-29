<template>
  <div class="queue">
    <h1>Fila de Espera para o Evento</h1>
    <p>Evento: {{ eventName }}</p>
    <p>Sua posição atual: {{ userPosition }}</p>
    <p>Total de pessoas na fila: {{ queue.size() }}</p>

    <ul>
      <li v-for="(person, index) in queueList()" :key="person.getId()">
        {{ index + 1 }}. {{ person.name }}
      </li>
    </ul>
  </div>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
