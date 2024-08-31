<template>
  <v-container style="justify-content: center; border-radius: 25px">
    <v-row>
      <v-col>
        <TabelaComponent
          elevation="20"
          :headers="headers"
          titulo="Pedidos"
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
        title="Adicionar pedidos"
        theme="dark"
        width="700px"
        height="auto"
      >
        <v-card-text>
          <v-form @submit.prevent="persist">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="orders.status"
                    label="Status"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="orders.total" label="Total" required />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="orders.totalDiscount"
                    label="Total com desconto"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="orders.idUserCostumer"
                    clearable
                    :items="idUserCostumer"
                    item-title="username"
                    item-value="id"
                    label="Cliente"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="orders.idUserDeliver"
                    clearable
                    :items="idUserDeliver"
                    item-title="username"
                    item-value="id"
                    label="Entregador"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="orders.idAdress"
                    clearable
                    :items="idAdress"
                    item-title="street"
                    item-value="id"
                    label="Endereço"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="orders.idPayment"
                    clearable
                    :items="idPayment"
                    item-title="name"
                    item-value="id"
                    label="Pagamento"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="orders.idCupom"
                    clearable
                    :items="idCupom"
                    item-title="code"
                    item-value="id"
                    label="Cupom"
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
  name: "Pedidos",
  data() {
    return {
      dialog: false,
      orders: {
        id: null,
        status: null,
        total: null,
        totalDiscount: null,
        idUserCostumer: null,
        idUserDeliver: null,
        idAdress: null,
        idPayment: null,
        idCupom: null,
      },
      headers: [
        {
          title: "Identificação",
          key: "id",
        },
        {
          title: "Status",
          key: "status",
        },
        {
          title: "Total",
          key: "total",
        },
        {
          title: "Total com desconto",
          key: "totalDiscount",
        },
        {
          title: "usuário cliente",
          key: "idUserCostumer",
        },
        {
          title: "usuário entregador",
          key: "idUserDeliver",
        },
        {
          title: "endereço",
          key: "idAdress",
        },
        {
          title: "pagamento",
          key: "idPayment",
        },
        {
          title: "cupom",
          key: "idCupom",
        },
        {
          title: "Actions",
          key: "actions",
          sortable: false,
        },
      ],
      items: [],
      idUserCostumer: [],
      idUserDeliver: [],
      idAdress: [],
      idPayment: [],
      idCupom: [],
    };
  },
  async created() {
    await this.getItems();
    await this.getidUserCostumer();
    await this.getidUserDeliver();
    await this.getidAdress();
    await this.getidPayment();
    await this.getidCupom();
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
    async getItems() {
      try {
        const response = await this.$api.get("/orders");
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
          const response = await this.$api.post("/orders/destroy", {
            id: item.id,
          });
          await this.getItems();
          if (response && response.type !== "error") {
            this.$toast.success("Pedido excluído com sucesso.");
          } else {
            throw new Error(response.message || "Erro ao excluir pedido.");
          }
        }
      } catch (error) {
        console.error("Erro ao excluir pedido:", error.message);
        this.$toast.error(
          error.message ||
            "Erro ao excluir pedido. Por favor, tente novamente mais tarde."
        );
      }
    },

    editItem(item) {
      this.orders = { ...item };
      this.dialog = true;
    },
    async persist() {
      try {
        if (
          !this.orders.status ||
          !this.orders.total ||
          !this.orders.totalDiscount ||
          !this.orders.idUserCostumer ||
          !this.orders.idUserDeliver ||
          !this.orders.idAdress ||
          !this.orders.idPayment
        ) {
          throw new Error("Todos os campos são obrigatórios.");
        }
        let response;
        if (this.orders.id) {
          response = await this.$api.post(`/orders/persist/${this.orders.id}`,this.orders);
          if (response.type == "success") {
            this.$toast.success("Pedido editado com sucesso.");
          } else {
            throw new Error(response.message || "Erro ao editar pedido.");
          }
        } else {
          response = await this.$api.post("/orders/persist", this.orders);
          this.$toast.success("Pedido criado com sucesso.");
        }
        this.dialog = false;
        this.orders = {
          id: null,
          status: null,
          total: null,
          totalDiscount: null,
          idUserCostumer: null,
          idUserDeliver: null,
          idAdress: null,
          idPayment: null,
          idCupom: null,
        };
        await this.getItems();
      } catch (error) {
        console.error("Erro ao persistir pedido:", error.message);
        this.$toast.error(
          "Erro ao salvar pedido. Por favor, verifique os campos e tente novamente."
        );
      }
    },
    async getidUserCostumer() {
      try {
        const response = await this.$api.get("/users");
        this.idUserCostumer = response.data;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
        this.$toast.error(
          "Erro ao buscar usuários. Por favor, tente novamente mais tarde."
        );
      }
    },
    async getidUserDeliver() {
      try {
        const response = await this.$api.get("/users");
        this.idUserDeliver = response.data;
      } catch (error) {
        console.error("Erro ao buscar entrega:", error.message);
        this.$toast.error(
          "Erro ao buscar entrega. Por favor, tente novamente mais tarde."
        );
      }
    },
    async getidAdress() {
      try {
        const response = await this.$api.get("/adresses");
        this.idAdress = response.data;
      } catch (error) {
        console.error("Erro ao buscar endereço:", error.message);
        this.$toast.error(
          "Erro ao buscar endereço. Por favor, tente novamente mais tarde."
        );
      }
    },
    async getidPayment() {
      try {
        const response = await this.$api.get("/payments");
        this.idPayment = response.data;
      } catch (error) {
        console.error("Erro ao buscar pagamento:", error.message);
        this.$toast.error(
          "Erro ao buscar pagamento. Por favor, tente novamente mais tarde."
        );
      }
    },
    async getidCupom() {
      try {
        const response = await this.$api.get("/cupoms");
        this.idCupom = response.data;
      } catch (error) {
        console.error("Erro ao buscar cupom:", error.message);
        this.$toast.error(
          "Erro ao buscar cupom. Por favor, tente novamente mais tarde."
        );
      }
    },
    resetDialog() {
      this.dialog = false;
      this.orders = {
        id: null,
        status: null,
        total: null,
        totalDiscount: null,
        idUserCostumer: null,
        idUserDeliver: null,
        idAdress: null,
        idPayment: null,
        idCupom: null,
      };
    },
  },
};
</script>
