const state = {
    usersCount: '', //no. of users for table pagination
    usersList: {},  //list of all users
}

const getters = {
    getUsersList(state) {
        return state.usersList
    },
    getUsersCount(state) {
        return state.usersCount
    }
}

const mutations = {
    setUsersList(state, {index, usersList}) {
        state.usersList[index] = usersList
    },
    setUserCount(state, usersCount) {
        state.getUsersCount = usersCount
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}