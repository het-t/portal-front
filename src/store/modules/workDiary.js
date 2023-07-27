import { workDiary } from "@/api"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: {},
    tasks: {},
    subTasks: {},
    sortBy: 'id',
    sortOrder: 0,
    currentPage: 1,
    recordsPerPage: 50,
    filters: {
        userId: '',
        datefrom: '',
        dateto: '',
        taskId: '',

        title: '',
        description: '',
        status: '',
        coordinator: '',
        client: ''
    }
}

const getters = {
    getList: (state) => ({from = null, to = null, sortBy = null, sortOrder = null, filters = Object.values(formatFilters(state.filters))}) => {
        if (from !== null && to !== null) {
            sortBy = state.sortBy
            sortOrder = state.sortOrder
        }
        if(filters[0]?.id) filters[0] = filters[0].id
        return state.tasks[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`]
    },
    getData: (state) => (taskId) => {
        const userId = state.filters.userId?.id ? state.filters.userId.id : state.filters.userId
        const datefrom = state.filters.datefrom ? state.filters.datefrom : 'null'
        const dateto = state.filters.dateto ? state.filters.dateto : 'null'

        return state.subTasks[`${userId}_${datefrom}_${dateto}_${taskId}`]
    },
    getCount(state) {
        return state.count[Object.values(formatFilters(state.filters)).join('_')]
    },
    getCurrentPage(state) {
        return state.currentPage
    },
    getRecordsPerPage(state) {
        return state.recordsPerPage
    },
    getFilters(state) {
        return state.filters
    },
    getSort(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    }
}

const mutations = {
    setCount(state, {count}) {
        state.count[Object.values(formatFilters(state.filters)).join('_')] = count
    },
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    setCurrentPage(state, {index}) {
        state.currentPage = index
    },
    setRecordsPerPage(state, recordsPerPage) {
        state.recordsPerPage = recordsPerPage
    },
    setList(state, {from = null, to = null, sortBy = null, sortOrder = null, filters = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'], data}) {
        state.tasks[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`] = data
    },
    setData(state, {userId, taskId, data}) {
        const datefrom = state.filters.datefrom ? state.filters.datefrom : 'null'
        const dateto = state.filters.dateto ? state.filters.dateto : 'null'

        state.subTasks[`${userId}_${datefrom}_${dateto}_${taskId}`] = data
    },
    flushMyTaskStatusChange(state) {
        state.subTasks = {}
    }
}

const actions = {
    fetchList({getters, commit}, {all = false}) {
        return new Promise((resolve, reject) => {
            let {sortBy, sortOrder} = getters['getSort']
            const currentPage = getters['getCurrentPage']
            const recordsPerPage = getters['getRecordsPerPage']

            let from, to, formattedFilters

            if (all) {
                from = null,
                to = null,
                sortBy = null,
                sortOrder = null,
                formattedFilters = formatFilters(state.filters)
            }
            else {
                formattedFilters = formatFilters(getters['getFilters'])
                from = (currentPage-1)*recordsPerPage
                to = from + recordsPerPage
            }

            if(!getters['getList']({from, to, sortBy, sortOrder, filters: Object.values(formatFilters)})?.length
            && formattedFilters.userId !== 'null') {
                if(formattedFilters.userId?.id) formattedFilters.userId = formattedFilters.userId.id

                workDiary.getList({
                    from,
                    recordsPerPage,
                    filters: formattedFilters,
                    sortBy,
                    sortOrder
                })
                .then((res) => {
                    commit('setList', {
                        data: res.data,
                        from,
                        to: from + recordsPerPage,
                        sortBy,
                        sortOrder,
                        filters: Object.values(formattedFilters)
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
    },
    fetchData({getters, commit}, {taskId}) {
        return new Promise((resolve, reject) => {
            if(!getters['getData'](taskId)?.length) {
                const filters = formatFilters(getters['getFilters'])
                
                filters.userId = filters.userId?.id ? filters.userId.id : filters.userId
                filters.taskId = taskId
                workDiary.getData({
                    filters
                }) 
                .then((res) => {
                    commit('setData', {
                        userId: filters.userId,
                        taskId,
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
    },
    fetchCount({getters, commit}) {
        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])

            if (!getters['getCount'] && formattedFilters.userId !== 'null') {
                if(formattedFilters.userId?.id) formattedFilters.userId = formattedFilters.userId.id

                workDiary.count({
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
            else {
                formattedFilters.dummy = true
                commit('setCount', {
                    filters: formattedFilters,
                    count: 0
                })
                resolve()
            }
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