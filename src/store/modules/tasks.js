import { tags, tasks } from "@/api"
import formatFilters from "@/helpers/storeFiltersFormater"

const state = {
    count: {}, //no. of total tasks
    tasks: {},      //page data of tasks table
    tasksData: {},   //data of all tasks opened to edit
    tasksLogs: {},
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
    },
    tags: [],
    subTasksStatuses: [
        {id: 1, name: 'To Do'},
        {id: 2, name: 'In Progress'},
        {id: 3, name: 'Done'},
        {id: 4, name: 'Pending For Approval'},
        {id: 5, name: 'Cancel'},
        {id: 6, name: 'Paused'},
        {id: 7, name: 'Reassigned'},
        {id: 8, name: 'Approved'}
    ]
}

const getters = {
    getSubTasksStatuses(state) {
        return state.subTasksStatuses
    },
    getSubTasksTags(state) {
        return state.tags
    }, 
    //
    getData: (state) => (taskId) => {
        return state.tasksData[taskId]
    },
    getLogs: (state) => (taskId) => {
        return state.tasksLogs[taskId]
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
    setLogs(state, {taskId, taskLogs}) {
        state.tasksLogs[taskId] = taskLogs
    },
    //
    setCount(state, {count}) {
        state.count[Object.values(formatFilters(state.filters)).join('_')] = count
    },
    //
    setList(state, {from = null, to = null, sortBy = null, sortOrder = null, filters = ['null', 'null', 'null', 'null', 'null'], data}) {
        state.tasks[`${from}_${to}_${sortBy}_${sortOrder}_${filters.join('_')}`] = data
    },
    addTag(state, {data}) {
        state.subTasksStatuses.push(data)
    },
    //
    setSubTasks(state, {taskId, data}) {
        state.subTasksData[taskId] = data   
    },
    addNewSubTask(state, {taskId, data}) {
        state.subTasksData[taskId]?.push(data)
    },
    editSubTaskDescription(state, {taskId, subTaskId, description}) {
        state.subTasksData[taskId].find((subTask) => { 
            if (subTask.id === subTaskId) subTask.description = description
        })  
    },
    //
    setSort(state, {sortBy, sortOrder}) {
        state.sortBy = sortBy
        state.sortOrder = sortOrder
    },
    setSubTasksTags(state, tags) {
        state.tags = tags
    },
    setNewTag(state, {newTag, task}) {
        const newTagObj = {
            id: state.tags.length*(-1), 
            name: newTag
        }

        state.tags.push(newTagObj)
        task.tagsId.push(newTagObj)
    },
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
    fetchSubTasksTags({getters, commit}, {force = false}) {
        return new Promise((resolve, reject) => {
            const storedSubTasksStatuses = getters['getSubTasksTags']
            if(!storedSubTasksStatuses?.length || force === true) {
                tags.getList(20)
                .then((res) => {
                    commit('setSubTasksTags', res.data)
                    resolve()
                })
                .catch(()=> {
                    reject()
                })
            }
            else resolve()
        })
    },
    fetchCount({getters, commit}, {force = false}) {
        return new Promise((resolve, reject) => {
            const formattedFilters = formatFilters(getters['getFilters'])

            if (!getters['getCount'] || force === true) {
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
                    filters: formattedFilters,
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
    fetchLogs({getters, commit}, {taskId, force = false}) {
        return new Promise((resolve, reject) => {
            if(!getters['getLogs'](taskId)?.length || force === true) {
                tasks.getLogs({taskId})
                .then((res) => {
                    commit('setLogs', {
                        taskId,
                        taskLogs: res.data
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
    fetchSubTasks({getters, commit}, {taskId, force = false}) {
        return new Promise((resolve, reject) => {
            if (!getters['getSubTasks']?.(taskId)?.length || force === true) {

                tasks.getSubTasks({taskId})
                .then((res) => {
                    let subTasks = res.data

                    subTasks = subTasks.map((subTask) => {
                        subTask.delegation = JSON.parse(subTask.delegation)

                        if (
                            subTask.delegation[0].parentId === null 
                            && 
                            subTask.delegation[0].childId === null
                        ) {
                            subTask.delegation = []
                            subTask.status = {id: 1, name: 'to do'}
                        }
                        else {
                            let usersDelegationLink = subTask.delegation.find((delegation) => {
                                return delegation.parentId === subTask.userId
                            })
                            
                            // if user is not assigned but still have access to that sub-tasks
                            // user must be in team of task
                            if (!usersDelegationLink) {
                                usersDelegationLink = subTask.delegation.find((link) => {
                                    return link.childId === null
                                })
                            }

                            subTask.status = getters['getSubTasksStatuses'].find((status) => {
                                return status.id === usersDelegationLink.statusId
                            })
                        }

                        if (subTask.tags == null) subTask.tags = []
                        else subTask.tags = JSON.parse(subTask.tags).map((tagId) => {
                            return getters['getSubTasksTags'].find((tag) => {
                                return tag.id === tagId
                            })
                        })

                        return subTask
                    })

                    commit('setSubTasks', {
                        taskId, 
                        data: subTasks
                    })
                    resolve()
                })
                .catch((err) => {
                    console.log(err)
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