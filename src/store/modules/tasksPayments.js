import { tasks } from "@/api/index.js"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    list: {},
    sortBy: 'recieved_at',
    sortOrder: 0,
    filters: {
        taskId: '',
        details: '',
        receivedAt: '',
        amount: ''
    }
}

const getters = {
    getFilters(state) {
        return state.filters
    },
    getList: (state) => () => {
        return state.list[`${Object.values(formatFilters(state.filters)).join('_')}_${state.sortBy}_${state.sortOrder}`]
    },
    getSort(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    }
}

const mutations = {
    setPayments(state, list) {
        state.list = list
    },
    setCurrentTaskId(state, taskId) {
        state.filters.taskId = taskId
    },
    setList(state, {filters = ['null', 'null', 'null', 'null'], list}) {
        state.list[`${Object.values(filters).join('_')}_${state.sortBy}_${state.sortOrder}`] = list
    },
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    flush(state) {
        state.list = {}
    }
}
const actions = {
    fetchList({getters, commit}, {force = false}) {

        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])
            const taskId = formattedFilters.taskId
            const {sortBy, sortOrder} = getters['getSort']

            if (!getters['getList']({filters: Object.values(formattedFilters)})?.length || force === true) {
                tasks.getPayments({
                    taskId,
                    filters: formattedFilters,
                    sortBy,
                    sortOrder
                })
                .then((res) => {
                    commit('flush')
                    return res
                })
                .then((res) => {
                    commit('setList', {
                        filters: formattedFilters,
                        list: res.data
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