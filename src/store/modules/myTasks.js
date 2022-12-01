const state = {
    myTasksCount: '',   //no. of tasks assigned to user
    myTasksData: {},    //data of all pages opened in my tasks screen
}

const getters = {
    myTasksCountGet(state) {
        return state.myTasksCount
    },
    //get page data
    myTasksListGet: (state) => (index) => {
        return state.myTasksData[index]
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
    } 
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}