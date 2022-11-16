import endpoints from "./endpoints.js"
import makeGetReq from "./makeGetReq.js"
import makePostReq from './makePostReq.js'

const createClient = (args) => makeGetReq(endpoints.createClient, args)
const getClients = () => makeGetReq(endpoints.getClients)
const getUsers = (args) => makeGetReq(endpoints.getAllUsers, args)
const createTask = (args) => makeGetReq(endpoints.createTask, args)
const getSubTasks = (args) => makeGetReq(endpoints.getSubTasks, args)
const getTasks = () => makeGetReq(endpoints.getTasks)
const getTaskData = (args) => makeGetReq(endpoints.getTaskData, args)
const getRoles = (args) => makeGetReq(endpoints.getRoles, args)
const getUserData = (args) => makeGetReq(endpoints.getUserData, args)
const getRoleData = (args) => makeGetReq(endpoints.editRole, args)
const createRole = (args) => makeGetReq(endpoints.createRole, args)
const getAllRights = (args) => makeGetReq(endpoints.getRoleRights, args)

const createUser = (args) => makePostReq(endpoints.createUser, args)
const editUser = (args) => makePostReq(endpoints.editUser, args)
const deleteUser = (args) => makePostReq(endpoints.deleteUser, args)
const deleteRole = (args) => makePostReq(endpoints.deleteRole, args)
const editRole = (args) => makePostReq(endpoints.editRole, args)

export {
    createClient,
    getClients,
    getUsers,
    createTask,
    getSubTasks,
    getTasks,
    getTaskData,
    createUser,
    editUser,
    getRoles,
    deleteUser,
    getUserData,
    getRoleData,
    deleteRole,
    createRole,
    getAllRights,
    editRole,

}