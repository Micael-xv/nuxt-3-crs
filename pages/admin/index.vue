<template>
  <v-container class="pa-4 text-center fundo-imagem">
    <h1 class="mt-12" style="color: white">{{ valor }}</h1>
    <BotaoPadraoComponent
      color="error"
      text="Contar"
      :dialog="dialog"
      @clicou-botao="contar"
    />
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
        <v-btn style="background-color: green; color: white;" rounded="xl" to="/"> Ir tela usuário </v-btn>
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
  data: () => {
    return {
      ativo: false,
      dialog: false,
      valor: 0,
    };
  },

  watch: {
    dialog() {
      this.valor++;
    },
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
  background-image: url('../../img/dev.jpg'); 
  background-size: cover; /* Faz a imagem cobrir todo o contêiner */
  background-position: center; /* Centraliza a imagem no contêiner */
  background-repeat: no-repeat; /* Evita que a imagem se repita */
  height: 100vh; /* Faz o contêiner ocupar toda a altura da tela */
}
</style>
