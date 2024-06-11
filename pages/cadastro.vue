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
            type="password"
            placeholder="Enter your password"
            variant="underlined"
          />
          <v-checkbox
            v-model="terms"
            color="secondary"
            label="I agree to site terms and conditions"
          />
        </v-container>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <div class="pa-4 text-center">
            <v-dialog v-model="dialog" max-width="600">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  class="text-none font-weight-regular"
                  prepend-icon="mdi-account"
                  text="Next"
                  variant="tonal"
                  v-bind="activatorProps"
                />
              </template>

              <v-card prepend-icon="mdi-account" title="User Profile">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="First name*" required/>
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        hint="example of helper text only on focus"
                        label="Middle name"
                      />
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        hint="example of persistent helper text"
                        label="Last name*"
                        persistent-hint
                        required
                      />
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="Email*" required/>
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        label="Password*"
                        type="password"
                        required
                      />
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        label="Confirm Password*"
                        type="password"
                        required
                      />
                    </v-col>
                  </v-row>

                  <small class="text-caption text-medium-emphasis"
                    >*indicates required field</small
                  >
                </v-card-text>

                <v-divider/>

                <v-card-actions>
                  <v-spacer/>

                  <v-btn
                    text="Close"
                    variant="plain"
                    @click="dialog = false"
                  />

                  <v-btn
                    color="primary"
                    text="Save"
                    variant="tonal"
                    @click="dialog = false"
                  />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card-actions>
      </v-card>
    </v-container>
  </body>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
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
};
</script>
