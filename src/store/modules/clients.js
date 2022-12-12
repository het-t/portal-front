import { clients } from "@/api/index.js"

const state = {
    clientTypes: [],    //list of client's types
    clients: {},        //list of all data of visited pages of clients table
    clientsCount: '',
    allClients: [],     //list of all clients
    sortBy: 'id',
    sortOrder: 0    //0-desc, 1-asc
}

const getters = {
    getAllTypesList(state) {
        return state.clientTypes
    },
    clientsListGet: (state) => (index, sortBy, sortOrder, filters) => {
        return state.clients[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}`]
    },
    clientsCountGet(state) {
        return state.clientsCount
    },
    allClients(state) {
        return state.allClients
    },
    sortGet(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    }
}

const mutations = {
    RESET_STATE(state) {
        state.clients = {}
        state.clientsCount = ''
        state.allClients = []
    },
    setAllTypesList(state, typesList) {
        state.clientTypes = typesList
    },
    clientsCountSet(state, clientsCount) {
        state.clientsCount = clientsCount
    },
    clientsList(state, {index, sortBy, sortOrder, filters, data}) {
        Object.defineProperty(state.clients, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}`, {
            value: data,
            writable: true,
            enumerable: true,
        })
    },
    clientsAll(state, clientsList) {
        state.allClients = clientsList
    },
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    }
}

const actions = {
    getTypes({commit, getters}) {
        return new Promise((resolve, reject) => {
            if (getters['getAllTypesList'] == '') {
                clients.getTypes()
                .then(res => {
                    commit('setAllTypesList', res?.data?.clientsMasterTypes)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
            else resolve()
        })
    },
    clientsAll({commit, getters}) {
        return new Promise((resolve, reject) => {
            if (getters['allClients'].length == 0) {
                clients.get({
                    from: null,
                    recordsPerPage: null,
                    filters: ['', '', '', '']
                })
                .then((res) => {
                    commit('clientsAll', res?.data?.clientsList)
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
    state,
    getters,
    actions,
    mutations
}