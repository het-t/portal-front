const breadcrumb = {
    list: {
        title: 'my tasks',
        path: [{
            text: 'list',
            route: '/u/my-tasks/list'
        }]
    }
}

const routes = {
    path: 'my-tasks',
    component: () => import('@/views/MyTasksView.vue'),
    children: [
        {
            path: '',
            alias: 'list',
            name: 'my_tasks_list',
            component: () => import('@/views/MyTasksView.vue'),
            meta: {
                breadcrumb: breadcrumb.list
            }
        }
    ],
}

export default routes