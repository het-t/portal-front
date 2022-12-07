import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import VueCookies from 'vue-cookies'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faListCheck, 
        faUserGroup, 
        faSun, 
        faWaveSquare, 
        faUserGear, 
        faAddressBook, 
        faEllipsisVertical, 
        faBars, 
        faPowerOff, 
        faUser, 
        faCirclePlus,
        faTrash,
        faPencil,
        faPlus,
        faMinus
    } from '@fortawesome/free-solid-svg-icons'


library.add(
    faUserGroup, 
    faListCheck, 
    faSun, 
    faWaveSquare, 
    faUserGear, 
    faAddressBook, 
    faEllipsisVertical, 
    faBars, 
    faPowerOff, 
    faUser, 
    faCirclePlus,
    faTrash,
    faPencil,
    faPlus,
    faMinus
)

let app = createApp(App)

app.use(VueCookies)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
