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
    activityListGet: () => () => {
        // state.activity[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}_${filters[4]}`]
        return undefined
    },
    sortGet(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    getCurrentPage(state) {
        return state.currentPage
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
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    currentPageSet(state, {index}) {
        state.currentPage = index
    },
    paginate(state) {
        if (state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0  
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}