<template>
  <body style="background-color: white; height: 100dvh">
    <v-container>
      <v-card
        class="mx-auto"
        max-width="344"
        title="User Registration"
        theme="light"
        elevation="10"
      >
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="first"
                color="primary"
                label="First name"
                variant="underlined"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="last"
            color="primary"
            label="Last name"
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
    }),
  }
</script>