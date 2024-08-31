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
    if (!this.userToken) {
      // console.error("Token não encontrado. Redirecionando...");
      this.$router.push("/error"); // Redireciona para a página de erro
      return;
    }
    try {
      const response = await this.$axios.get("/users/profile/", {
        headers: { Authorization: `Bearer ${this.userToken}` },
      });
      this.role = response.data.role;
      console.log("Perfil obtido. Role do usuário:", this.role);
      if (this.role !== "manager") {
        // console.error("Usuário não é manager. Redirecionando...");
        this.$router.push("/error"); // Redireciona para a página de erro
      }
    } catch (error) {
      // console.error("Erro ao verificar o perfil do usuário. Redirecionando...", error);
      this.$router.push("/error"); // Redireciona para a página de erro em caso de falha na obtenção do perfil
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
