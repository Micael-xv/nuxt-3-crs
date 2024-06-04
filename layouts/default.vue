<template>
  <v-layout>
    <v-row style="background-color: white; height: 60px; display: flex; align-items: center;" cols="12">
      <v-col md="1" class="mt-1 ml">
        <v-btn to="/" class="full-width" style="height: 20px; background-color: white; color: gray; transition: none;" variant="plain">
          Início
        </v-btn>
      </v-col>
      <v-col md="1" class="mt-1 ml-n12">
        <v-btn to="/teste/" class="full-width" style="height: 20px; background-color: white; color: gray; transition: none;" variant="plain">
          teste
        </v-btn>
      </v-col>
    </v-row>
    <v-main>
      <slot/>
    </v-main>
  </v-layout>
</template>
