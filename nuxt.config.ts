const temaCustomizado = {
  dark: true,
  colors: {
    background: '#660000',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["vuetify-nuxt-module", '@nuxt/eslint'],
  plugins: ['~/plugins/axios.js', '~/plugins/mask.js'],

  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: 'temaCustomizado',
        themes: {
          temaCustomizado,
        },
      },
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true || false,
      useIconCDN: true || false,

      /* vite-plugin-vuetify options */
      styles: true || 'none' || 'expose' || 'sass' || { configFile: String },
      autoImport: true || false,
      useVuetifyLabs: true || false,
    },
  },

  compatibilityDate: '2024-08-19',
})