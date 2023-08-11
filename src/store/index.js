import { Store } from 'vuex'
import { createStore } from 'vuex-extensions'

let state = {
  userType: '',
  firstName: '',
  lastName: '',
  id: ''
}

let getters = {
  getPersonalDetails(state) {
    return state
  }
}

let mutations = {
  setPersonalDetails(state, {firstName, lastName, id}) {
    state.firstName = firstName
    state.lastName = lastName
    state.id = id
  },
  setUserType(state, type) {
    state.userType = type
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
import chatInternal from './modules/chatInternal.js'
import tasksMaster from './modules/tasksMaster.js'
import workDiary from './modules/workDiary.js'
import tasksPayments from './modules/tasksPayments.js'
import tasksComments from './modules/tasksComments.js'

export default createStore(Store, {
  state,
  getters,
  mutations,
  modules: {
    users,
    rights,
    clients,
    tasksMaster,
    tasks,
    tasksPayments,
    workDiary,
    myTasks,
    roles,
    activity,
    images,
    chatInternal,
    tasksComments
  }
})