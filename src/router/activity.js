const breadcrumb = {
    list: [{
        title: 'activity',
        path: [{
            text: 'list',
            route: '/u/activity/'
        }]
    }]
}

const routes = {
    path: 'activity',
    children: [
        {
            path: '',
            alias: 'list',
            name: 'activity',
            component: () => import('@/components/UserActivity.vue'),
            meta: {
                protected: true,
                breadcrumb: breadcrumb.list
            }
        }
    ]
}

export default routes