const breadcrumb = {
    list: {
        title: 'tags',
        action: true,
        actionUrl: '/u/tags/create-tag',
        path: [{
            text: 'list',
            route: '/u/tags/list'
        }]
    },
    create: {
        title: 'tags',
        path: [{
            text: 'list',
            route: '/u/tags/list'
        }, {
            text: 'create',
            route: '/u/tags/create-tag'
        }]
    }
}

const routes = {
    path: 'tags',
    // component: () => import('@/views/TagsView.vue'),
    children: [
        {
            path: '',
            alias: 'list',
            name: 'tags_list',
            component: () => import('@/components/TagsList.vue'),
            meta: {
                breadcrumb: breadcrumb.list,
            }
        },
        {
            path: 'create-tag',
            name: 'create_tag',
            component: () => import('@/components/TagsCreate.vue'),
            meta: {
                breadcrumb: breadcrumb.create
            }
        }
    ]
}

export default routes