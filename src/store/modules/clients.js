import { clients } from "@/api/index.js"

const state = {
    clientTypes: [],    //list of client's types
    clients: {},        //list of all data of visited pages of clients table
    clientsCount: '',
    clientsConfirmed: [],     //list of all clients
    sortBy: 'id',
    sortOrder: 0,    //0-desc, 1-asc
    currentPage: '',
    paginationKey: 0,
    clientCreatingStatus: 2
}

const getters = {
    getClientStatus(state) {
        return state.clientCreatingStatus
    },
    getAllTypesList(state) {
        return state.clientTypes
    },
    clientsListGet: (state) => (index, sortBy, sortOrder, filters) => {
        return state.clients[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}_${filters[4]}`]
    },
    clientsCountGet(state) {
        return state.clientsCount
    },
    clientsGetConfirmed(state) {
        return state.clientsConfirmed
    },
    sortGet(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    getKey(state) {
        return state.paginationKey
    },
    getCurrentPage(state) {
        return state.currentPage
    }
}

const mutations = {
    RESET_STATE(state) {
        state.clients = {}
        state.clientsCount = ''
        state.clientsConfirmed = []
    },
    setClientStatus(state, status) {
        state.clientCreatingStatus = status
    },
    deleteClient(state, {clientId, filters}) {
        const path = state.currentPage+'_'+state.sortBy+'_'+state.sortOrder+'_'+filters[0]+'_'+filters[1]+'_'+filters[2]+'_'+filters[3]+'_'+filters[4]
        state.clients[path].splice(state.clients[path].findIndex(client => client.id == clientId), 1)
    },
    setAllTypesList(state, typesList) {
        state.clientTypes = typesList
    },
    clientsCountSet(state, clientsCount) {
        state.clientsCount = clientsCount
    },
    clientsList(state, {index, sortBy, sortOrder, filters, data}) {
        Object.defineProperty(state.clients, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}_${filters[4]}`, {
            value: data,
            writable: true,
            enumerable: true,
        })
    },
    clientsConfirmed(state, clientsList) {
        state.clientsConfirmed = clientsList
    },
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    currentPageSet(state, {index}) {
        state.currentPage = index
    },
    refetch(state) {
        state.clientsCount = undefined
        state.clients = {}
        state.clientsConfirmed = []

        if (state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0
    },
    paginate(state) {
        if (state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0  
    },
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
    clientsGetConfirmed({commit, getters}) {
        return new Promise((resolve, reject) => {
            if (getters['clientsGetConfirmed']?.length == 0) {
                clients.get({
                    from: null,
                    recordsPerPage: null,
                    filters: ['', '', '', '', 1]
                })
                .then((res) => {
                    commit('clientsConfirmed', res?.data?.clientsList)
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