<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="344"
          title="User Registration"
          theme="light"
          elevation="10"
        >
          <v-container>
            <v-text-field
              v-model="first"
              color="primary"
              label="First name"
              variant="underlined"
            />
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
          <v-card-actions>
            <v-spacer/>
            <v-btn color="success">
              Complete Registration
              <v-icon icon="mdi-chevron-right" end/>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>