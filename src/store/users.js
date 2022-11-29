const state = {
    usersList: '',
}

const getters = {
    getUsersList(state) {
        return state.usersList
    }
}

export default {
    namespaced: true,
    state,
    getters
}