<template>
  <body style="background-color: white; height: 100dvh">
    <v-row>
      <v-col v-for="(item, x) in items" :key="x" cols="12" md="4">
        <div>
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="ma-3"
              width="370"
              height="350"
              v-bind="props"
              elevation="2"
              style="border-radius: 25px"
              >
              <v-img
              v-if="item"
                class="mx-auto"
                :src="item.image"
                :aspect-ratio="4 / 4"
                max-width="200"
                max-height="240"
                cover
                >
                <v-expand-transition>
                  <div
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                    style="height: 100%;"
                  >
                    <div v-if="item">
                      <div
                        class="font-weight-light text-h6 mb-2"
                        style="justify-content: center"
                      >
                        {{ item.price }}
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-6">
                <h3
                  v-if="item"
                  class="text-h4 font-weight-light text-orange mb-2"
                >
                  {{ item.name }}
                </h3>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>
  </body>
</template>

<script>
export default {
  name: "Index",
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
