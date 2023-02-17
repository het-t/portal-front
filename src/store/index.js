import { Store } from 'vuex'
import { createStore } from 'vuex-extensions'

let state = {
  userType: ''
}

let getters = {
  getUserType(state) {
    return state.userType
  }
}

let mutations = {
  setUserType(state, value) {
    state.userType = value
  }
}

import users from './modules/users.js'
import rights from './modules/rights.js'
import clients from './modules/clients'
import tasks from './modules/tasks.js'
import myTasks from './modules/myTasks.js'
import roles from './modules/roles.js'
import activity from './modules/activity.js'
import images from './modules/images.js'

export default createStore(Store, {
  state,
  getters,
  mutations,
  modules: {
    users,
    rights,
    clients,
    tasks,
    myTasks,
    roles,
    activity,
    images
  }
})