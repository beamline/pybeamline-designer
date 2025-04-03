import './assets/main.css'
import { createApp } from 'vue'


import PrimeApp from "@/PrimeApp.vue";
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import aura from "@primeuix/themes/aura"
import 'primeicons/primeicons.css';
import '@vue-flow/core/dist/style.css'
import AnimateOnScroll from 'primevue/animateonscroll';






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
app.directive('tooltip', Tooltip);
app.directive('animateonscroll', AnimateOnScroll);
app.mount('#app')