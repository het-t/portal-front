import { clients } from "@/api/index.js"

const state = {
    clientTypes: [],    //list of client's types
    clients: {},        //list of all data of visited pages of clients table
    clientsCount: '',
    allClients: [],     //list of all clients
}

const getters = {
    getAllTypesList(state) {
        return state.clientTypes
    },
    clientsListGet: (state) => (index) => {
        let res = state.clients[index]
        return res
    },
    clientsCountGet(state) {
        return state.clientsCount
    },
    allClients(state) {
        return state.allClients
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
    },
    clientsAll(state, clientsList) {
        state.allClients = clientsList
    }
}

const actions = {
    getTypes({commit, getters}) {
        //add else block to return value using getter
        if (getters['getAllTypesList'] == '') {
            clients.getTypes()
            .then(res => {
                commit('setAllTypesList', res?.data?.clientsMasterTypes)
            })
        }
    },
    clientsAll({commit, getters}) {
        if (getters['allClients'].length == 0) {
            clients.get({
                from: null,
                recordsPerPage: null,
            })
            .then((res) => {
                commit('clientsAll', res?.data?.clientsList)
            })
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}