<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="mx-auto pa-6 elevation-5 rounded-lg" max-width="500">
      <v-card-title class="text-h5 font-weight-bold text-primary">
        Register Client
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent="handleSubmit">
          <v-text-field
            label="Name"
            v-model="form.name"
            :rules="[rules.required]"
            required
            outlined
            dense
            color="primary"
          ></v-text-field>

          <v-text-field
            label="Address"
            v-model="form.address"
            :rules="[rules.required]"
            required
            outlined
            dense
            color="primary"
          ></v-text-field>

          <v-text-field
            label="CPF"
            v-model="form.cpf"
            :rules="[rules.required]"
            required
            outlined
            dense
            color="primary"
          ></v-text-field>

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
                outlined
                dense
                color="primary"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.dateOfBirth"
              @update:modelValue="menu = false"
            ></v-date-picker>
          </v-menu>

          <v-checkbox
            v-model="form.hasConvenio"
            label="Has Convenio"
            color="primary"
          ></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="secondary" outlined @click="goToHome">
          Já possui cadastro
        </v-btn>

        <div>
          <v-btn color="error" text class="mr-2" @click="resetForm">
            Reset
          </v-btn>
          <v-btn color="primary" :disabled="!isFormValid" @click="handleSubmit">
            Submit
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ClientService from "@/services/clientService";

export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        cpf: "",
        dateOfBirth: "",
        hasConvenio: false, // Será true ou false dependendo da seleção
      },
      isFormValid: true,
      menu: false,
      rules: {
        required: (value) => !!value || "This field is required",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.log(this.form); // Verifique o valor dos dados antes de enviar

        // Certifique-se de que o form esteja validado
        if (this.$refs.form.validate()) {
          // Envia o formulário com a seleção de hasConvenio (true ou false)
          await ClientService.addClient(this.form);
          this.resetForm();
          alert("Client added!");
          this.$router.push('/home'); 
        } else {
          console.log("Form is invalid");
        }
      } catch (error) {
        console.error("Error submitting client:", error);
      }
    },
    resetForm() {
      this.form = {
        name: "",
        address: "",
        cpf: "",
        dateOfBirth: "",
        hasConvenio: false,
      };
    },
    goToHome() {
      this.$router.push('/home'); // Redireciona diretamente para o /home
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>