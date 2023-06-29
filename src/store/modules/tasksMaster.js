import { tasksMaster } from "@/api/index.js"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: {},
    list: {},
    subTasks: {},
    sortBy: 'id',
    sortOrder: 0,
    currentPage: 1,
    recordsPerPage: 50,
    filters: {
        title: '',
        description: ''
    }
}

const getters = {
    getCount(state) {
        return state.count[Object.values(formatFilters(state.filters))]
    },
    getList: (state) => ({from = null, to = null, sortBy = null, sortOrder = null, filters = Object.values(formatFilters(state.filters))}) => {
        if (from !== null && to !== null) {
            sortBy = state.sortBy
            sortOrder = state.sortOrder
        }
        return state.list[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`]
    },
    getSort(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    getFilters(state) {
        return state.filters
    },
    getCurrentPage(state) {
        return state.currentPage
    },
    getRecordsPerPage(state) {
        return state.recordsPerPage
    },
    getSubTasks: (state) => (taskMasterId) => {
        return state.subTasks[taskMasterId]
    }
}

const mutations = {
    setCount(state, {count}) {
        state.count[Object.values(formatFilters(state.filters)).join('_')] = count
    },
    setList(state, {from = null, to = null, sortBy = null, sortOrder = null, filters = ['null', 'null'], data}) {
        state.list[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`] = data
    },
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    setCurrentPage(state, n) {
        state.currentPage = n
    },
    setRecordsPerPage(state, recordsPerPage) {
        state.recordsPerPage = recordsPerPage
    },
    setSubTasks(state, {taskMasterId, data}) {
        state.subTasks[taskMasterId] = data
    }
}

const actions = {
    fetchCount({getters, commit}, {force = false}) {
        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])

            if (!getters['getCount'] || force === true) {                
                tasksMaster.count({
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

            if (!getters['getList']({from, to, sortBy, sortOrder, filters:  Object.values(formattedFilters)}) || force == true) {
                tasksMaster.getList({
                    from,
                    recordsPerPage,
                    sortBy,
                    sortOrder,
                    filters: formattedFilters
                })
                .then(res => {
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
                            to,
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
    fetchSubTasks({getters, commit}, {taskMasterId, force = false}) {
        return new Promise((resolve, reject) => {
            if (!getters['getSubTasks'](taskMasterId)?.length || force === true) {
                tasksMaster.getSubTasks({taskMasterId})
                .then((res) => {
                    commit('setSubTasks', {
                        taskMasterId,
                        data: res.data
                    })
                    resolve()
                })
                .catch(err => {
                    console.log(err)
                    reject()
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