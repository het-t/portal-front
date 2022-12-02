const state = {
    activityCount: '', //no. of activity
    activity: {},      //table data of visited pages
}

const getters = {
    activityCountGet(state) {
        return state.activityCount
    },
    activityListGet: (state) => (index) => {
        return state.activity[index]
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}