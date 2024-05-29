<template>
  <v-container style="justify-content: center; border-radius: 25px">
    <v-row>
      <v-col>
        <TabelaComponent
          sytle="elevation-20"
          :headers="headers"
          titulo="Produtos cadastrados"
          :items="items"
          @criar="dialog = true"
          @excluir="deleteItem"
          @editar="editItem"
          @persist="persist"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="auto" @click:outside="resetDialog">
      <v-card
        title="Inserir produtos"
        theme="dark"
        width="600px"
        height="620px"
      >
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="15">
                  <v-text-field
                    v-model="products.name"
                    label="Nome do produto"
                    enable
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="products.idCategory"
                    :items="categories"
                    item-title="name"
                    item-value="id"
                    label="Categoria"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="products.price"
                    label="Preço"
                  />
                </v-col>
                <v-col cols="12" sm="15">
                  <v-text-field
                    v-model="products.description"
                    label="Descrição"
                  />
                </v-col>
                <v-col>
                  <img
                    :src="products.image"
                    style="max-width: 230px; max-height: 230px"
                  >
                </v-col>

                <v-col cols="8" sm="6">
                  <v-text-field v-model="products.image" label="Imagem" />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            style="background-color: crimson; justify-content: end"
            text="Salvar"
            @click="persist()"
          />
        </v-card-actions>
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
    await this.getCategoria();
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
      let response; // Declare a variable to store the response
      if (this.products.id) {
        // Se o produto já tem um ID, então é uma edição
        response = await this.$api.post(
          `/products/persist${this.products.id}`,
          this.products
        );
      } else {
        // Caso contrário, é uma criação de novo produto
        response = await this.$api.post("/products/persist", this.products);
      }
      // Aqui, você deve verificar a resposta antes de continuar
      if (response.type === "error") {
        alert(response.message);
      } else {
        // Se a operação foi bem-sucedida, você deve redefinir o estado e atualizar a tabela
        this.dialog = false;
        this.resetElemento();
        await this.getItems();
      }
    },
    async getCategoria() {
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
