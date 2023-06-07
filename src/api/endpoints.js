const endpoints = {
    createClient: '/clients/create-client',
    getClients: '/clients/',
    getAllUsers: '/users/',
    createUser: '/users/create-user',
    editUser: '/users/edit-user',
    createTask: '/tasks/create-task',
    createSubTask: '/tasks/create-sub-task',
    getSubTasks: '/tasks/get-sub-tasks',
    getTasks: '/tasks/',
    getTaskData: '/tasks/get-task-data',
    getRoles: '/roles',
    deleteUser: '/users/delete-user',
    getUserData: '/users/edit',
    editRole: '/roles/edit-role',
    deleteRole: '/roles/delete-role',
    createRole: '/roles/create-role',
    getAllRights: '/roles/get-rights',
    getUserRights: '/rights',
    getTasksMaster: '/tasks/get-tasks-master',
    getSubTasksMaster: '/tasks/get-sub-tasks-master',
    getClientsMasterTypes: '/clients/types',
    getMyTasks: '/myTasks/',
    editClient: '/clients/edit-client',
    editTask: '/tasks/edit-task',
    editTaskMaster: '/tasks/edit-task-master',
    deleteClient: '/clients/delete-client',
    deleteTask: '/tasks/delete-task',
    changeStatusMyTask: '/myTasks/change-status',
    changeTaskStatus: '/tasks/change-status',
    changeClientTag: '/clients/tag',
    
    admin: {
        createAdmin: '/orgs/admins/create-admin',
        createOrg: '/orgs/create-org'
    },

    settings: {
        get: '/settings/',
        waNotifications: {
            create: '/settings/notifications/wa/create',
            getOtp: '/settings/notifications/wa/otp',
            verifyOtp: '/settings/notifications/wa/otp',
            getHistory: '/settings/notifications/wa/history',
            consent: '/settings/notifications/wa/consent',
            getQr: '/settings/notifications/wa/qr'
        }
    },

    profile: {
        getSettings: '/settings/'
    },

    chatInternal: {
        groups: '/chat/groups/',
        message: '/chat/'
    }
}

export default endpoints