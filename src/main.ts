// Packages
import { createApp } from 'vue';
// Component
import App from './App.vue';
// Router
import { router } from './router';
// Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';
// PrimeVue
import PrimeVue from 'primevue/config';
// styles
import './style.css';

// Create App
const app = createApp(App);

// Use
// Router
app.use(router);
//Vuetify
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})
app.use(vuetify);
// PrimeVue
app.use(PrimeVue);

// Mount
app.mount('#app');
