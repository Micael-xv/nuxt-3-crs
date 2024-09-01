<template>
  <div style="background-color: white; height: 100vh">
    <v-container>
      <h2 style="color: black" class="mb-6">Itens no Carrinho</h2>
      <v-row>
        <v-col
          v-for="(item, index) in cart"
          :key="index"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card style="max-width: 490px; max-height: 170px">
            <v-row>
              <v-col cols="4">
                <v-img
                  :src="item.image"
                  max-width="200px"
                  max-height="200px"
                  contain
                />
              </v-col>

              <v-col cols="8">
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle
                  >Quantidade: {{ item.quantity }}</v-card-subtitle
                >
                <v-card-subtitle>Preço: R${{ item.price }}</v-card-subtitle>
                <v-card-subtitle v-once
                  ><strong>
                    Total: R${{ item.price * item.quantity }}</strong
                  ></v-card-subtitle
                >

                <v-card-actions>
                  <v-btn
                    icon="mdi-pencil"
                    color="blue"
                    @click="editItem(index)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon="mdi-delete"
                    color="red"
                    @click="deleteItem(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Diálogo de Edição -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>Edição de Quantidade</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="editQuantity"
              label="Quantidade"
              type="number"
              :rules="[
                (value) => value >= 1 || 'A quantidade deve ser no mínimo 1',
              ]"
              min="1"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" @click="saveEdit">Salvar</v-btn>
            <v-btn @click="dialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      dialog: false,
      editIndex: null,
      editQuantity: 1,
    };
  },
  mounted() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.cart = cart;
  },

  async created() {
    const token = localStorage.getItem("token");
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
          this.user.email = user.email;
          this.user.service = user.role;
        } else {
          this.$toast.warning("Dados do usuário incompletos na resposta");
          this.logout();
        }
      } catch (error) {
        this.$toast.error("Erro ao buscar perfil do usuário:", error);
        this.logout();
      }
    }
  },

  methods: {
    deleteItem(index) {
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    editItem(index) {
      this.editIndex = index;
      this.editQuantity = this.cart[index].quantity;
      this.dialog = true;
    },
    saveEdit() {
      if (this.editQuantity >= 1) {
        this.cart[this.editIndex].quantity = this.editQuantity;
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.dialog = false;
      }
    },
  },
};
</script>
