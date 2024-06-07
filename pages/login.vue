<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="344"
          title="Cadastro de usuário"
          theme="light"
          elevation="10"
        >
          <v-container>
            <v-text-field
              v-model="first"
              clearable
              color="primary"
              label="First name"
              variant="underlined"
            />
            <v-text-field
              v-model="last"
              clearable
              color="primary"
              label="Last name"
              variant="underlined"
            />
            <v-text-field
              v-model="email"
              clearable
              color="primary"
              label="Email"
              variant="underlined"
            />
            <v-text-field
              v-model="password"
              clearable
              :type="show1 ? 'text' : 'password'"
              color="primary"
              label="Password"
              placeholder="Enter your password"
              variant="underlined"
            />
            <v-checkbox
              v-model="terms"
              color="secondary"
              label="Concordo com os termos e condições do site"
            />
          </v-container>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="success">
              Complete Registration
              <v-icon icon="mdi-chevron-right" end />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    terms: false,
  }),
};
</script>
