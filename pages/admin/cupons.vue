<template>
  <v-container style="justify-content: center; border-radius: 25px">
    <v-row>
      <v-col>
        <TabelaComponent
          elevation="20"
          :headers="headers"
          titulo="Cupons"
          :items="items"
          @criar="dialog = true"
          @excluir="deleteItem"
          @editar="editItem"
          @persist="persist"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="auto" @click:outside="resetDialog">
      <v-card theme="dark" width="700px" height="auto">
        <v-card-title>
          <v-row justify="space-between" align="center">
            <v-col cols="auto"> Adicionar cupons </v-col>
            <v-col cols="auto">
              <v-btn
                density="comfortable"
                icon="mdi-plus"
                style="background-color: crimson"
                @click="resetDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="persist">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="cupoms.code" label="Código" required />
                </v-col>
                <v-col cols="12" sm="6">
                  <!-- <v-text-field v-model="cupoms.type" label="Tipo" required /> -->
                  <v-autocomplete
                    v-model="cupoms.type"
                    clearable
                    chips
                    label="Tipo"
                    :items="['percent', 'fixed']"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="cupoms.value" prefix="R$" label="Valor" required />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="cupoms.uses" label="Quantidade de uso" required />
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
            @click="persist"
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
  name: "Cupons",
  data() {
    return {
      dialog: false,
      cupoms: {
        id: null,
        code: null,
        type: null,
        value: null,
        uses: null,
      },
      headers: [
        { title: "Identificação", key: "id" },
        { title: "Código", key: "code" },
        { title: "Tipo", key: "type" },
        { title: "Valor", key: "value" },
        { title: "Usos", key: "uses" },
        { title: "Actions", key: "actions", sortable: false },
      ],
      items: [],
    };
  },
  async created() {
    this.userToken = localStorage.getItem("token");
    await this.getItems();
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
        this.router.push("/error"); 
      }
    }
  },

  methods: {
    async getItems() {
      try {
        const response = await this.$api.get("/cupoms");
        this.items = response.data;
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error.message);
        this.$toast.error(
          "Erro ao buscar pedidos. Por favor, tente novamente mais tarde."
        );
      }
    },
    
    async deleteItem(item) {
      try {
        if (confirm(`Deseja deletar o registro com id ${item.id}`)) {
          const response = await this.$api.post("/cupoms/destroy", { id: item.id });
          if (response && response.type !== "error") {
            this.$toast.success("Cupom excluído com sucesso.");
            await this.getItems();
          } else {
            throw new Error(response.message || "Erro ao excluir cupom.");
          }
        }
      } catch (error) {
        console.error("Erro ao excluir cupom:", error.message);
        this.$toast.error(
          error.message ||
            "Erro ao excluir cupom. Por favor, tente novamente mais tarde."
        );
      }
    },
    async persist() {
      try {
        if (!this.cupoms.code || !this.cupoms.type || !this.cupoms.value || !this.cupoms.uses) {
          throw new Error("Todos os campos são obrigatórios.");
        }
        let response;
        if (this.cupoms.id) {
          response = await this.$api.post(`/cupoms/persist/${this.cupoms.id}`, this.cupoms);
          this.$toast.success("Cupom editado com sucesso.");
        } else {
          response = await this.$api.post("/cupoms/persist", this.cupoms);
          this.$toast.success("Cupom criado com sucesso.");
        }
        this.dialog = false;
        this.cupoms = {
          id: null,
          code: null,
          type: null,
          value: null,
          uses: null,
        };
        await this.getItems();
      } catch (error) {
        // console.error("Erro ao persistir cupom:", error.message);
        this.$toast.error(
          "Erro ao salvar cupom. Por favor, verifique os campos e tente novamente."
        );
      }
    },

    editItem(item) {
      this.cupoms = { ...item };
      this.dialog = true;
    },

    resetDialog() {
      this.dialog = false;
      this.cupoms = {
        id: null,
        code: null,
        type: null,
        value: null,
        uses: null,
      };
    },
  },
};
</script>
