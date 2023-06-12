import { myTasks } from "@/api"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: '',   //no. of tasks assigned to user
    list: {},    //data of all pages opened in my tasks screen
    sortBy: 'id',       
    sortOrder: 0,       //0-desc, 1-asc
    currentPage: 1,
    recordsPerPage: 50,
    filters: {
        name: '',
        descirption: '',
        client: '',
        deadline: ''
    }
}

const getters = {
    getCount(state) {
        return state.count
    },
    //get page data
    getList: (state) => () => {
        return state.list
    },
    getSort(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    getCurrentPage(state) {
        return state.currentPage
    },
    getFilters(state) {
        return state.filters
    },
    getRecordsPerPage(state) {
        return state.recordsPerPage
    }
}

const mutations = {
    setCount(state, count) {
        state.count = count
    },
    setList(state, {data}) {
        state.list = data
    },
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    setCurrentPage(state, {index}) {
        state.currentPage = index
    },
    refetch(state) {
        state.count = undefined
        state.list = {}

        if (state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0
    }
}

const actions = {
    fetchCount({commit}, {filters}) {
        const formattedFilters = formatFilters(filters)
        return new Promise((resolve, reject) => {
            myTasks.count({
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
        })
    },
    fetchList({getters, commit}) {

        return new Promise((resolve, reject) => {
            const {sortBy, sortOrder} = getters['getSort']
            const currentPage = getters['getCurrentPage']
            const recordsPerPage = getters['getRecordsPerPage']

            const formattedFilters = formatFilters(getters['getFilters'])
            const from = (currentPage-1)*recordsPerPage

            myTasks.getList({
                from,
                recordsPerPage,
                filters: formattedFilters,
                sortBy,
                sortOrder
            })
            .then(res => {
                commit('setList', {
                    data: res.data
                })
                resolve()
            })
            .catch(() => {
                reject()
            })
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