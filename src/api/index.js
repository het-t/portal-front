import endpoints from "./endpoints.js"
import createClientReq from "./clientsCreate.js"
import getClientsReq from './clientsList.js'
import getUsersReq from './getUsers.js'

const createClient = (args) => createClientReq(endpoints.createClient, args)
const getClients = () => getClientsReq(endpoints.getClients)
const getUsers = (args) => getUsersReq(endpoints.getAllUsers, args)

export {
    createClient,
    getClients,
    getUsers,
}