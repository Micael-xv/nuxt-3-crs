<template>
  <v-container class="pa-4 text-center">
    <h1 style="color: white">{{ valor }}</h1>
    <BotaoPadraoComponent
      color="error"
      text="Contar"
      :dialog="dialog"
      @clicou-botao="abrirDialog"
      @excluir="deleteItem"
    />
    <v-row>
      <v-col>
        <h1 style="color: white">Bem-vindo</h1>
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
    dialog(evento) {
      this.valor++;
    },
  },

  methods: {
    abrirDialog() {
      this.valor++;
    },
  },
};
</script>
