import { clients } from "@/api/index.js"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    types: [],    //list of client's types
    clients: {},        //list of all data of visited pages of clients table
    count: {},
    sortBy: 'id',
    sortOrder: 0,    //0-desc, 1-asc
    currentPage: 1,
    recordsPerPage: 50,
    filters: {
        name: '',
        type: '',
        ca: '',
        contact: '',
        tag: 1
    }
}

const getters = {
    //
    getTagFilter(state) {
        return state.filters.tag
    },
    //
    getTypes(state) {
        return state.types
    },
    //
    getList: (state) => ({from = null, to = null, sortBy = null, sortOrder = null, filters = Object.values(formatFilters(state.filters))}) => {
        if (from !== null && to !== null) {
            sortBy = state.sortBy
            sortOrder = state.sortOrder
        }
        return state.clients[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`]
    },
    //
    getCount(state) {
        return state.count[Object.values(formatFilters(state.filters)).join('_')]
    },
    //
    getSort(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    //
    getCurrentPage(state) {
        return state.currentPage
    },
    //
    getFilters(state) {
        return state.filters
    },
    //
    getRecordsPerPage(state) {
        return state.recordsPerPage
    }
}

const mutations = {
    //
    setTagFilter(state, status) {
        state.filters.tag = status
    },
    deleteClient(state, {clientId, filters}) {
        const path = state.currentPage+'_'+state.sortBy+'_'+state.sortOrder+'_'+filters[0]+'_'+filters[1]+'_'+filters[2]+'_'+filters[3]+'_'+filters[4]
        state.clients[path].splice(state.clients[path].findIndex(client => client.id == clientId), 1)
    },
    //
    setTypes(state, types) {
        state.types = types
    },
    //
    setCount(state, {count}) {
        state.count[Object.values(formatFilters(state.filters)).join('_')] = count
    },
    //
    setList(state, {from = null, to = null, sortBy = null, sortOrder = null, filters = ['null', 'null', 'null', 'null', 'null'], data}) {
        state.clients[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`] = data
    },
    //
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    //
    setCurrentPage(state, index) {
        state.currentPage = index
    },
    setRecordsPerPage(state, n) {
        state.recordsPerPage = n
    },
    //
    flush(state) {
        state.clients = {}
    }
}

const actions = {
    //
    fetchTypes({commit, getters}) {
        return new Promise((resolve, reject) => {
            if (!getters['getTypes']?.length) {
                clients.getTypes()
                .then(res => {
                    commit('setTypes', res.data)
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
            else resolve()
        })
    },
    //
    fetchList({commit, getters}, {force = false, all = false}) {
        return new Promise((resolve, reject) => {
            let {sortBy, sortOrder} = getters['getSort']
            const currentPage = getters['getCurrentPage']
            const recordsPerPage = getters['getRecordsPerPage']
    
            let from, to, formattedFilters
    
            if (all) {
                from = null
                to = null
                sortBy = null
                sortOrder = null
            }
    
            if (all) {
                from = null
                to = null
                sortBy = null
                sortOrder = null
                formattedFilters = formatFilters(state.filters)
            }
            else {
                formattedFilters = formatFilters(getters['getFilters'])
                from = (currentPage-1)*recordsPerPage
                to = from + recordsPerPage
            }
            
            if (!getters['getList']({from, to, sortBy, sortOrder, filters: Object.values(formattedFilters)})?.length || force === true) {
                clients.getList({
                    from,
                    recordsPerPage,
                    sortBy,
                    sortOrder,
                    filters: formattedFilters
                })
                .then((res) => {
                    if (all) {
                        commit('setList', {
                            data: res.data,
                            filters: Object.values(formattedFilters)
                        })
                    }
                    else {
                        commit('setList', {
                            data: res.data,
                            from,
                            to: from + recordsPerPage,
                            sortBy,
                            sortOrder,
                            filters: Object.values(formattedFilters)
                        })
                    }
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
            else resolve()
        })
    },
    //
    fetchCount({commit, getters}) {
        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])

            if (!getters['getCount']) {
                clients.count({
                    filters: formattedFilters
                })
                .then((res) => {
                    commit('setCount', {
                        filters: formattedFilters,
                        count: res.data.count
                    })
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