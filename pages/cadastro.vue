<template>
  <body style="background-color: white; height: 100dvh">
    <v-container>
      <v-card
        class="mx-auto"
        max-width="344"
        title="User Registration"
        elevation="12"
      >
        <v-container>
          <v-text-field
            v-model="registeruser.username"
            color="primary"
            label="Username"
            variant="underlined"
          />

          <v-text-field
            v-model="registeruser.name"
            color="primary"
            label="Nome completo"
            variant="underlined"
          />

          <v-text-field
            v-model="registeruser.cpf"
            v-mask="['###.###.###-##']"
            color="primary"
            label="CPF"
            variant="underlined"
          />

          <v-text-field
            v-model="registeruser.phone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            color="primary"
            label="Telefone"
            variant="underlined"
          />

          <v-text-field
            v-model="registeruser.email"
            color="primary"
            label="Email"
            variant="underlined"
          />

          <v-text-field
            v-model="registeruser.password"
            color="primary"
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="underlined"
          />

          <v-checkbox
            v-model="terms"
            color="secondary"
            label="I agree to site terms and conditions"
          />
        </v-container>

        <v-divider />
        <v-container>
          <v-btn
            class="text-none font-weight-regular"
            text="Voltar"
            style="position: absolute; left: 0; margin-left: 16px"
            variant="tonal"
            to="/login/"
          />
          <v-btn
            class="text-none font-weight-regular"
            text="Concluir"
            style="left: 0; margin-left: 220px"
            variant="tonal"
            :disabled="!terms"
            @click="register"
          />
        </v-container>
      </v-card>
    </v-container>
  </body>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  name: "Cadastro",
  directives: { mask },
  data() {
    return {
      dialog: false,
      terms: false,
      registeruser: {
        username: "",
        name: "",
        cpf: "",
        phone: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async register() {
      if (!this.registeruser.username || !this.registeruser.name || !this.registeruser.cpf || !this.registeruser.phone || !this.registeruser.email || !this.registeruser.password || !this.terms) {
        this.$toast.error("Preencha todos os campos e concorde com os termos!");
        return;
      } 
      const response = await this.$api.post("/users/register/", this.registeruser);
      if (response.type === "error") {
        this.$toast.error("Erro ao cadastrar usuário!");
      } else {
        this.$router.push("/login/");
      }
    },
  },
};
</script>
