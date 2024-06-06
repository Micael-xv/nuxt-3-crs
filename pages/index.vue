<template>
  <body style="background-color: white; height: 100dvh">
    <v-row>
      <v-col v-for="(item, x) in items" :key="x" cols="12" md="4">
        <div>
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="ma-3 ml-12"
              width="370"
              height="380"
              v-bind="props"
              elevation="2"
              style="border-radius: 25px"
            >
              <v-img
                v-if="item"
                class="mx-auto"
                :src="item.image"
                :aspect-ratio="4 / 4"
                max-width="210"
                max-height="210"
                cover
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
                <v-btn prepend-icon="mdi-cart-outline" variant="outlined" >Comprar</v-btn>
                <h3
                  v-if="item"
                  class="text-h4 font-weight-light text-orange mb-2"
                >
                  {{ item.name }}
                  </h3>
                  <div class="font-weight-light text-h6 mb-2">
                    {{ item.description }}
                    </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
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
          </div>
    
          <div class="pt-0">
            Seja para a sua lista de compras diárias ou para aqueles itens especiais
            que você deseja encontrar, o nosso mercado tem de tudo! De produtos
            frescos e orgânicos a eletrônicos de última geração, e de produtos de
            cuidados pessoais a utensílios domésticos, nós temos tudo o que você
            precisa em um só lugar. Com uma ampla variedade de marcas e preços
            competitivos, estamos aqui para atender a todas as suas necessidades de
            compras. Visite-nos e descubra a conveniência de encontrar tudo o que
            procura em um único destino!
          </div>
          <v-divider />
    
          <div>{{ new Date().getFullYear() }} — <strong>CRSTORE</strong></div>
        </v-footer>
      </v-col>
    </v-row>
  </body>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async created() {
    await this.getItensAPI();
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
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
