import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import VueCookies from 'vue-cookies'
import {createMetaManager} from 'vue-meta'

import Toaster from "@meforma/vue-toaster";

import { vue3Debounce } from 'vue-debounce'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faListCheck, 
        faCheck,
        faHandHoldingDollar,
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
        faUserCheck,
        faSave,
        faGear,
        faArrowUpRightFromSquare,
        faClipboardList,
        faHashtag,
        faIndustry,
        faUserTie,
        faEnvelope,
        faPhone,
        faIndianRupee,
        faXmark,
        faGreaterThan,
        faLessThan,
        faCaretDown,
        faBookmark as faBookmarkSolid,
        faCrosshairs,
    } from '@fortawesome/free-solid-svg-icons'

import {
    faThumbsUp,
    faThumbsDown,
    faPaperPlane,
    faBookmark
} from '@fortawesome/free-regular-svg-icons'

library.add(
    faXmark,
    faUserTie,
    faEnvelope,
    faPhone,
    faIndustry,
    faHashtag,
    faCheck,
    faHandHoldingDollar,
    faGear,
    faSave,
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
    faUserCheck,
    faArrowUpRightFromSquare,
    faThumbsUp,
    faThumbsDown,
    faPaperPlane,
    faClipboardList,
    faIndianRupee,
    faGreaterThan,
    faLessThan,
    faCaretDown,
    faBookmark,
    faBookmarkSolid,
    faCrosshairs
)

let app = createApp(App)

app
.use(Toaster, {
    position: 'top-right'
})
.provide('toast', app.config.globalProperties.$toast)

app.use(VueCookies)
    .use(createMetaManager(
        false,
        {meta: {tag: 'meta', nameless: true}}
    ))
    .directive('debounce', vue3Debounce({ lock: true }))
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
