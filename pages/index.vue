<template>
  <div>
    <v-row>
      <v-col class="ml-6">
        <v-card-text>
          <v-text-field
            v-model="search"
            max-width="350"
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Pesquise por produtos..."
            variant="solo"
            rounded
            hide-details
            single-line
            @click:append-inner="onClick"
          />
        </v-card-text>
      </v-col>
    </v-row>
    <body style="background-color: white; height: 100dvh">
      <v-container>
        <v-row>
          <v-col v-for="(item, x) in filteredItems" :key="x" cols="12" md="4">
            <div>
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  class=""
                  width="370"
                  height="450"
                  v-bind="props"
                  elevation="3"
                  style="border-radius: 25px"
                >
                  <v-img
                    v-if="item"
                    :src="item.image"
                    :aspect-ratio="12 / 7"
                    style="max-width: 100%; max-height: 100%"
                    contain
                  >
                    <v-expand-transition>
                      <div
                        v-if="isHovering"
                        class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                        style="height: 100%"
                      >
                        <div v-if="item">
                          <div
                            class="font-weight-light text-h6 mb-2"
                            style="justify-content: center"
                          >
                            ${{ item.price }}
                          </div>
                        </div>
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="pt-6">
                    <v-btn
                      rounded="xl"
                      prepend-icon="mdi-cart-outline"
                      variant="outlined"
                      @click="openDialog(item)"
                    >
                      Comprar
                    </v-btn>
                    <h3
                      v-if="item"
                      class="text-h4 font-weight-light text-orange mb-2"
                    >
                      {{ item.name }}
                    </h3>
                    <div class="font-weight-light mb-2">
                      <p>
                        {{ item.description }}
                      </p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title
              >Quantidade para comprar: {{ selectedProduct.name }}</v-card-title
            >
            <v-card-text>
              <v-text-field v-model="quantity" label="Quantidade" type="number"
            /></v-card-text>
            <v-card-actions>
              <v-btn variant="tonal" color="green" @click="buyProduct"
                >Comprar</v-btn
              >
              <v-btn variant="tonal" text @click="dialog = false"
                >Cancelar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row>
          <v-col>
            <v-footer class="text-center d-flex flex-column">
              <div>
                <v-btn
                  icon="mdi-facebook"
                  href="https://www.facebook.com/"
                  target="_blank"
                  class="mx-4"
                  variant="text"
                />
                <v-btn
                  icon="mdi-github"
                  href="https://github.com/"
                  target="_blank"
                  class="mx-4"
                  variant="text"
                />
                <v-btn
                  icon="mdi-twitter"
                  href="https://www.x.com/"
                  target="_blank"
                  class="mx-4"
                  variant="text"
                />
                <v-btn
                  icon="mdi-instagram"
                  href="https://www.instagram.com/"
                  target="_blank"
                  class="mx-4"
                  variant="text"
                />
                <v-btn
                  icon="mdi-linkedin"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  class="mx-4"
                  variant="text"
                />
              </div>

              <div class="pt-0">
                Seja para a sua lista de compras diárias ou para aqueles itens
                especiais que você deseja encontrar, o nosso mercado tem de
                tudo! De produtos frescos e orgânicos a eletrônicos de última
                geração, e de produtos de cuidados pessoais a utensílios
                domésticos, nós temos tudo o que você precisa em um só lugar.
                Com uma ampla variedade de marcas e preços competitivos, estamos
                aqui para atender a todas as suas necessidades de compras.
                Visite-nos e descubra a conveniência de encontrar tudo o que
                procura em um único destino!
              </div>
              <v-divider />
              <div>
                {{ new Date().getFullYear() }} — <strong>CRSTORE</strong>
              </div>
            </v-footer>
          </v-col>
        </v-row>
      </v-container>
    </body>
  </div>
</template>

<script>
export default {
  name: "Inicial",
  data() {
    return {
      search: "",
      dialog: false,
      selectedProduct: null,
      items: [],
      quantity: 1,
      loaded: false,
      loading: false,
    };
  },
  computed: {
    filteredItems() {
      // Filtra os itens com base na pesquisa
      return this.items.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  created() {
    this.getItensAPI();
  },
  methods: {
    async getItensAPI() {
      try {
        const response = await this.$api.get("/products");
        this.items = response.data;
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    },
    openDialog(item) {
      this.selectedProduct = item;
      this.dialog = true;
    },
    buyProduct() {
      console.log("Comprar:",this.selectedProduct.name,"Quantidade:",this.quantity);
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.selectedProduct = null;
      this.quantity = 1;
    },
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
