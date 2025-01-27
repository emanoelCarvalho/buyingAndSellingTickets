<template>
  <v-container>
    <!-- Formulário de Registro -->
    <v-card class="mx-auto" max-width="500">
      <v-card-title class="text-h5">Register Client</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <!-- Name -->
          <v-text-field
            label="Name"
            v-model="form.name"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <!-- Address -->
          <v-text-field
            label="Address"
            v-model="form.address"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <!-- CPF -->
          <v-text-field
            label="CPF"
            v-model="form.cpf"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <!-- Date of Birth -->
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.dateOfBirth"
                label="Date of Birth"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.dateOfBirth"
              @update:modelValue="menu = false"
            ></v-date-picker>
          </v-menu>

          <!-- Agreement -->
          <v-checkbox
            v-model="form.agreement"
            label="I agree to the terms and conditions"
            :rules="[rules.required]"
          ></v-checkbox>

          <!-- Has Convenio -->
          <v-checkbox
            v-model="form.hasConvenio"
            label="Has Convenio"
          ></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <!-- Submit Button -->
        <v-btn color="primary" :disabled="!isFormValid" @click="handleSubmit">
          Submit
        </v-btn>

        <!-- Reset Button -->
        <v-btn text @click="resetForm">Reset</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Listagem de Clientes -->
    <v-card class="mx-auto mt-5" max-width="500">
      <v-card-title class="text-h5">Clients List</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group v-if="clients.length">
            <v-list-item v-for="client in clients" :key="client.id">
              <v-list-item-content>
                <v-list-item-title>{{ client.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ client.address }} - {{ client.cpf }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Convenio: {{ client.hasConvenio ? "Yes" : "No" }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-alert v-else type="info">No clients found</v-alert>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Client from "@/model/client";
import ClientService from "@/services/clientService";

export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        cpf: "",
        dateOfBirth: "",
        agreement: false,
        hasConvenio: false,
      },
      isFormValid: false,
      menu: false,
      rules: {
        required: (value) => !!value || "This field is required",
      },
      clients: [],
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        const newClient = new Client(
          this.form.name,
          this.form.address,
          this.form.cpf,
          this.form.dateOfBirth,
          this.form.agreement,
          this.form.hasConvenio
        );

        ClientService.addClient(newClient)
          .then(() => {
            this.resetForm();
            this.fetchClients();
          })
          .catch((error) => {
            console.error("Error submitting client:", error);
          });
      } else {
        console.log("Form is invalid");
      }
    },
    fetchClients() {
      ClientService.getClients()
        .then((response) => {
          this.clients = response.data.map((client) =>
            new Client(
              client.name,
              client.address,
              client.cpf,
              client.dateOfBirth,
              client.agreement,
              client.hasConvenio || false
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching clients:", error);
        });
    },
    resetForm() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      this.form = {
        name: "",
        address: "",
        cpf: "",
        dateOfBirth: "",
        agreement: false,
        hasConvenio: false,
      };
    },
  },
  mounted() {
    this.fetchClients();
  },
};
</script>

<style scoped>
.mx-auto {
  margin: auto;
}
</style>
