import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index.js'
import { getUserRights } from '@/api/index.js'

let settingBreadcrumb = {
  title: 'settings',
}

let AdminPanelOrgListBreadcrumb = {
  title: 'Organizations',
  action: true,
  actionUrl: '/u/admin/orgs/create-org',
  path: [{
    text: 'home',
    route: '/u/admin/orgs'
  }]
}

let AdminCreateBreadcrumb = {
  title: 'Admin',
  path: [{
    text: 'home',
    route: '/u/admin/orgs'
  }]
}

let AdminPanelCreateOrgBreadcrumb = {
  title: 'Organizations',
  path: [{
    text: 'home',
    route: '/u/admin/orgs'
  }, {
    text: 'create',
    route: '/u/admin/orgs/create-org'
  }]
}

let createUserBreadcrumb = {
  title: 'users',
  path: [{
    text: 'list',
    route: '/u/users/list'
  }, {
    text: 'create',
    route: '/u/users/create-user'
  }]
}

let userListBreadcrumb = {
  title: 'users',
  action: true,
  actionUrl: '/u/users/create-user',
  path: [{
    text: 'list',
    route: '/u/users/list'
  }]
}

let roleListBreadcrumb = {
  title: 'roles',
  action: true,
  actionUrl: '/u/roles/create-role',
  path: [{
    text: 'list',
    route: '/u/roles/list'
  }]
}

let roleCreateBreadcrumb = {
    title: 'roles',
    path: [{
      text: 'list',
      route: '/u/roles/list'
    }, {
      text: 'create',
      route: '/u/roles/create-role'
    }]
}

let taskListBreadcrumb = {
  title: 'tasks',
  action: true,
  actionUrl: '/u/tasks/create-task',
  path: [{
    text: 'list',
    route: '/u/tasks/list'
  }]
}

let taskCreateBreadcrumb = {
  title: 'tasks',
  path: [{
    text: 'list',
    route: '/u/tasks/list'
  }, {
    text: 'create',
    route: '/u/tasks/create-task'
  }]
}

let activityBreadcrumb = {
  title: 'activity',
  path: [{
    text: 'list',
    route: '/u/activity/'
  }]
}

let clientListBreadcrumb = {
  title: 'clients',
  action: true,
  actionUrl: '/u/clients/create-client',
  path: [{
    text: 'list',
    route: '/u/clients/list'  
  }]
}

let clientCreateBreadcrumb = {
  title: 'clients',
  path: [{
    text: 'list',
    route: '/u/clients/list'
  }, {
    text: 'create',
    route: '/u/clients/create-client'
  }]
}

let myTasksBreadcrumb = {
  title: 'my tasks',
  path: [{
    text: 'list',
    route: '/u/my-tasks/list'
  }]
}

let workDiaryMainBreadcrumb = {
  title: 'work diary',
  path: [{
    text: 'list',
    route: '/u/work-diary'
  }]
}

