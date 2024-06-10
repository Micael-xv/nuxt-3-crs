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
        v-model="username"
        color="primary"
        label="Username"
        variant="underlined"
      />

      <v-text-field
        v-model="name"
        color="primary"
        label="Nome completo"
        variant="underlined"
      />

      <v-text-field
        v-model="cpf"
        color="primary"
        label="CPF"
        variant="underlined"
      />
      <v-text-field
        v-model="phone"
        color="primary"
        label="Telefone"
        variant="underlined"
      />
      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      />

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      />

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="I agree to site terms and conditions"
      />
    </v-container>

    <v-divider/>

    <v-card-actions>
      <v-spacer/>
      <v-btn to="/login/" class="mr-6">
        Voltar
      </v-btn>

      <v-btn color="success">
        Concluir cadastro
        <v-icon icon="mdi-chevron-right" end/>
      </v-btn>

    </v-card-actions>
  </v-card>
    </v-container>
  </body>
</template>

<script>
  export default {
    data: () => ({
      first: null,
      last: null,
      email: null,
      password: null,
      terms: false,
      username: null,
      name: null,
      cpf: null,
      phone: null,
    }),
  }
</script>