const breadcrumb = {
    list: {
        title: 'clients',
        action: true,
        actionUrl: '/u/clients/create-client',
        path: [{
            text: 'list',
            route: '/u/clients/list'  
        }]
    },
    create: {
        title: 'clients',
        path: [{
            text: 'list',
            route: '/u/clients/list'
        }, {
            text: 'create',
            route: '/u/clients/create-client'
        }]
    }
}

const routes = {
    path: 'clients',
    component: () => import('@/views/ClientView.vue'),
    children: [
        {
            path: '',
            alias: 'list',
            name: 'clients_list',
            component: () => import('@/components/ClientsList.vue'),
            meta: {
                breadcrumb: breadcrumb.list
            }
        },
        {
            path: 'create-client',
            name: 'create_client',
            component: () => import('@/components/ClientCreate.vue'),
            meta: {
                protected: true,
                breadcrumb: breadcrumb.create
            }
        },
    ]
}

export default routes