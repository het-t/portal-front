import { rights } from "@/api"

let state = {
    list: [],  //list of all rights
    userRights: [],      //list of user's rights
}

const getters = {
    getList(state) {
        return state.list
    },
    getUserRights(state) {
        return state.userRights
    },
    getComponenetsVisibility(state) {
        if (state.userRights?.length) return true
        return false
    }
}

const mutations = {
    setList(state, list) {
        state.list = list
    },
    setUserRights(state, userRights) {
        state.userRights = userRights
    }
}

const actions = {
    fetchList({getters, commit}) {
        return new Promise((resolve, reject) => {
            if (!getters['getList']?.length) {
                rights.getList()
                .then(res => {
                    commit('setList', res.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
            else resolve()
        })
    }
}

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
}