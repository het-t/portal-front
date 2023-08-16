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
    
    addTag: (args) => makePutReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/tags/' + args.tagId),
    removeTag: (args) => makeDeleteReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/tags/' + args.tagId),

    getSubTasks: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks'),
    addSubTask: (args) => makePostReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks', {description: args.description}),
    editSubTask: (args) => makePatchReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/description' , {description: args.description}),
    deleteSubTask: (args) => makeDeleteReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId),
    changeSubTaskStatus: (args) => makePatchReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/status', {statusId: args.statusId}),
    changeSubTaskPinStatus: (args) => makePatchReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/pin', {isPinned: args.isPinned}),
    
    getLogs: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/logs'),
    
    getComments: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/comments'),
    addComment: (args) => makePostReq(endpoints.tasks + '/' + args.taskId + '/comments', {comment: args.comment}),
    
    getDelegation: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/delegation/'),
    addDelegationLink: (args) => makePostReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/delegation/', {parentUserId: args.parentUserId, childUserId: args.childUserId}),
    editDelegationLink: (args) => makePostReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/delegation/', {userId: args.userId, newUserId: args.newUserId}),
    removeDelegationLink: (args) => makeDeleteReq(endpoints.tasks + '/' + args.taskId + '/sub-tasks/' + args.subTaskId + '/delegation/', {userId: args.userId}),

    getTeam: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/team'),
    addInTeam: (args) => makePostReq(endpoints.tasks + '/' + args.taskId + '/team/' + args.userId),
    removeFromTeam: (args) => makeDeleteReq(endpoints.tasks + '/' + args.taskId + '/team/' + args.userId),

    getPayments: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/payments'),
    getPaymentsGraph: (args) => makeGetReq(endpoints.tasks + '/' + args.taskId + '/payments/graph'),
    addPayment: (args) => makePostReq(endpoints.tasks + '/' + args.taskId +'/payments', args),
    editPayment: (args) => makePutReq(endpoints.tasks + '/' + args.taskId +'/payments/' + args.paymentId, args),
    deletePayment: (args) => makeDeleteReq(endpoints.tasks + '/' + args.taskId + '/payments/' + args.paymentId),
 
    create: (args) => makePostReq(endpoints.tasks, args),
    changeStatus: (args) => makePatchReq(endpoints.tasks + '/' + args.taskId, args),
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
    getList: () => makeGetReq(endpoints.myTasks),
    changeStatus: (args) => makePatchReq(endpoints.myTasks + '/' + args.taskId + '/status', args),
    changeTags: (args) => makePatchReq(endpoints.myTasks + '/' + args.taskId + '/tags', args)
}

const workDiary = {
    count: (args) => makeGetReq(endpoints.workDiary + '/count', args),
    getList: (args) => makeGetReq(endpoints.workDiary + '/' + args.filters.userId, args),
    getData: (args) => makeGetReq(endpoints.workDiary + '/' + args.filters.userId + '/' + args.filters.taskId, args)
}

const tags = {
    getList: (tableId) => makeGetReq(endpoints.tags + '/' + tableId),
    create: (args) => makePostReq(endpoints.tags, args),
    edit: (args) => makePutReq(endpoints.tags + '/' + args.tableId, args)  
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
    tags,
    settings,
    profile,
    chatInternal,
    rights
}