import endpoints from "./endpoints.js"
import makeGetReq from "./makeGetReq.js"
import makePostReq from './makePostReq.js'

const clients = {
    get: (args) => makeGetReq(endpoints.getClients, args),
    create: (args) => makeGetReq(endpoints.createClient, args),
    getTypes: () => makeGetReq(endpoints.getClientsMasterTypes),
    edit: (args) => makeGetReq(endpoints.editClient, args),
    delete: (args) => makePostReq(endpoints.deleteClient, args)
}

const users = {
    get: (args) => makeGetReq(endpoints.getAllUsers, args),
    getData: (args) => makeGetReq(endpoints.getUserData, args),
    create: (args) => makePostReq(endpoints.createUser, args),
    edit: (args) => makePostReq(endpoints.editUser, args),
    delete: (args) => makePostReq(endpoints.deleteUser, args)
}

const roles = {
    get: (args) => makeGetReq(endpoints.getRoles, args),
    getData: (args) => makeGetReq(endpoints.editRole, args),
    create: (args) => makeGetReq(endpoints.createRole, args),
    edit: (args) => makePostReq(endpoints.editRole, args),
    delete: (args) => makePostReq(endpoints.deleteRole, args)
}

const tasks = {
    get: (args) => makeGetReq(endpoints.getTasks, args),
    getData: (args) => makeGetReq(endpoints.getTaskData, args),
    create: (args) => makeGetReq(endpoints.createTask, args),
    edit: (args) => makeGetReq(endpoints.editTask, args),
    getSubTasks: (args) => makeGetReq(endpoints.getSubTasks, args),
    delete: (args) => makePostReq(endpoints.deleteTask, args),
    changeStatus: (args) => makePostReq(endpoints.changeTaskStatus, args)
}

const tasksMaster = {
    get: () => makeGetReq(endpoints.getTasksMaster),
    edit: (args) => makeGetReq(endpoints.editTaskMaster, args),
}

const subTasksMaster = {
    get: (args) => makeGetReq(endpoints.getSubTasksMaster, args)
}

const myTasks = {
    get: () => makeGetReq(endpoints.getMyTasks),
    changeStatus: (args) => makeGetReq(endpoints.changeStatusMyTask, args)
}
const getAllRights = () => makeGetReq(endpoints.getAllRights)

const getUserRights = () => makeGetReq(endpoints.getUserRights)

export {
    getAllRights,
    getUserRights,
    clients,
    users,
    roles,
    myTasks,
    tasks,
    tasksMaster,
    subTasksMaster
}