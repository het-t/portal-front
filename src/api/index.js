import endpoints from "./endpoints.js"
import createClientReq from "./clientsCreate.js"
import getClientsReq from './clientsList.js'
import getUsersReq from './getUsers.js'
import createTaskReq from "./taskCreate.js"
import getSubTasksReq from "./tasksGetSubTasks.js"
import getTasksReq from "./tasksList.js"
import getTaskDataReq from "./taskData.js"

const createClient = (args) => createClientReq(endpoints.createClient, args)
const getClients = () => getClientsReq(endpoints.getClients)
const getUsers = (args) => getUsersReq(endpoints.getAllUsers, args)
const createTask = (args) => createTaskReq(endpoints.createTask, args)
const getSubTasks = (args) => getSubTasksReq(endpoints.getSubTasks, args)
const getTasks = () => getTasksReq(endpoints.getTasks)
const getTaskData = (args) => getTaskDataReq(endpoints.getTaskData, args)

export {
    createClient,
    getClients,
    getUsers,
    createTask,
    getSubTasks,
    getTasks,
    getTaskData,
}