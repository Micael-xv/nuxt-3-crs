<template>
  <v-container class="pa-4 text-center fundo-imagem">
    <h1 class="mt-12" style="color: white">{{ valor }}</h1>
    <BotaoPadraoComponent color="error" text="Contar" @clicou-botao="contar" />
    <v-row>
      <v-col>
        <h1 class="mt-3" style="color: white">Bem-vindo</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 style="color: white">Loja</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          style="background-color: green; color: white"
          rounded="xl"
          to="/"
        >
          Ir tela usuário
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
definePageMeta({
  layout: "admin",
});

export default {
  name: "Index",
  data() {
    return {
      valor: 0,
      userToken: null,
      role: "",
    };
  },

  async created() {
    this.userToken = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:3333/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('Resposta da API:', response.data);
        if (response.data) {
          const user = response.data;
          this.user.name = user.name;
          this.user.service = user.role;
        } else {
          this.router.push("/error");
        }
      } catch (error) {
        this.router.push("/error"); // Se houver um erro ao obter o perfil, deslogue o usuário
      }
    }
  },

  methods: {
    contar() {
      this.valor++;
    },
  },
};
</script>

<style scoped>
.fundo-imagem {
  background-image: url("../../img/dev.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
