import { roles } from "@/api"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: {}, //no. of roles
    roles: {},      //table data of visited pages
    data: {},   //list of data of roles selected to edit
    sortBy: 'id',
    sortOrder: 0,    //0-desc, 1-asc
    recordsPerPage: 50,
    currentPage: 1,
    filters: {
        name: '',
        rights: '',
    },
}

const getters = {
    //
    getFilters(state) {
        return state.filters
    },
    //
    getRecordsPerPage(state) {
        return state.recordsPerPage
    },
    //
    getCount(state) {
        return state.count[Object.values(formatFilters(state.filters)).join('_')]
    },
    //
    getList: (state) => ({from = null, to = null, sortBy = null, sortOrder = null, filters = Object.values(formatFilters(state.filters))}) => {
        if (from !== null && to !== null) {
            sortBy = state.sortBy
            sortOrder = state.sortOrder
        }
        return state.roles[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`]
    },
    //
    getData: (state) => (index) => {
        return state.data[index]
    },
    //
    getSort(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    getCurrentPage(state) {
        return state.currentPage
    }
}

const mutations = {
    setRecordsPerPage(state, value) {
        state.recordsPerPage = value
    },
    //
    setCount(state, {count}) {
        state.count[Object.values(formatFilters(state.filters)).join('_')] = count
    },
    //
    setList(state, {from = null, to = null, sortBy = null, sortOrder = null, filters = ['null', 'null'], data}) {
        state.roles[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`] = data
    },
    //
    setData(state, {index, data}) {
        state.data[index] = data
    },
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    deleteRole(state, {roleId, filters}) {
        const path = state.currentPage+'_'+state.sortBy+'_'+state.sortOrder+'_'+filters[0]+'_'+filters[1]
        state.roles[path].splice(state.roles[path].findIndex(role => role.id == roleId), 1)
    },
    setCurrentPage(state, index) {
        state.currentPage = index
    },
    flush(state, {roleId}) {
        state.roles = {}
        delete state.data[roleId]
    }
}

const actions = {
    //
    fetchCount({getters, commit}, {filters, force = false}) { 

        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(filters)

            if (!getters['getCount'] || force === true) {
                roles.count({
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
    }, 
    //
    fetchList({getters, commit}, {force = false, all = false}) {
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
                formattedFilters = formatFilters(state.filters)
            }
            else {
                formattedFilters = formatFilters(getters['getFilters'])
                from = (currentPage-1)*recordsPerPage
                to = from + recordsPerPage
            }

            if (!getters['getList']({from, to, sortBy, sortOrder, filters: Object.values(formattedFilters)}) || force === true) {

                roles.getList({
                    from,
                    recordsPerPage,
                    filters: formattedFilters,
                    sortBy,
                    sortOrder
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
    fetchData({getters, commit}, {roleId, force}) {
        return new Promise((resolve, reject) => {
            if (!getters['getData'](roleId) || force === true) {
                roles.getData({
                    roleId
                })
                .then((res) => {
                    commit('setData', {
                        index: roleId, 
                        data: res.data
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
    mutations,
    actions
}