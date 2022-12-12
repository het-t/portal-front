const state = {
    myTasksCount: '',   //no. of tasks assigned to user
    myTasksData: {},    //data of all pages opened in my tasks screen
    sortBy: 'id',       
    sortOrder: 0,       //0-desc, 1-asc
}

const getters = {
    myTasksCountGet(state) {
        return state.myTasksCount
    },
    //get page data
    myTasksListGet: (state) => (index) => {
        return state.myTasksData[index]
    },
    sortGet(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    }
}

const mutations = {
    myTasksCountSet(state, count) {
        state.myTasksCount = count
    },
    //set page data
    myTasksList(state, {index, data}) {
        Object.defineProperty(state.myTasksData, index, {
            value: data,
            writable: true,
            enumerable: true
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