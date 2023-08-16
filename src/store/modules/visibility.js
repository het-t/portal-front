const state = {
    tags: '',
    status: '',
    delegation: ''
}

const getters = {
    getSubTasksOptionsVisibility(state) {
        return {
            tags: state.tags,
            status: state.status,
            delegation: state.delegation
        }
    }
}

const mutations = {
    setSubTasksOptionsVisibility(state, {tags = false, status = false, delegation = false}) {
        state.tags = tags
        state.status = status
        state.delegation = delegation
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}