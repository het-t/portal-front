import { createStore } from 'vuex'

export default createStore({
  state: {
    rights: [],
    persistant: false,
    message: {
      display: false,
      msg: '',
      title: '',
    }
  },
  getters: {
    getRights(state) {
      return state.rights
    },
    getMessageVisiblity(state) {
      return state.message.display
    },
    getMessageData(state) {
      return {
        msg: state.message.msg,
        title: state.message.title
      }
    }
  },
  mutations: {
    setRights(state, rights) {
      var r = []
      rights.forEach(o => {
        r.push(o.code_name)
      });
      console.log("mutaions setRights ", r)
      state.rights = r
    },
    showMessage(state, {msg, title}) {
      state.message.display = true
      state.message.msg = msg
      state.message.title = title
    },
    hideMessage(state) {
      state.message.display = false
      state.message.title = ''
      state.message.msg = ''
    }
  },
  actions: {      
    rights(context, rights) {
      console.log("actions rights ", rights)
      context.commit('setRights', rights)
      this.state.persistant = true
    },
    promptMessage(context, {msg, title}) {
      new Promise((resolve) => {
        context.commit('showMessage', {msg, title})
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
  }
})
