<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card theme="dark">
          <v-row class="d-flex align-center">
            <v-col>
              <v-card-title class="d-flex justify-center">
                <h1 style="color: white">
                  {{ titulo }}
                </h1>
              </v-card-title>
            </v-col>
            <v-col cols="auto">
              <v-tooltip text="Adicionar novos itens" location="start">
                <template #activator="{ props }">
                  <v-btn
                    class="mr-9"
                    icon="mdi-plus"
                    size="default"
                    color="green"
                    elevation="20"
                    v-bind="props"
                    @click="criar"
                  />
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            />
            <v-data-table
              :search="search"
              :headers="headers"
              :items="items"
              theme="dark"
              :items-per-page="5"
              :items-per-page-options="[5, 10, 15, 20, 25, 50]" 
            >
              <template #item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TabelaComponent",
  props: {
    items: {
      type: Array,
    },
    headers: {
      type: Array,
    },
    titulo: {
      type: String,
    },
  },

  emits: ["excluir", "criar", "editar"],
  data() {
    return {
      search: "",
    };
  },

  methods: {
    deleteItem(item) {
      this.$emit("excluir", item);
    },
    criar() {
      this.$emit("criar");
    },
    editItem(item) {
      this.$emit("editar", item);
    },
  },
};
</script>
