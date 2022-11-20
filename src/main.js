import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

let app = createApp(App)

app.use(VueCookies)
    .use(store)
    .use(router)
    .mount('#app')
