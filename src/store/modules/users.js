import { users } from "@/api"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: {}, //no. of users for table pagination
    users: {},  //data of all visited users table pages 
    data: {},  //list of data of users selected to edit
    sortBy: 'id',
    sortOrder: 0,    //0-desc, 1-asc
    currentPage: 1,
    recordsPerPage: 50,
    filters: {
        'name': '',
        'email': '',
        'rights': ''
    }
}

const getters = {
    //
    getList: (state) => ({from = null, to = null, sortBy = null, sortOrder = null, filters = Object.values(formatFilters(state.filters))}) => {
        if (from !== null && to !== null) {
            sortBy = state.sortBy
            sortOrder = state.sortOrder
        }
        return state.users[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`]
    },
    //
    getCount(state) {
        return state.count[Object.values(formatFilters(state.filters)).join('_')]
    },
    //
    getData: (state) => (index) => {
        return state.data[index]
    },
    //
    getFilters(state) {
        return state.filters
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
    getRecordsPerPage(state) {
        return state.recordsPerPage
    }
}

const mutations = {
    //
    setList(state, {from = null, to = null, sortBy = null, sortOrder = null, filters = ['null', 'null', 'null'], data}) {
        state.users[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`] = data
    },
    //
    setCount(state, {count}) {
        state.count[Object.values(formatFilters(state.filters)).join('_')] = count
    },
    //
    setData(state, {index, data}) {
        state.data[index] = data
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
    //
    setRecordsPerPage(state, recordsPerPage) {
        state.recordsPerPage = recordsPerPage
    },
    //
    flush(state, {userId}) {
        state.users = {}
        delete state.data[userId]
    }
}

const actions = {
    //
    fetchCount({getters, commit}, {force = false}) {
        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])

            if (!getters['getCount'] || force === true) {
                users.count({
                    filters: formattedFilters
                })
                .then((res) => {
                    commit('setCount', {
                        count: res.data.count,
                        filters: formattedFilters
                    })
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
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

            if (!getters['getList']({from, to, sortBy, sortOrder, filters: Object.values(formattedFilters)})?.length || force === true) {
                users.getList({
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
                            from,
                            to,
                            sortBy,
                            sortOrder,
                            filters: Object.values(formattedFilters),
                            data: res.data
                        })
                    }
                    resolve()
                })
                .catch(err => {
                    console.log(err)
                    reject()
                })
            }
            else resolve()
        })
    },
    //
    fetchData({getters, commit}, {userId, force}) {  
        return new Promise((resolve, reject) => {
            if (!getters['getData'](userId) || force === true) {
                users.getData({
                    id: userId
                })
                .then((res) => {
                    commit('setData', {
                        index: userId, 
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