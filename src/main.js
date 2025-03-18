import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'


import PrimeApp from "@/PrimeApp.vue";
import PrimeVue from 'primevue/config';
import aura from "@primeuix/themes/aura"
import 'primeicons/primeicons.css';




//const app = createApp(App).mount('#app')
const app = createApp(PrimeApp)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: aura,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    }
});
app.mount('#app')