import { myTasks } from "@/api"
import parseSubTaskStatus from "@/helpers/parseSubTaskStatus"

const state = {
    list: {},    //data of all pages opened in my tasks screen
}

const getters = {
    getList: (state) => () => {
        return state.list
    },
}

const mutations = {
    setList(state, {data}) {
        state.list = data
    },
    editSubTaskDescription(state, {subTaskId, description}) {
        state.list.map((subTask) => {
            if (subTask.id == subTaskId) subTask.description = description
        })
    }
}

const actions = {
    fetchList({rootGetters, commit}) {

        return new Promise((resolve, reject) => {
            myTasks.getList()
            .then(res => {

                let subTaskes = res.data

                subTaskes.map((subTask) => {
                    subTask.delegation = JSON.parse(subTask.delegation)
                    parseSubTaskStatus(subTask)
                })

                subTaskes.map((subTask) => {
                    if (subTask.tags == null) subTask.tags = []
                    else subTask.tags = JSON.parse(subTask.tags).map((tagId) => {
                        return rootGetters['tasks/getSubTasksTags'].find((tag) => {
                            return tag.id === tagId
                        })
                    })
                })
                commit('setList', {
                    data: subTaskes
                })
                resolve()
            })
            .catch((err) => {
                console.log(err)
                reject()
            })
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