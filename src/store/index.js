import { createStore } from 'vuex'

import users from './modules/users.js'
import rights from './modules/rights.js'
import clients from './modules/clients'
import tasks from './modules/tasks.js'
import myTasks from './modules/myTasks.js'
import roles from './modules/roles.js'

export default createStore({
  state: {
    message: {
      display: false,
      msg: '',
      title: '',
      bgcolor: '',
    }
  },
  getters: {
    getMessageVisiblity(state) {
      return state.message.display
    },
    getMessageData(state) {
      return {
        msg: state.message.msg,
        title: state.message.title,
        bgcolor: state.message.bgcolor
      }
    }
  },
  mutations: {
    showMessage(state, {msg, title, bgcolor}) {
      state.message.display = true
      state.message.msg = msg
      state.message.title = title
      state.message.bgcolor = bgcolor
    },
    hideMessage(state) {
      state.message.display = false
      state.message.title = ''
      state.message.msg = ''
      state.message.bgcolor = ''
    }
  },
  actions: {      
    promptMessage(context, {msg, title, bgcolor}) {
      new Promise((resolve) => {
        context.commit('showMessage', {msg, title, bgcolor})
        setTimeout(()=>{
          resolve()
        }, 5000)
      })
      .then(() => {
        context.commit('hideMessage')
      })
    }
  },
  modules: {
    users,
    rights,
    clients,
    tasks,
    myTasks,
    roles
  }
})
