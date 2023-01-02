const state = {
    activityCount: '', //no. of activity
    activity: {},      //table data of visited pages
    sortBy: 'id',
    sortOrder: 0,        //0-desc, 1-asc
    currentPage: ''
}

const getters = {
    activityCountGet(state) {
        return state.activityCount
    },
    activityListGet: (state) => (index, sortBy, sortOrder, filters) => {
        return state.activity[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}_${filters[4]}`]
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
    activityList(state, {index, sortBy, sortOrder, filters, data}) {
        Object.defineProperty(state.activity, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}_${filters[4]}`, {
                value: data,
                writable: true,
                enumerable: true,
        })
    },
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    currentPageSet(state, {index}) {
        state.currentPage = index
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}