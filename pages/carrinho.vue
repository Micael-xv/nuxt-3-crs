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
          lg="5"
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
                <v-card-subtitle
                  ><strong
                    >Total: R${{ calculateItemTotal(item).toFixed(2) }}</strong
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

        <!-- Card com o Total da Compra -->
        <v-col cols="12" md="4" class="d-flex justify-end">
          <v-card
            style="
              width: 18%;
              height: 15%;
              position: fixed;
              right: 2%;
              top: 19%;
            "
          >
            <v-card-title><strong>Total da Compra</strong></v-card-title>
            <v-card-subtitle>Itens: {{ cart.length }}</v-card-subtitle>
            <v-card-subtitle
              ><strong>Total: R${{ totalPrice }}</strong></v-card-subtitle
            >
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
            <v-text-field
              v-model="selectedCupom"
              label="Cupom"
              clearable
              hint="Insira o código do cupom"
            />
            <p v-if="cupomError" style="color: red">{{ cupomError }}</p>
            <!-- Exibe erro de cupom -->
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
import axios from "axios"; // Importa axios

export default {
  data() {
    return {
      cart: [],
      dialog: false,
      editIndex: null,
      editQuantity: 1,
      selectedCupom: null,
      cupomError: null, // Variável para armazenar erros de cupom
      user: {
        name: "",
        email: "",
        role: "",
      },
    };
  },
  computed: {
    totalPrice() {
      // Calcula o total do carrinho
      return (this.cart || [])
        .reduce((total, item) => {
          let itemTotal = (item.price || 0) * (item.quantity || 0);

          if (item.cupom && !isNaN(item.cupom.discount) && item.cupom.discount > 0) {
            const discountPercentage = parseFloat(item.cupom.discount);
            itemTotal -= itemTotal * (discountPercentage / 100);
          }

          return total + itemTotal;
        }, 0)
        .toFixed(2);
    },
  },
  async created() {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`http://localhost:3333/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        const user = response.data;
        this.user.name = user.name;
        this.user.email = user.email;
        this.user.role = user.role;
      }
    }
  },
  mounted() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.cart = cart;
  },
  methods: {
    calculateItemTotal(item) {
    let total = (item.price || 0) * (item.quantity || 0);

    if (item.cupom) {
      const cupom = item.cupom;
      if (cupom.type === 'percent') {
        const discountPercentage = parseFloat(cupom.discount);
        total -= total * (discountPercentage / 100);
      } else if (cupom.type === 'fixed') {
        const discountValue = parseFloat(cupom.discount);
        total -= discountValue;
      }
    }
    return Math.max(total, 0);
  },
    deleteItem(index) {
      if (confirm(`Deseja realmente remover este item do carrinho?`)) {
        this.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    editItem(index) {
      this.editIndex = index;
      this.editQuantity = this.cart[index].quantity;
      this.selectedCupom = this.cart[index].cupom
        ? this.cart[index].cupom.code
        : null;
      this.dialog = true;
    },

    async saveEdit() {
      try {
        if (this.selectedCupom) {
          const response = await axios.post(
            "http://localhost:3333/cupoms/verify",
            {
              code: this.selectedCupom,
            }
          );
          if (response.data.message === "Cupom válido") {
            const cupom = response.data;
            this.cart[this.editIndex].quantity = this.editQuantity;
            this.cart[this.editIndex].cupom = {
              ...cupom,
              discount: parseFloat(cupom.discount),
            };
            localStorage.setItem("cart", JSON.stringify(this.cart));
            this.dialog = false;
            this.selectedCupom = null;
            this.cupomError = null;
          } else {
            this.cupomError = response.data.message;
          }
        } else {
          this.cart[this.editIndex].quantity = this.editQuantity;
          this.cart[this.editIndex].cupom = null; // Remove o cupom se não for fornecido
          localStorage.setItem("cart", JSON.stringify(this.cart));
          this.dialog = false;
          this.cupomError = null;
        }
        // Atualiza o total após salvar a edição
        this.cart = [...this.cart]; // Força a reatividade
      } catch (error) {
        console.error("Erro ao verificar o cupom:", error);
        this.cupomError = "Erro ao verificar o cupom. Tente novamente.";
      }
    },
  },
};
</script>