let routesNew = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/InitialView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/TheLandingPage.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/components/LogIn.vue')
      }, 
    ]
  }, 
  {
    path: '/u',
    name: 'u',
    component: () => import('@/views/MainView.vue'),
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/components/TheProfile.vue')
      },
      {
        path: 'admin',
        name: 'admin_panel',
        meta: {
          protected: true
        },
        component: () => import('@/views/AdminPanelView.vue'),
        children: [
        {
          path: 'orgs',
          component: () => import('@/views/OrganizationsView.vue'),
          children: [
            {
              path: '',
              alias: '/',
              name: 'organizations_list',
              component: () => import('@/components/OrganizationsList.vue'),
              meta: {
                breadcrumb: AdminPanelOrgListBreadcrumb
              }
            },
            {
              path: 'create-org',
              name: 'organizations_create',
              component: () => import('@/components/OrganizationsCreate.vue'),
              meta: {
                breadcrumb: AdminPanelCreateOrgBreadcrumb
              }
            },
            {
              path: ':orgId/create-admin',
              name: 'organizations_create_admin',
              params: ['orgId'],
              component: () => import('../components/UserCreate.vue'),
              meta: {
                breadcrumb: AdminCreateBreadcrumb
              }
            },
            {
              path: ':orgId/',
              name: 'organizations_data',
              params: ['orgId'],
              component: () => import('../components/OrganizationsData.vue')
            }
          ]
        }]
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SettingView.vue'),
        meta: {
          breadcrumb: settingBreadcrumb,
        }
      },
      {
        path: 'users',
        component: () => import('@/views/UsersView.vue'),
        children: [
          {
            path: '',
            alias: 'list',
            name: 'users_list',
            component: () => import('@/components/UserList.vue'),
            meta: {
              breadcrumb: userListBreadcrumb
            },
          },
          {
            path: 'create-user',
            name: 'create_user',
            component: () => import('@/components/UserCreate.vue'),
            meta: {
              protected: true,
              breadcrumb: createUserBreadcrumb
            }
          }
        ] 
      },
      //////////////////////////
      {
        path: 'my-tasks',
        component: () => import('@/views/MyTasksView.vue'),
        children: [
          {
            path: '',
            alias: 'list',
            name: 'my_tasks_list',
            component: () => import('@/components/MyTasksList.vue'),
            meta: {
              breadcrumb: myTasksBreadcrumb
            }
          }
        ],
      },
      /////////////////////////
      {
        path: 'roles',
        component: () => import('@/views/RoleView.vue'),
        children: [
          {
            path: '',
            alias: 'list',
            name: 'roles_list',
            component: () => import('@/components/RoleList.vue'),
            meta: {
              breadcrumb: roleListBreadcrumb
            }
          },
          {
            path: 'create-role',
            name: 'create_role',
            component: () => import('@/components/RoleCreate.vue'),
            meta: {
              protected: true,
              breadcrumb: roleCreateBreadcrumb
            }
          },
        ]
      },
      ////////////////////////
      {
        path: 'tasks',
        component: () => import('@/views/TasksView.vue'),
        children: [
          {
            path: '',
            alias: 'list',
            name: 'tasks_list',
            component: () => import('@/components/TasksList.vue'),
            meta: {
              breadcrumb: taskListBreadcrumb
            }
          },
          {
            path: 'create-task',
            name: 'create_task',
            component: () => import('@/components/TasksCreate.vue'),
            meta: {
              breadcrumb: taskCreateBreadcrumb,
              protected: true
            }
          },
        ]
      },
      /////////////////////
      {
        path: 'activity',
        children: [
          {
            path: '',
            alias: 'list',
            name: 'activity',
            component: () => import('@/components/UserActivity.vue'),
            meta: {
              protected: true,
              breadcrumb: activityBreadcrumb
            }
          }
        ]
      },
      ////////////////////
      {
        path: 'clients',
        component: () => import('@/views/ClientView.vue'),
        children: [
          {
            path: '',
            alias: 'list',
            name: 'clients_list',
            component: () => import('@/components/ClientsList.vue'),
            meta: {
              breadcrumb: clientListBreadcrumb
            }
          },
          {
            path: 'create-client',
            name: 'create_client',
            component: () => import('@/components/ClientCreate.vue'),
            meta: {
              protected: true,
              breadcrumb: clientCreateBreadcrumb
            }
          },
        ]
      },
      ////////////////////////
      {
        path: 'work-diary',
        children: [{
          path: '',
          alias: 'list',
          name: 'work_diary',
          component: () => import('@/components/WorkDiaryMain.vue'),
          meta: {
            protected: true,
            breadcrumb: workDiaryMainBreadcrumb
          }
        }]
      },
      ///////////////////////
      {
        path: '/:pathMatch(.*)', 
        name: 'not-found', 
        component: () => import('@/components/NotFound.vue')
      },
      {
        path: '/no-access',
        name: 'no_access',
        component: () => import('@/components/NoAccess.vue')
      }
    ]
  },
  { 
    path: '/:pathMatch(.*)', 
    component: () => import('@/components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routesNew
})


router.beforeEach((to)=>{
  if (to?.meta?.protected == true) {
    const userRights = store.getters['rights/getUserRights']

    if (!userRights.length) {
      getUserRights()
      .then((res) => {
        store.commit('rights/setUserRights', res?.data?.userRights)
        const allow = userRights.some((right) => right.code_name == to.name)
        if (allow == false) return { name: 'no_access'}
        return true    
      })
    } 
    else {
      const allow = userRights?.some((right) => right?.code_name == to?.name)
      if (allow == false) return { name: 'no_access'} 
      return true   
    }
  }
  else return true
})


export default router