// Packages
import { createApp } from 'vue';
// Component
import App from './App.vue';
// Router
import { router } from './router';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Create App
const app = createApp(App);

// Use
// Router
app.use(router);
//Vuetify
const vuetify = createVuetify({
    components,
    directives,
})
app.use(vuetify);

// Mount
app.mount('#app');
