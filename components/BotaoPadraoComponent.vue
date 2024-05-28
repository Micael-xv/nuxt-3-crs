<template>
  <v-btn
    :text="text"
    @click="emitirEvento"
  />      
</template>

<script>
  export default {
    name: 'BotaoPadraoComponent', 

    props: {
      text: {
        type: String,
      },

      dialog: {
        type: Boolean,
      },
    },
    data() {
      return {

      };
    },

    methods: {
      emitirEvento(){
        this.$emit('clicouBotao')
      }
    },
  }
</script>