<template>
  <body style="background-color: white; height: 100dvh">
    <div>
      <v-img class="mx-auto my-6" max-width="228" />

      <v-row>
        <v-col style="text-align: center; margin-top: 10%">
          <h3 class="font-italic" style="color: black; margin-left: 25%">
            Bem-vindo de volta! Entre para explorar nossa incrível variedade de
            produtos frescos, eletrônicos de ponta, cuidados pessoais e muito
            mais. Sua jornada de compras começa aqui. Faça login e descubra a
            conveniência de encontrar tudo o que você precisa em um único lugar!
          </h3>
        </v-col>
        <v-col>
          <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
            style=""
          >
            <h2 class="text-center">Faça login</h2>
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field
              v-model="sigin.email"
              density="compact"
              placeholder="Email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
            />

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Password
              <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Forgot login password?</a
              >
            </div>

            <v-text-field
              v-model="sigin.password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              @keyup.enter="pegaToken"
            />

            <v-btn
              class="mb-8 mt-6"
              color="blue"
              size="large"
              variant="tonal"
              block
              rounded="xl"
              elevation="2"
              @click="pegaToken"
            >
              Log In
            </v-btn>

            <v-card-text class="text-center">
              <v-btn
                class="text-blue text-decoration-none mt-n2"
                to="/cadastro/"
                rel="noopener noreferrer"
                variant="tonal"
                elevation="2"
                rounded="xl"
              >
                Inscreva-se agora <v-icon icon="mdi-chevron-right" />
              </v-btn>
            </v-card-text>
            <div class="text-center">
              <v-btn
                rounded="xl"
                elevation="2"
                class="text-capitalize mt-3"
                variant="outlined"
                to="/"
              >
                Voltar
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </body>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    sigin: {
      email: "",
      password: "",
    },
    visible: false,
  }),
  methods: {
    async pegaToken() {
      if (this.sigin.email || this.sigin.password) {
        try {
          const response = await this.$api.post(`/users/login/`, {
            ...this.sigin,
          });
          if (response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            this.$toast.success("Login efetuado com sucesso!");
            this.$router.push("/").then(() => {
              window.location.reload();
            });
          }
        } catch (error) {
          console.error("Erro ao fazer login:", error);
          this.$toast.error("Erro ao fazer login. Por favor, tente novamente.");
        }
      }
    },
  },
};
</script>

