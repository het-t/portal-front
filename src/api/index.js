import endpoints from "./endpoints.js"
import makeGetReq from "./makeGetReq.js"
import makePostReq from './makePostReq.js'

const clients = {
    get: () => makeGetReq(endpoints.getClients),
    create: (args) => makeGetReq(endpoints.createClient, args),
    getTypes: () => makeGetReq(endpoints.getClientsMasterTypes)
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
    get: () => makeGetReq(endpoints.getTasks),
    getMyTasks: () => makeGetReq(endpoints.getMyTasks),
    getData: (args) => makeGetReq(endpoints.getTaskData, args),
    create: (args) => makeGetReq(endpoints.createTask, args),
    getSubTasks: (args) => makeGetReq(endpoints.getSubTasks, args),
}

const tasksMaster = {
    get: () => makeGetReq(endpoints.getTasksMaster)
}

const subTasksMaster = {
    get: (args) => makeGetReq(endpoints.getSubTasksMaster, args)
}

const getAllRights = () => makeGetReq(endpoints.getAllRights)

const getUserRights = () => makeGetReq(endpoints.getUserRights)

export {
    getAllRights,
    getUserRights,
    clients,
    users,
    roles,
    tasks,
    tasksMaster,
    subTasksMaster
}