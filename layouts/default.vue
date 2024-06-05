<template>
  <v-card>
    <v-layout>
      <v-app-bar color="white" density="compact">
        <template #prepend>
          <v-app-bar-nav-icon />
          <v-btn to="/" variant="plain"> inicio </v-btn>
          <v-btn to="/teste/" variant="plain"> teste </v-btn>
        </template>
        <template #default>
          <v-card-text>
            <v-text-field
              label="Pesquisa"
              prepend-inner-icon="mdi-magnify"
              hide-details
              single-line
              width="500"
            />
          </v-card-text>
        </template>
        <template #append>
          <v-btn icon="mdi-dots-vertical" />
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
