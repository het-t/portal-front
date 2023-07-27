const breadcrumb = {
    list: {
        title: 'tasks',
        action: true,
        actionUrl: '/u/tasks/create-task',
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
            route: '/u/tasks/create-task'
        }]
    }
}
const routes = {
    path: 'tasks',
    component: () => import('@/views/TasksView.vue'),
    children: [
        {
            path: ':taskId',
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
            path: '',
            alias: 'list',
            name: 'tasks_list',
            component: () => import('@/components/TasksList.vue'),
            meta: {
                breadcrumb: breadcrumb.list
            }
        },
        {
            path: 'create-task',
            name: 'create_task',
            component: () => import('@/views/TasksMainView.vue'),
            meta: {
                breadcrumb: breadcrumb.create,
                protected: true
            }
        },
    ]
}

export default routes;