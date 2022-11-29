const endpoints = {
    createClient: '/u/api/clients/create-client',
    getClients: '/u/api/clients/',
    getAllUsers: '/u/api/users/',
    createUser: '/u/api/users/create-user',
    editUser: '/u/api/users/edit-user',
    createTask: '/u/api/tasks/create-task',
    createSubTask: '/u/api/tasks/create-sub-task',
    getSubTasks: '/u/api/tasks/get-sub-tasks',
    getTasks: '/u/api/tasks/',
    getTaskData: '/u/api/tasks/get-task-data',
    getRoles: '/u/api/roles',
    deleteUser: '/u/api/users/delete-user',
    getUserData: '/u/api/users/edit',
    editRole: '/u/api/roles/edit-role',
    deleteRole: '/u/api/roles/delete-role',
    createRole: '/u/api/roles/create-role',
    getAllRights: '/u/api/roles/get-rights',
    getUserRights: '/u/api/rights',
    getTasksMaster: '/u/api/tasks/get-tasks-master',
    getSubTasksMaster: '/u/api/tasks/get-sub-tasks-master',
    getClientsMasterTypes: '/u/api/clients/types',
    getMyTasks: '/u/api/tasks/get-my-tasks'
    // editClient: '/u/api/roles/'
}

export default endpoints