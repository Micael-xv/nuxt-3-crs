<template>
  <v-container style="background-color: ">
    <v-row>
      <v-col cols="11">
        <h1 style="color: white">
          {{ titulo }}
        </h1>
      </v-col>
      
      <v-col>
        <v-btn
          icon="mdi-plus"
          size="default"
          color="green"
          @click="criar"
        />
      </v-col>

      <v-col>
        <v-card theme="dark" elevation="0">
          <template #text>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            />
          </template>
          <v-data-table :search="search" :headers="headers" :items="items" theme="dark">
            <template #item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
              </v-icon>
  
              <v-icon size="small" @click="deleteItem(item)">
                mdi-delete 
              </v-icon>
            </template>
          </v-data-table>
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

  emits: ["excluir"],
  data() {
    return {
      dialog: false,
      search: ''
    };
  },

  data() {
    return {};
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
