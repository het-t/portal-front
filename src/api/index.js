import endpoints from "./endpoints.js"
import makeDeleteReq from "./makeDeleteReq.js"
import makeGetReq from "./makeGetReq.js"
import makePatchReq from "./makePatchReq.js"
import makePostReq from './makePostReq.js'
import makePutReq from "./makePutReq.js"

const activities = {
    count: (args) => makeGetReq(endpoints.activities + '/count', args),
    getList: (args) => makeGetReq(endpoints.activities, args)
}

const roles = {
    count: (args) => makeGetReq(endpoints.roles + '/count', args),
    getList: (args) => makeGetReq(endpoints.roles, args),
    getData: (args) => makeGetReq(endpoints.roles + '/' + args.roleId),
    create: (args) => makePostReq(endpoints.roles, args),
    edit: (args) => makePutReq(endpoints.roles + '/' + args.roleId, args),
    delete: (args) => makeDeleteReq(endpoints.roles + '/' + args.roleId)
}

const clients = {
    count: (args) => makeGetReq(endpoints.clients + '/count', args),
    getList: (args) => makeGetReq(endpoints.clients, args),
    getTypes: () => makeGetReq(endpoints.clients + '/types'),
    create: (args) => makePostReq(endpoints.clients, args),
    edit: (args) => makePutReq(endpoints.clients + '/' + args.clientId, args),
    tag: (args) => makePatchReq(endpoints.clients + '/' + args.clientId, args),
    delete: (args) => makeDeleteReq(endpoints.clients + '/' + args.clientId)
}

const users = {
    count: (args) => makeGetReq(endpoints.users + '/count', args),
    getList: (args) => makeGetReq(endpoints.users, args),
    getRights: () => makeGetReq(endpoints.users + '/rights'),
    getData: (args) => makeGetReq(endpoints.users + '/' + args.id),
    create: (args) => makePostReq(endpoints.users, args),
    edit: (args) => makePutReq(endpoints.users + '/' + args.userId, args),
    delete: (args) => makeDeleteReq(endpoints.users + '/' + args.userId)
}

const tasks = {
    count: (args) => makeGetReq(endpoints.tasks + '/count', args),
    getList: (args) => makeGetReq(endpoints.tasks, args),
    getData: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId),
    getSubTasks: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks'),
    create: (args) => makePostReq(endpoints.tasks, args),
    changeStatus: (args) => makePatchReq(endpoints.tasks + '/' + args.taskId, args),
    edit: (args) => makePutReq(endpoints.tasks + '/' + args.taskId, args),
    delete: (args) => makeDeleteReq(endpoints.tasks + '/' + args.taskId, args),
}

const tasksMaster = {
    count: (args) => makeGetReq(endpoints.taskMasters + '/count', args),
    getList: (args) => makeGetReq(endpoints.taskMasters, args),
    getData: (args) => makeGetReq(endpoints.taskMasters + '/' + args.taskMasterId),
    getSubTasks: (args) => makeGetReq(endpoints.taskMasters + '/' + args.taskMasterId),
    edit: (args) => makePutReq(endpoints.taskMasters + '/' + args.taskMasterId, args),
    delete: (args) => makeDeleteReq(endpoints.taskMasters + '/' + args.taskMasterId)
}

const subTasksMaster = {
    get: (args) => makeGetReq(endpoints.getSubTasksMaster, args)
}

const myTasks = {
    count: (args) => makeGetReq(endpoints.myTasks + '/count', args),
    getList: (args) => makeGetReq(endpoints.myTasks, args),
    changeStatus: (args) => makePatchReq(endpoints.myTasks + '/' + args.taskId, args)
}

const workDiary = {
    count: (args) => makeGetReq(endpoints.workDiary + '/count', args),
    getList: (args) => makeGetReq(endpoints.workDiary + '/' + args.filters.userId, args),
    getData: (args) => makeGetReq(endpoints.workDiary + '/' + args.filters.userId + '/' + args.filters.taskId, args)
}

const admin = {
    users: {
        create: (args) => makePostReq(endpoints.admin.createAdmin, args)
    },
    orgs: {
        create: (args) => makePostReq(endpoints.admin.createOrg, args)
    }
}

const settings = {
    get: (args) => makeGetReq(endpoints.settings.get, args),
    notifications: {
        wa: {
            getQr: () => makeGetReq(endpoints.settings.waNotifications.getQr),
            create: (args) => makePostReq(endpoints.settings.waNotifications.create, args),
            getOtp: (args) => makeGetReq(endpoints.settings.waNotifications.getOtp, args),
            verifyOtp: (args) => makePostReq(endpoints.settings.waNotifications.verifyOtp, args),
            get: () => makeGetReq(endpoints.settings.waNotifications.getHistory),
            consent: (args) => makePostReq(endpoints.settings.waNotifications.consent, args),
        }
    }
}

const profile = {
    setProfilePic: (args) => makePostReq(endpoints.profile.setProfilePic, args)
}

const chatInternal = {
    getMessages: (args) => makeGetReq(endpoints.chatInternal.message, args),
    sendMessage: (args) => makePostReq(endpoints.chatInternal.message, args),

    getGroups: () => makeGetReq(endpoints.chatInternal.groups),
    deleteGroup: (args) => makeDeleteReq(endpoints.chatInternal.groups, args),
    editGroup: (args) => makePostReq(`${endpoints.chatInternal.groups}${args.groupId}`, args),
    
    getGroupParticipents: (args) => makeGetReq(`${endpoints.chatInternal.groups}${args.groupId}`),
}

const rights = {
    getList: () => makeGetReq(endpoints.rights)
}

export {
    admin,
    activities,
    clients,
    users,
    roles,
    myTasks,
    workDiary,
    tasks,
    tasksMaster,
    subTasksMaster,
    settings,
    profile,
    chatInternal,
    rights
}