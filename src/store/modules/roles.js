const state = {
    rolesCount: '', //no. of roles
    roles: {},      //table data of visited pages
}

const getters = {
    rolesCountGet(state) {
        return state.rolesCount
    },
    rolesListGet: (state) => (index) => {
        return state.roles[index]
    }
}

const mutations = {
    rolesCountSet(state, rolesCount) {
        state.rolesCount = rolesCount
    },
    rolesList(state, {index, data}) {
        Object.defineProperty(state.roles, index, {
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