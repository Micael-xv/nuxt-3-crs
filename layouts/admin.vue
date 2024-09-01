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
            v-if="user.service"
            prepend-avatar="https://avatars.githubusercontent.com/u/75547915?v=4"
            :subtitle="user.email"
            :title="user.name"
          />
        </v-list>
        <v-divider/>
        <v-list density="compact" nav>  
          <v-list-item prepend-icon="mdi mdi-home-account" @click="navigateTo('/', 'user')" title="User"/>
          <v-list-item prepend-icon="mdi-home" @click="navigateTo('/admin', 'home')" title="Home"/>
          <v-list-item prepend-icon="mdi mdi-solar-panel-large" @click="navigateTo('/admin/produto', 'manager')" title="Produtos"/>
          <v-list-item prepend-icon="mdi mdi-table-plus" @click="navigateTo('/admin/categoria', 'manager')" title="Categorias"/>
          <v-list-item prepend-icon="mdi mdi-cart-minus" @click="navigateTo('/admin/pedidos', 'manager')" title="Pedidos"/>
          <v-list-item prepend-icon="mdi mdi-ticket-percent-outline" @click="navigateTo('/admin/cupons', 'manager')" title="Cupons"/>
          <v-list-item prepend-icon="mdi mdi-account-edit" @click="navigateTo('/admin/users', 'admin')" title="Users"/>
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
          this.logout();
        }
      }
    },

    checkPermission(requiredRole) {
      const userRole = this.user.service;
      if (userRole === requiredRole || userRole === 'manager') {
        return true; // Permissão concedida
      }
      this.$toast.error("Você não tem permissão para acessar esta página.");
      return false; // Permissão negada
    },

    navigateTo(route, requiredRole) {
      if (this.checkPermission(requiredRole)) {
        this.$router.push(route);
      }
    },
  },
};
</script>
