import endpoints from "./endpoints.js"
import createClientReq from "./createClient.js"

const createClient = (args) => createClientReq(endpoints.createClient, args)

export {
    createClient
}
