import { tasks } from "@/api/index.js"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    list: {},
    sortBy: 'recieved_at',
    sortOrder: 0,
}

const getters = {
    getFilters(state) {
        return state.filters
    },
    getList: (state) => (taskId) => {
        return state.list[taskId]
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
    addPayment(state, {taskId, data}) {
        state.list[taskId].push(data)
    },
    editPayment(state, {taskId, data}) {
        const index = state.list[taskId].findIndex((payment) => {
            return payment.id === data.id
        })
        if (index !== -1) {
            state.list[taskId][index] = data
        }
    },
    removePayment(state, {taskId, paymentId}) {
        const i = state.list[taskId].findIndex((payment) => {
            return payment.id === paymentId
        })
        if (i >= 0) {
            state.list[taskId].splice(i, 1)
        }
    },
    setCurrentTaskId(state, taskId) {
        state.filters.taskId = taskId
    },
    setList(state, {taskId, list}) {
        state.list[taskId] = list
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
    fetchList({getters, commit}, {taskId, force = false}) {

        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])
            const {sortBy, sortOrder} = getters['getSort']

            if (!getters['getList'](taskId)?.length || force === true) {
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
                        taskId,
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