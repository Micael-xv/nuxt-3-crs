import { createApp } from 'vue';
import App from './App.vue';
import { MaskInput } from 'vue-3-mask';

const app = createApp(App);

app.component('MaskInput', MaskInput);

app.mount('#app');