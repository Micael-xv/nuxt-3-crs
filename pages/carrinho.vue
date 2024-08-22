<template style="background-color: white; height: 100dvh">
  <v-container>
    <v-row>
      <v-col>
        <h2 style="color: black;">Itens no Carrinho</h2>
        <v-list>
          <v-list-item
          v-for="(item, index) in cart"
          :key="index"
          >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-row>
                <v-col>
                  <img
                    :src="item.image"
                    style="max-width: 200px; max-height: 200px"
                  >
                </v-col>
                <v-col>
                  <v-list-item-subtitle>
                    Quantidade: {{ item.quantity }} - Preço: R${{ item.price }}
                  </v-list-item-subtitle>
                  <h3>
                    Total: R${{ item.price * item.quantity }}
                  </h3>
                </v-col>
              </v-row>
              <br>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  mounted() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.cart = cart;
  },
};
</script>