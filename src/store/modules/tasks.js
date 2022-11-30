const state = {
    tasksCount: '', //no. of total tasks
    tasks: {},      //list of all data of tasks table
    tasksData: {},   //data of all tasks opened to edit
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}