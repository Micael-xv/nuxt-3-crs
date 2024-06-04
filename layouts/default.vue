<template>
  <v-sheet color="#0d1117" elevation="3" rounded="lg">
    <v-tabs
      v-model="tab"
      :items="tabs"
      align-tabs="right"
      color="white"
      height="60"
      slider-color="#f78166"
    >
      <template #tab="{ item }">
        <v-tab
          :to="item.to"
          :prepend-icon="item.icon"
          :text="item.text"
          :value="item.value"
          class="text-none"
        />
      </template>

      <template #item="{ item }">
        <router-view :name="item.value" />
      </template>
    </v-tabs>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    tab: "tab-1",
    tabs: [
      {
        icon: "mdi-book-open-page-variant",
        text: "Readme",
        value: "index",
        to: "/user/",
      },

      {
        icon: "mdi-handshake-outline",
        text: "Code of Conduct",
        value: "tab-2",
        to: "/user/teste/",
      },

      {
        icon: "mdi-license",
        text: "MIT License",
        value: "tab-3",
        to: "/user/teste/",
      },

      {
        icon: "mdi-shield-lock-outline",
        text: "Security",
        value: "tab-4",
        to: "/user/teste/",
      },
    ],
  }),
};
</script>
