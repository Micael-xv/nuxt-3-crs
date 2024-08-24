<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        theme="dark"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://avatars.githubusercontent.com/u/75547915?v=4"
            :subtitle="user.email"
            :title="user.name"
          />
        </v-list>
        <v-divider/>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" to="/admin" title="Home" value="home"/>
          <v-list-item prepend-icon="mdi mdi-solar-panel-large" to="/admin/tabela-produto" title="Produtos" value="Tabela"/>
          <v-list-item prepend-icon="mdi mdi-table-plus" to="/admin/tabela-categoria" title="Categorias" value="Tabela"/>
          <v-list-item prepend-icon="mdi mdi-cart-minus" to="/admin/pedidos" title="Pedidos" value="Tabela"/>
          <v-list-item prepend-icon="mdi mdi-ticket-percent-outline" to="/admin/cupons" title="Cupons" value="Tabela"/>
          <v-list-item prepend-icon="mdi mdi-account-edit" to="/admin/users" title="Users" value="Tabela"/>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh; background-color: black">
        <slot/>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      user: {
        name: "",
        service: "",
        email: "",
      },
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      const token = localStorage.getItem("token");
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
            this.user.email = user.email;
            this.user.service = user.role;
          } else {
            this.$toast.warning("Dados do usuário incompletos na resposta");
            this.logout();
          }
        } catch (error) {
          this.$toast.error("Erro ao buscar perfil do usuário:", error);
          this.logout(); // Se houver um erro ao obter o perfil, deslogue o usuário
        }
      }
    },
  },
};
</script>