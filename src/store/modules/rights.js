import { getAllRights } from "@/api"

const state = {
    allRightsList: [],  //list of all rights
    userRights: []      //list of user's rights
}

const getters = {
    getAllRightsList(state) {
        return state.allRightsList
    },
    getUserRights(state) {
        return state.userRights
    }
}

const mutations = {
    setAllRightsList(state, rightsList) {
        state.allRightsList = rightsList
    },
    setUserRights(state, userRights) {
        state.userRights = userRights
    }
}

const actions = {
    setAllRightsList({getters, commit}) {
        return new Promise((resolve, reject) => {
            if (getters['getAllRightsList'].length == 0) {
                getAllRights()
                .then(res => {
                    commit('setAllRightsList', res.data.rightsMasterList)
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