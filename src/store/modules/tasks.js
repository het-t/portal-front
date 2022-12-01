import { tasks, tasksMaster } from "@/api"

const state = {
    tasksCount: '', //no. of total tasks
    tasks: {},      //list of all data of tasks table
    tasksData: {},   //data of all tasks opened to edit
    subTasksData: {},    //data of all sub tasks opened to edit
    tasksMaster: [],    //list of all tasks master
}

const getters = {
    taskData: (state) => (taskId) => {
        return state.tasksData[taskId]
    },
    tasksListGet: (state) => (index) => {
        return state.tasks[index]
    },
    tasksCountGet (state) {
        return state.tasksCount
    },
    tasksMasterListGet(state) {
        return state.tasksMaster
    },
    subTasksData: (state) => (taskId) => {
        return state.subTasksData[taskId]
    }
}

const mutations = {
    tasksDataSet(state, {taskId, taskData}) {
        Object.defineProperty(state.tasksData, taskId, {
            value: taskData,
            writable: true,
            enumerable: true,
        })    
    },
    tasksCountSet(state, tasksCount) {
        state.tasksCount = tasksCount
    },
    tasksList(state, {index, data}) {
        Object.defineProperty(state.tasks, index, {
            value: data,
            writable: true,
            enumerable: true,
        })
    },
    tasksMasterListSet(state, tasksMasterList) {
        state.tasksMaster = tasksMasterList
    },
    subTasksDataSet(state, {taskId, data}) {
        Object.defineProperty(state.subTasksData, taskId, {
            value: data,
            writable: true,
            enumerable: true,
        })    
    }
}

const actions = {
    tasksDataSet({getters, commit}, {taskId}) {
        const res = getters['taskData']?.(taskId)
        if (res == undefined || res == '') {
            tasks.getData({taskId})
            .then((res) => {
                commit('tasksDataSet',{
                    taskId: taskId,
                    taskData: res?.data?.taskData
                })
            })
        }
    },
    tasksMasterListSet({getters, commit}) {
        if ((getters['tasksMasterListGet']).length == 0) {
            tasksMaster.get()
            .then((res) => {
                commit('tasksMasterListSet', res?.data?.tasksMasterList)
            })
        }
    },
    subTasksDataSet({getters, commit}, {taskId}) {
        const res = getters['subTasksData']?.(taskId)
        if ( res == undefined || res == '') {
            tasks.getSubTasks({taskId})
            .then((res) => {
                commit('subTasksDataSet', {
                    taskId, 
                    data: res.data.subTasksList
                })
            })
        } 
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}