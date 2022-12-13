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
    myTasksListGet: (state) => (index, sortBy, sortOrder, filters) => {
        return state.myTasksData[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}`]
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
    myTasksList(state, {index, sortBy, sortOrder, filters, data}) {
        Object.defineProperty(state.myTasksData, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}`, {
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