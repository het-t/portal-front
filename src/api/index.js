import endpoints from "./endpoints.js"
import makeGetReq from "./makeGetReq.js"
import makePostReq from './makePostReq.js'

const clients = {
    get: () => makeGetReq(endpoints.getClients),
    create: (args) => makeGetReq(endpoints.createClient, args),
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
    getData: (args) => makeGetReq(endpoints.getTaskData, args),
    create: (args) => makeGetReq(endpoints.createTask, args),
    getSubTasks: (args) => makeGetReq(endpoints.getSubTasks, args),
}

const getAllRights = (args) => makeGetReq(endpoints.getAllRights, args)


// const createClient = (args) => makeGetReq(endpoints.createClient, args)
// const getClients = () => makeGetReq(endpoints.getClients)
// const getUsers = (args) => makeGetReq(endpoints.getAllUsers, args)
// const createTask = (args) => makeGetReq(endpoints.createTask, args)
// const getSubTasks = (args) => makeGetReq(endpoints.getSubTasks, args)
// const getTasks = () => makeGetReq(endpoints.getTasks)
// const getTaskData = (args) => makeGetReq(endpoints.getTaskData, args)
// const getRoles = (args) => makeGetReq(endpoints.getRoles, args)
// const getUserData = (args) => makeGetReq(endpoints.getUserData, args)
// const getRoleData = (args) => makeGetReq(endpoints.editRole, args)
// const createRole = (args) => makeGetReq(endpoints.createRole, args)

// const createUser = (args) => makePostReq(endpoints.createUser, args)
// const editUser = (args) => makePostReq(endpoints.editUser, args)
// const deleteUser = (args) => makePostReq(endpoints.deleteUser, args)
// const deleteRole = (args) => makePostReq(endpoints.deleteRole, args)
// const editRole = (args) => makePostReq(endpoints.editRole, args)

export {
    getAllRights,
    clients,
    users,
    roles,
    tasks
}