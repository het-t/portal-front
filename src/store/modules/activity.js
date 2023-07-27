import { activities } from "@/api"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: '', //no. of activity
    list: [],      //table data of visited pages
    sortBy: 'id',
    sortOrder: 0,        //0-desc, 1-asc
    currentPage: 1,
    recordsPerPage: 50,
    filters: {
        email: '',
        activity: '',
        refTable: '',
        datetime: '',
        detail: ''
    }
}

const getters = {
    //
    getCount(state) {
        return state.count
    },
    //
    getList: (state) => () => {
        return state.list
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
    },
    //
    getFilters(state) {
        return state.filters
    }
}

const mutations = {
    RESET_STATE(state) {
        state.count = ''
        state.activity = {}
    },
    //
    setCount(state, count) {
        state.count = count
    },
    setList(state, {data}) {
        state.list = data
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
    }
}

const actions = {
    fetchCount({getters, commit}) {
        return new Promise((resolve, reject) => {
            activities.count({
                filters: formatFilters(getters['getFilters'])
            })
            .then((res) => {
                commit('setCount', res.data.count)
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    fetchList({getters, commit}) {
        return new Promise((resolve, reject) => {
            const {sortBy, sortOrder} = getters['getSort']
            const currentPage = getters['getCurrentPage']
            const recordsPerPage = getters['getRecordsPerPage']
            
            activities.getList({
                from: (currentPage - 1) * recordsPerPage,
                recordsPerPage,
                sortBy,
                sortOrder,
                filters: formatFilters(getters['getFilters'])
            })
            .then((res) => {
                commit('setList', {
                    data: res.data
                })
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject()
            })
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