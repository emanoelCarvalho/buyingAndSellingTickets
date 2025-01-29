<template>
  <div class="queue">
    <h1>Fila de Espera para o Evento</h1>
    <p>Evento: {{ eventName }}</p>
    <p>Sua posição atual: {{ userPosition }}</p>
    <p>Total de pessoas na fila: {{ queue.length }}</p>

    <ul>
      <li v-for="(person, index) in queue" :key="person.id">
        {{ index + 1 }}. {{ person.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

interface Person {
  id: number;
  name: string;
}

export default {
  name: "QueueView",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const queue = ref<Person[]>([]);
    const userPosition = ref(0);
    const eventName = ref("");
    const hasConvenio = route.query.convenio as string; // Recupera o valor de "convenio" da query string
    const positionFromQuery = route.query.position ? parseInt(route.query.position as string) : 0;
    const userName = route.query.name as string;

    const generateQueue = () => {
      const people = [];
      for (let i = 1; i <= 25; i++) {
        people.push({ id: i, name: `Pessoa ${i}` });
      }
      return people;
    };

    const addUserToQueue = () => {
      const newUser: Person = {
        id: queue.value.length + 1,
        name: userName || "Você",
      };

      if (hasConvenio === "yes") {
        // Se o cliente tem convênio, ele vai para o meio da fila
        const middleIndex = Math.floor(queue.value.length / 2);
        queue.value.splice(middleIndex, 0, newUser);
        userPosition.value = middleIndex + 1;
      } else {
        // Se o cliente não tem convênio, vai para o final da fila
        queue.value.push(newUser);
        userPosition.value = queue.value.length;
      }
    };

    const processQueue = () => {
      setInterval(() => {
        if (userPosition.value > 1) {
          queue.value.shift();
          userPosition.value--;
        } else if (userPosition.value === 1) {
          router.push("/buyTicket");
        }
      }, 20000);
    };

    onMounted(() => {
      const eventId = route.params.eventId;
      eventName.value = `Evento ${eventId}`;

      queue.value = generateQueue();
      addUserToQueue();
      processQueue();
    });

    return {
      queue,
      userPosition,
      eventName,
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
