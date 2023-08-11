import { tasks } from "@/api";

const state = {
    list: {}
}

const getters = {
    getList: (state) => (taskId) => {
        return state.list[taskId]
    }
}

const mutations = {
    setList(state, {taskId, list}) {
        state.list[taskId] = list
    },
    addComment(state, {taskId, data}) {
        state.list[taskId].unshift(data)
    }
}

const actions = {
    fetchList({getters, commit, rootGetters}, {taskId, force = false}) {
        return new Promise((resolve, reject) => {
            if (!getters['getList'](taskId)?.length || force === true) {
                tasks.getComments({
                    taskId
                })
                .then(res => {
                    commit('setList', {
                        taskId,
                        list: res.data.map((comment) => {
                            comment.user = rootGetters['users/getList']({}).find((user) => {
                                return comment.userId === user.id
                            })
                            return comment
                        })
                    })
                    resolve()
                })
                .catch(() => {
                    reject()
                })
            }
            else {
                resolve()
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}