const state = {
    allRightsList: [],  //list of all rights
    userRights: []      //list of user's rights
}

const getters = {
    getAllRightsList(state) {
        return state.allRightsList
    },
    getUserRights(state) {
        return state.userRights
    }
}

const mutations = {
    setAllRightsList(state, {index, rightsList}) {
        state.allRightsList[index] = rightsList
    },
    setUserRights(state, userRights) {
        state.userRights = userRights
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}