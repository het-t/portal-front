const breadcrumb = {
    list: {
        title: 'tasks',
        action: true,
        actionUrl: '/u/tasks/create',
        path: [{
            text: 'list',
            route: '/u/tasks/list'
        }]
    },
    create: {
        title: 'tasks',
        path: [{
            text: 'list',
            route: '/u/tasks/list'
        }, {
            text: 'create',
            route: '/u/tasks/create'
        }]
    }
}
const routes = {
    path: 'tasks',
    component: () => import('@/views/TasksView.vue'),
    children: [
        {
            path: 'edit/:taskId',
            name: 'edit_task',
            component: () => import('@/views/TasksMainView.vue'),
            beforeEnter: (to) => {
                to.meta = {
                    protected: true,
                    breadcrumb: {
                        title: 'tasks',
                        path: [{
                            text: 'list',
                            route: '/u/tasks/list'
                        }, {
                            text: 'edit',
                            route: `/u/tasks/${to.params.taskId}`
                        }]
                    }
                }
            },
        },
        {
            path: 'create',
            name: 'create_task',
            component: () => import('@/components/TaskCreate.vue'),
            meta: {
                breadcrumb: breadcrumb.create
            }
        },
        {
            path: '',
            alias: 'list',
            name: 'tasks_list',
            component: () => import('@/components/TasksList.vue'),
            meta: {
                breadcrumb: breadcrumb.list
            }
        }
    ]
}

export default routes;