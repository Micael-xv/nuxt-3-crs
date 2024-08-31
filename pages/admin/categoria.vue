<template>
  <v-container style="justify-content: center; border-radius: 25px">
    <v-row>
      <v-col>
        <TabelaComponent
          elevation="20"
          :headers="headers"
          titulo="Categorias"
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
        title="Adicionar categorias"
        theme="dark"
        width="530px"
        height="280px"
      >
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="15">
                  <v-text-field
                    v-model="categories.name"
                    label="Categoria"
                    enable
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            rounded="xl"
            class="mr-3 mb-3"
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
definePageMeta({
  layout: "admin",
});
export default {
  name: "TabelaCategoria",
  data() {
    return {
      model: "model",
      dialog: false,
      loading: true,
      categories: {
        id: null,
        name: null,
      },
      headers: [
        {
          title: "Identificação",
          key: "id",
        },
        {
          title: "Categoria",
          key: "name",
        },
        {
          title: "Actions",
          key: "actions",
          sortable: false,
        },
      ],
      items: [],
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
    this.userToken = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:3333/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('Resposta da API:', response.data);
        if (response.data) {
          const user = response.data;
          this.user.name = user.name;
          this.user.service = user.role;
        } else {
          this.router.push("/error");
        }
      } catch (error) {
        this.router.push("/error"); // Se houver um erro ao obter o perfil, deslogue o usuário
      }
    }
  },
  methods: {
    resetElemento() {
      (this.categories = {
        id: null,
        name: null,
      }),
        (this.ativo = false);
    },

    async getItens() {
      const response = await this.$api.get("/categories");
      this.items = response.data.map((element) => element);
      this.loading = false;
    },
    async deleteItem(items) {
      if (confirm(`Deseja deletar o registro com id ${items.id}`)) {
        const response = await this.$api.post("/categories/destroy", {
          id: items.id,
        });
        if (response.type == "error") {
          this.$toast.error(response.message);
        } else {
          this.$toast.success("Dados deletados com sucesso");
        }
      }
      await this.getItems();
    },
    editItem(item) {
      this.categories = { ...item };
      this.dialog = true;
    },
    async persist() {
      let response; // Declare a variable to store the response
      if (!this.categories.name) {
        useNuxtApp().$toast.error('Preencha o campo "Categoria"');
      } else if (this.categories.id) {
        // Se o produto já tem um ID, então é uma edição
        response = await this.$api.post(`/categories/persist/${this.categories.id}`,this.categories);
        if (response.type === "success") {
          useNuxtApp().$toast.success("Dados editado com sucesso");
        }
      } else {
        // Caso contrário, é uma criação de novo produto
        useNuxtApp().$toast.success("Dados criados com sucesso");
        response = await this.$api.post("/categories/persist", this.categories);
      }
      // Aqui, você deve verificar a resposta antes de continuar
      if (response && response.type === "error") {
        useNuxtApp().$toast.warning("Você não tem permissão para realizar essa ação.");
      } else {
        // Se a operação foi bem-sucedida, você deve redefinir o estado e atualizar a tabela
        this.dialog = false;
        this.resetElemento();
        await this.getItems();
      }
    },
    async getItems() {
      const response = await this.$api.get("/categories");
      this.items = response.data;
      this.loading = false;
    },
    resetDialog() {
      this.dialog = false;
      this.categories = {
        id: null,
        name: null,
      };
    },
  },
};
</script>
