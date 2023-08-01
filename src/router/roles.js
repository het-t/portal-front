const breadcrumb = {
    list: {
        title: 'roles',
        action: true,
        actionUrl: '/u/roles/create-role',
        path: [{
            text: 'list',
            route: '/u/roles/list'
        }]
    },
    create: {
        title: 'roles',
        path: [{
        text: 'list',
        route: '/u/roles/list'
        }, {
        text: 'create',
        route: '/u/roles/create-role'
        }]
    }
}

const routes = {
    path: 'roles',
    component: () => import('@/views/RoleView.vue'),
    children: [
        {
        path: '',
        alias: 'list',
        name: 'roles_list',
        component: () => import('@/components/RoleList.vue'),
        meta: {
            breadcrumb: breadcrumb.list
        }
        },
        {
        path: 'create-role',
        name: 'create_role',
        component: () => import('@/components/RoleCreate.vue'),
        meta: {
            protected: true,
            breadcrumb: breadcrumb.create
        }
        },
    ]
}

export default routes