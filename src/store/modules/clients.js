import { clients } from "@/api/index.js"

const state = {
    clientTypes: [],    //list of client's types
    clients: {},        //list of all data of clients 
    clientsCount: '',
}

const getters = {
    getAllTypesList(state) {
        return state.clientTypes
    },
    clientsListGet: (state) => (index) => {
        console.log("index in getters", index)
        let res = state.clients["1"]
        return res
    },
    clientsCountGet(state) {
        return state.clientsCount
    }
}

const mutations = {
    setAllTypesList(state, typesList) {
        state.clientTypes = typesList
    },
    clientsCountSet(state, clientsCount) {
        state.clientsCount = clientsCount
    },
    clientsList(state, {index, data}) {
        Object.defineProperty(state.clients, index, {
            value: data,
            writable: true,
            enumerable: true,
        })
    }
}

const actions = {
    getTypes({commit, getters}) {
        if (getters['getAllTypesList'] == '') {
            clients.getTypes()
            .then(res => {
                commit('setAllTypesList', res?.data?.clientsMasterTypes)
            })
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}