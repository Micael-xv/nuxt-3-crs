<template>
  <v-container style="justify-content: center; border-radius: 25px">
    <v-row>
      <v-col>
        <TabelaComponent
          :headers="headers"
          titulo="Produtos"
          :items="items"
          @criar="dialog = true"
          @excluir="deleteItem"
          @editar="editItem"
          @persist="persist"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="auto" @click:outside="resetDialog">
      <v-card title="Colocar " theme="dark" width="600px" height="600px">
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="products.name"
                  label="Nome do produto"
                  enable
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-model="products.description"
                  label="Descrição"
                />
              </v-col>

              <v-col cols="12" sm="15">
                <v-text-field v-model="products.image" label="Imagem" />
              </v-col>

              <v-col>
                <v-autocomplete
                  v-model="products.idCategory"
                  :items="categories"
                  item-title="Category"
                  item-value="id"
                />
                <v-col>
                  <v-btn
                    class="ms-auto justify-center d-flex align-center"
                    style="background-color: crimson"
                    text="Salvar"
                    @click="persist()"
                  />
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      model: "model",
      dialog: false,
      loading: true,
      products: {
        id: null,
        name: null,
        price: null,
        description: null,
        image: null,
        idCategory: null,
      },
      headers: [
        {
          title: "Identificação",
          key: "id",
        },
        {
          title: "Nome do produto",
          key: "name",
        },
        {
          title: "Preço",
          key: "price",
        },
        {
          title: "Descrição",
          key: "description",
        },
        {
          title: "Actions",
          key: "actions",
          sortable: false,
        },
      ],
      items: [],
      categories: [],
    };
  },
  watch: {
    ativo(valor) {
      if (valor == false) {
        this.resetElemento();
      }
    },
  },
  async created() {
    await this.getItens();
    await this.getUsuario();
  },
  methods: {
    resetElemento() {
      (this.products = {
        id: null,
        name: null,
        price: null,
        description: null,
        image: null,
        idCategory: null,
      }),
        (this.ativo = false);
    },

    async getItens() {
      const response = await this.$api.get("/products");
      this.items = response.data.map((element) => element);
      this.loading = false;
    },
    async deleteItem(items) {
      if (confirm(`Deseja deletar o registro com id ${items.id}`)) {
        const response = await this.$api.post("/products/destroy", {
          id: items.id,
        });
        if (response.type == "error") {
          alert(response.message);
        }
      }
      await this.getItems();
    },
    editItem(item) {
      this.products = { ...item };
      this.dialog = true;
    },
    async persist() {
      if (this.products.id) {
        const response = await this.$api.post(
          `/products/persist/${this.products.id}`,
          this.products
        );
      } else {
        const response = await this.$api.post(
          "/products/persist",
          this.products
        );
      }
      this.resetElemento();
      await this.getItems();
    },
    async getUsuario() {
      const response = await this.$api.get("/categories");
      this.categories = response.data;
      this.loading = false;
    },
    async getItems() {
      const response = await this.$api.get("/products");
      this.items = response.data;
      this.loading = false;
    },
    resetDialog() {
      this.dialog = false;
      this.products = {
        id: null,
        name: null,
        price: null,
        description: null,
        image: null,
        idCategory: null,
      };
    },
  },
};
</script>
