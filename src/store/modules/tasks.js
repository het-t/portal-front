import { tasks, tasksMaster } from "@/api"

const state = {
    tasksCount: '', //no. of total tasks
    tasks: {},      //page data of tasks table
    tasksData: {},   //data of all tasks opened to edit
    subTasksData: {},    //data of all sub tasks opened to edit
    tasksMaster: [],    //list of all tasks master
    sortBy: 'id',       
    sortOrder: 0        //0-desc, 1-asc
}

const getters = {
    taskData: (state) => (taskId) => {
        return state.tasksData[taskId]
    },
    tasksListGet: (state) => (index, sortBy, sortOrder, filters) => {
        //filters=> 0-name, 1-rights
        return state.tasks[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}`]
    },
    tasksCountGet (state) {
        return state.tasksCount
    },
    tasksMasterListGet(state) {
        return state.tasksMaster
    },
    subTasksData: (state) => (taskId) => {
        return state.subTasksData[taskId]
    },
    sortGet(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    }
}

const mutations = {
    RESET_STATE(state, {isMaster}) {
        state.tasksCount = ''
        state.tasks = {}
        state.tasksData = {}
        state.subTasksData = {}
        if (isMaster) state.tasksMaster = []
    },
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
    tasksList(state, {index, sortBy, sortOrder, filters, data}) {
        //filters: 0-name, 1-rights
        console.log(`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}`)
        Object.defineProperty(state.tasks, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}`, {
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
    },
    sortSet(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    }
}

const actions = {
    tasksDataSet({getters, commit}, {taskId}) {
        const res = getters['taskData']?.(taskId)
        return new Promise((resolve, reject) => {
            if (res == undefined || res == '') {
                tasks.getData({taskId})
                .then((res) => {
                    commit('tasksDataSet',{
                        taskId: taskId,
                        taskData: res?.data
                    })
                    resolve()
                })
                .catch(() => {
                    reject()
                })
            }
            else resolve()
        })
    },
    tasksMasterListSet({getters, commit}) {
        return new Promise((resolve, reject) => {
            if ((getters['tasksMasterListGet']).length == 0) {
                tasksMaster.get()
                .then((res) => {
                    commit('tasksMasterListSet', res?.data?.tasksMasterList)
                    resolve()
                })
                .catch(() => {
                    reject()
                })
            }
            else resolve()
        })
    },
    subTasksDataSet({getters, commit}, {taskId}) {
        const res = getters['subTasksData']?.(taskId)
        return new Promise((resolve, reject) => {
            if (res == undefined || res == '') {
                tasks.getSubTasks({taskId})
                .then((res) => {
                    commit('subTasksDataSet', {
                        taskId, 
                        data: res.data.subTasksList
                    })
                    resolve()
                })
                .catch(() => {
                    reject()
                })
            } 
            else resolve()
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