const breadcrumb = {
    create: {
        title: 'users',
        path: [{
            text: 'list',
            route: '/u/users/list'
        }, {
            text: 'create',
            route: '/u/users/create-user'
        }]
    },
    list: {
        title: 'users',
        action: true,
        actionUrl: '/u/users/create-user',
        path: [{
            text: 'list',
            route: '/u/users/list'
        }]
    }
}

const routes = {
    path: 'users',
    component: () => import('@/views/UsersView.vue'),
    children: [
        {
        path: '',
        alias: 'list',
        name: 'users_list',
        component: () => import('@/components/UserList.vue'),
        meta: {
            breadcrumb: breadcrumb.list
        },
        },
        {
        path: 'create-user',
        name: 'create_user',
        component: () => import('@/components/UserCreate.vue'),
        meta: {
            protected: true,
            breadcrumb: breadcrumb.create
        }
        }
    ] 
}

export default routes