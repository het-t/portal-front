import { tasks, tasksMaster } from "@/api"

const state = {
    tasksCount: '', //no. of total tasks
    tasks: {},      //page data of tasks table
    tasksData: {},   //data of all tasks opened to edit
    subTasksData: {},    //data of all sub tasks opened to edit
    tasksMaster: [],    //list of all tasks master
    sortBy: 'id',       
    sortOrder: 0,       //0-desc, 1-asc
    currentPage: '',
    paginationKey: 0
}

const getters = {
    taskData: (state) => (taskId) => {
        return state.tasksData[taskId]
    },
    tasksListGet: (state) => (index, sortBy, sortOrder, filters) => {
        //filters=> 0-name, 1-rights
        return state.tasks[`${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}_${filters[4]}`]
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
    },
    getKey(state) {
        return state.paginationKey
    },
    getCurrentPage(state) {
        return state.currentPage
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
    deleteTask(state, {taskId, filters}) {
        const path = state.currentPage+'_'+state.sortBy+'_'+state.sortOrder+'_'+filters[0]+'_'+filters[1]+'_'+filters[2]+'_'+filters[3]+'_'+filters[4]
        state.tasks[path].splice(state.tasks[path].findIndex(task => task.id == taskId), 1)
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
        Object.defineProperty(state.tasks, 
            `${index}_${sortBy}_${sortOrder}_${filters[0]}_${filters[1]}_${filters[2]}_${filters[3]}_${filters[4]}`, {
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
    },
    currentPageSet(state, {index}) {
        state.currentPage = index
    },
    refetch(state, {taskId, saved}) {
        state.tasks = {}
        
        if (taskId) {
            state.tasksData[taskId] = undefined
            state.subTasksData[taskId] = undefined
        }
        else {
            state.tasksCount = undefined
            state.tasksData = {}
            state.subTasksData = {}
        }

        if (saved == true) state.tasksMaster = []

        if(state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0
    },
    paginate(state) {
        if(state.paginationKey == 0) state.paginationKey = 1
        else if (state.paginationKey == 1) state.paginationKey = 0     
    }
}

const actions = {
    tasksList({getters, commit}, {index, from, filters}) {
        const {sortBy, sortOrder} = getters['sortGet']
        const res = getters['tasksListGet'](index, sortBy, sortOrder, filters)
        if (res?.length) {
            tasks.get({
                from,
                recordsPerPage: 10,
                sortBy,
                sortOrder,
                filters       
            })
            .then(results => {
                commit('tasksList', {
                    index,
                    sortBy,
                    sortOrder,
                    filters,
                    data: results.data.tasksList
                })
            })
        } 
    },
    tasksDataSet({getters, commit}, {taskId, force}) {
        const res = getters['taskData']?.(taskId)
        return new Promise((resolve, reject) => {
            if (res == undefined || res == '' || force == true) {
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
            if ((getters['tasksMasterListGet'])?.length == 0) {
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
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}