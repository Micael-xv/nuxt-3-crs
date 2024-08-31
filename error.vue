<template>
  <div class="error-container" dark>
    <v-row justify="center" align="center" class="text-center" style="width: 100%;">
      <v-col cols="12">
        <h1 class="error-code">
          {{ error.statusCode }}
        </h1>
        <h2 class="error-message">
          {{ errorMessage }}
        </h2>
        <NuxtLink to="/" class="home-link">
          Voltar para a página inicial
        </NuxtLink>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Error',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Página não encontrada',
      otherError: 'Você não tem permissão para acessar esta página'
    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    }
  },
  computed: {
    errorMessage() {
      return this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    }
  }
}
</script>

<style scoped>
.error-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ff4b1f, #1fddff);
  color: white;
  text-align: center;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  margin-bottom: 20px;
  animation: pulse 1.5s infinite;
}

.error-message {
  font-size: 24px;
  margin-bottom: 30px;
}

.home-link {
  font-size: 18px;
  color: white;
  text-decoration: underline;
  transition: color 0.3s;
}

.home-link:hover {
  color: #ff4b1f;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
