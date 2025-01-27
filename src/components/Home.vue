<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">Available Events</h1>
        </v-col>
      </v-row>
  
      <!-- List of Events -->
      <v-row>
        <v-col
          v-for="event in events"
          :key="event.id"
          cols="12"
          md="4"
        >
          <v-card class="mx-auto" max-width="400" outlined>
            <v-card-title>
              <span class="text-h6">{{ event.name }}</span>
            </v-card-title>
  
            <v-card-subtitle>
              {{ event.type }} | {{ formatDate(event.date) }}
            </v-card-subtitle>
  
            <v-card-text>
              <strong>Artists:</strong> {{ event.artists.join(", ") }}<br />
              <strong>Session:</strong> {{ event.session }}<br />
              <strong>Capacity:</strong> {{ event.capacity }}
            </v-card-text>
  
            <v-card-actions>
              <v-btn color="primary" @click="openModal(event.id)">
                Buy Tickets
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Modal -->
      <v-dialog v-model="isModalOpen" max-width="500">
        <v-card>
          <v-card-title class="headline">
            <span v-if="!inQueue">VIP Confirmation</span>
            <span v-else>Queue Status</span>
          </v-card-title>
          <v-card-text>
            <div v-if="!inQueue">
              Are you a VIP client? You will get priority in the queue if you are.
            </div>
            <div v-else>
              You are in the queue for event ID: {{ selectedEventId }}.<br />
              Your current position: {{ positionInQueue }}<br />
              Please wait until it's your turn to proceed to the purchase page.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="!inQueue"
              color="success"
              @click="confirmVip(true)"
            >
              Yes, I'm VIP
            </v-btn>
            <v-btn
              v-if="!inQueue"
              color="warning"
              @click="confirmVip(false)"
            >
              No, I'm not
            </v-btn>
            <v-btn
              v-if="inQueue"
              color="error"
              @click="cancelQueue"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import eventService from "@/services/eventService";
  import Event from "@/model/event";
  import Client from "@/model/client";
  import Queue from "@/model/queue";
  
  export default {
    data() {
      return {
        events: [],
        isModalOpen: false,
        selectedEventId: null,
        inQueue: false,
        positionInQueue: null,
        clientId: null,
        queue: new Queue(),
        intervalId: null,
      };
    },
    created() {
      this.loadEvents();
    },
    methods: {
      async loadEvents() {
        try {
          this.events = await eventService.fetchEvents();
        } catch (error) {
          console.error("Failed to load events:", error);
        }
      },
  
      // Format date for display
      formatDate(date) {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(date));
      },
  
      // Open modal for VIP confirmation
      openModal(eventId) {
        this.selectedEventId = eventId;
        this.isModalOpen = true;
      },
  
      // Confirm VIP status and add client to the queue
      confirmVip(isVip) {
        const client = new Client(
          "John Doe",
          "123 Main St",
          "123.456.789-00",
          "1990-01-01",
          true
        );
        this.clientId = client.id;
  
        this.queue.getInQueue(client, isVip);
  
        this.inQueue = true;
        this.updateQueuePosition();
        this.listenQueue();
      },
  
      // Update client position in queue
      updateQueuePosition() {
        const clients = this.queue.listQueue();
        this.positionInQueue = clients.findIndex((c) => c.id === this.clientId) + 1;
      },
  
      // Listen for queue position updates
      listenQueue() {
        this.intervalId = setInterval(() => {
          this.updateQueuePosition();
  
          if (this.positionInQueue === 1) {
            clearInterval(this.intervalId);
            this.$router.push(`/purchase/${this.selectedEventId}`);
          }
        }, 1000);
      },
  
      // Cancel participation in the queue
      cancelQueue() {
        this.queue.start = this.queue.listQueue().filter(
          (c) => c.id !== this.clientId
        );
        this.inQueue = false;
        this.resetModal();
      },
  
      // Close modal and reset related data
      resetModal() {
        clearInterval(this.intervalId);
        this.isModalOpen = false;
        this.inQueue = false;
        this.positionInQueue = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>
