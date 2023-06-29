import { tasks } from "@/api"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: {}, //no. of total tasks
    tasks: {},      //page data of tasks table
    tasksData: {},   //data of all tasks opened to edit
    subTasksData: {},    //data of all sub tasks opened to edit
    sortBy: 'id',       
    sortOrder: 0,       //0-desc, 1-asc
    currentPage: 1,
    recordsPerPage: 50,
    filters: {
        name: '',
        description: '',
        client: '',
        progress: '',
        status: '',
        tags: []
    }
}

const getters = {
    //
    getData: (state) => (taskId) => {
        return state.tasksData[taskId]
    },
    //
    getList: (state) => ({from = null, to = null, sortBy = null, sortOrder = null, filters = Object.values(formatFilters(state.filters))}) => {
        if (from !== null && to !== null) {
            sortBy = state.sortBy
            sortOrder = state.sortOrder
        }
        return state.tasks[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`]
    },
    //
    getCount(state) {
        return state.count[Object.values(formatFilters(state.filters)).join('_')]
    },
    //
    getSubTasks: (state) => (taskId) => {
        return state.subTasksData[taskId]
    },
    //
    getSort(state) {
        return {
            sortBy: state.sortBy,
            sortOrder: state.sortOrder
        }
    },
    //
    getCurrentPage(state) {
        return state.currentPage
    },
    //
    getRecordsPerPage(state) {
        return state.recordsPerPage
    },
    //
    getFilters(state) {
        return state.filters
    }
}

const mutations = {
    //
    setData(state, {taskId, taskData}) {
        state.tasksData[taskId] = taskData
    },
    //
    setCount(state, {count}) {
        state.count[Object.values(formatFilters(state.filters)).join('_')] = count
    },
    //
    setList(state, {from = null, to = null, sortBy = null, sortOrder = null, filters = ['null', 'null', 'null', 'null', 'null'], data}) {
        state.tasks[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`] = data
    },
    // /
    setSubTasks(state, {taskId, data}) {
        state.subTasksData[taskId] = data   
    },
    //
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    //
    setCurrentPage(state, index) {
        state.currentPage = index
    },
    setRecordsPerPage(state, recordsPerPage) {
        state.recordsPerPage = recordsPerPage
    },
    flush(state, {taskId}) {
        state.tasks = {}

        if (taskId) {
            delete state.subTasksData[taskId]
            delete state.tasksData[taskId]
        }
        else {
            state.tasksData = {}
            state.subTasksData = {}
        }
    }
}

const actions = {
    //
    fetchCount({getters, commit}, {force = false}) {
        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])

            if (!getters['getCount']|| force === true) {
                tasks.count({
                    filters: formattedFilters
                })
                .then((res) => {
                    commit('setCount', {
                        filters: formattedFilters,
                        count: res.data.count
                    })
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
            else resolve()
        })
    },
    //
    fetchList({getters, commit}, {force = false, all = false}) {
        return new Promise((resolve, reject) => {
            let {sortBy, sortOrder} = getters['getSort']
            const currentPage = getters['getCurrentPage']
            const recordsPerPage = getters['getRecordsPerPage']

            let from, to, formattedFilters

            if (all) {
                from = null,
                to = null,
                sortBy = null,
                sortOrder = null,
                formattedFilters = formatFilters(state.filters)
            }
            else {
                formattedFilters = formatFilters(getters['getFilters'])
                from = (currentPage-1)*recordsPerPage
                to = from + recordsPerPage
            }

            if(!getters['getList']({from, to, sortBy, sortOrder, filters: Object.values(formattedFilters)})?.length || force === true) {
                
                tasks.getList({
                    from,
                    recordsPerPage,
                    filters: formattedFilters   ,
                    sortBy,
                    sortOrder    
                })
                .then(res => {
                    if (all) {
                        commit('setList', {
                            data: res.data,
                            filters: Object.values(formattedFilters)
                        })
                    }
                    else {
                        commit('setList', {
                            data: res.data,
                            from,
                            to,
                            sortBy,
                            sortOrder,
                            filters: Object.values(formattedFilters),
                        })
                    }
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
            }
            else resolve()
        }) 
    },
    //
    fetchData({getters, commit}, {taskId, force = false}) {
        return new Promise((resolve, reject) => {
            if (!getters['getData']?.(taskId) || force === true) {
                tasks.getData({taskId})
                .then((res) => {
                    commit('setData',{
                        taskId,
                        taskData: res.data
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
    //
    fetchSubTasks({getters, commit, dispatch}, {taskId, force = false}) {
        return new Promise((resolve, reject) => {
            if (!getters['getSubTasks']?.(taskId)?.length || force === true) {
                tasks.getSubTasks({taskId})
                .then((res) => {
                    commit('setSubTasks', {
                        taskId, 
                        data: res.data
                    })

                    for(let i = 0; i<res.data.length; i++) {
                        if (typeof res.data[i].assignedTo === "string") {
                            res.data[i].assignedTo = JSON.parse(res.data[i].assignedTo)
                            res.data[i].assignedTo?.map((userId) => {
                                dispatch('images/fetchProfilePic', {
                                    userId,
                                    width: 50,
                                    height: 50
                                }, {root: true})
                            })
                        }
                    }
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