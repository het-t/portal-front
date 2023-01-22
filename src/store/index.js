import { Store } from 'vuex'
import { createStore } from 'vuex-extensions'

import users from './modules/users.js'
import rights from './modules/rights.js'
import clients from './modules/clients'
import tasks from './modules/tasks.js'
import myTasks from './modules/myTasks.js'
import roles from './modules/roles.js'
import activity from './modules/activity.js'

export default createStore(Store, {
  modules: {
    users,
    rights,
    clients,
    tasks,
    myTasks,
    roles,
    activity
  }})