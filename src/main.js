import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import VueCookies from 'vue-cookies'

import { vue3Debounce } from 'vue-debounce'

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
        faMinus,
        faArrowUpAZ,
        faArrowDownAZ,
        faArrowUp19,
        faArrowDown19,
        faDollarSign,
        faSlash,
        faHand,
        faUserCheck
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
    faMinus,
    faArrowUpAZ,
    faArrowDownAZ,
    faArrowUp19,
    faArrowDown19,
    faDollarSign,
    faSlash,
    faHand,
    faUserCheck
)

let app = createApp(App)

app.use(VueCookies)
    .directive('debounce', vue3Debounce({ lock: true }))
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
