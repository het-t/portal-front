const state = {
    activityCount: '', //no. of activity
    activity: {},      //table data of visited pages
    sortBy: 'id',
    sortOrder: 0        //0-desc, 1-asc
}

const getters = {
    activityCountGet(state) {
        return state.activityCount
    },
    activityListGet: (state) => (index) => {
        return state.activity[index]
    },
    sortGet(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    }
}

const mutations = {
    RESET_STATE(state) {
        state.activityCount = ''
        state.activity = {}
    },
    activityCountSet(state, activityCount) {
        state.activityCount = activityCount
    },
    activityList(state, {index, data}) {
        Object.defineProperty(state.activity, index, {
            value: data,
            writable: true,
            enumerable: true,
        })
    },
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}