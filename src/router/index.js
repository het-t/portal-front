import { createRouter, createWebHashHistory } from 'vue-router'
import InitialView from '../views/InitialView.vue'
import store from '@/store/index.js'

// import { defineAsyncComponent } from 'vue'
// import SkeletonCard from '../skeletons/SkeletonCard.vue'
import NotFound from '@/components/NotFound.vue'

import MainView from '@/views/MainView.vue'

import UsersList from '@/components/UserList.vue'
import UserCreate from '@/components/UserCreate.vue'

import RolesList from '@/components/RoleList.vue'
import RoleCreate from '@/components/RoleCreate.vue'

import TasksList from '@/components/TasksList.vue'
import TasksCreate from '@/components/TasksCreate.vue'

import ActivityList from '@/components/UserActivity.vue'
import ClientsList from '../components/ClientsList.vue'
import ClientCreate from '../components/ClientCreate.vue'

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

let routesNew = [
  {
    path: '/',
    name: 'main',
    component: InitialView,
    children: [
      {
        path: '',
        alias: 'login',
        name: 'login',
        component: () => import('@/components/LogIn.vue')
      }, 
    ]
  }, 
  {
    path: '/u',
    name: 'u',
    component: MainView,
    children: [
      ////////////////////////////
      {
        path: 'users',
        component: () => import('@/views/UsersView.vue'),
        children: [
          {
            path: '',
            alias: 'list',
            name: 'users_list',
            component: UsersList,
            meta: {
              breadcrumb: userListBreadcrumb
            }
          },
          {
            path: 'create-user',
            name: 'create_user',
            component: UserCreate,
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
            component: RolesList,
            meta: {
              breadcrumb: roleListBreadcrumb
            }
          },
          {
            path: 'create-role',
            name: 'create_role',
            component: RoleCreate,
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
            component: TasksList,
            meta: {
              breadcrumb: taskListBreadcrumb
            }
          },
          {
            path: 'create-task',
            name: 'create_task',
            component: TasksCreate,
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
            component: ActivityList,
            meta: {
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
            component: ClientsList,
            meta: {
              breadcrumb: clientListBreadcrumb
            }
          },
          {
            path: 'create-client',
            name: 'create_client',
            component: ClientCreate,
            meta: {
              protected: true,
              breadcrumb: clientCreateBreadcrumb
            }
          },
          {
            path: '/:pathMatch(.*)', 
            name: 'not-found', 
            component: NotFound
          }
        ]
      }
    ]
  },
  { 
    path: '/:pathMatch(.*)', 
    name: 'not-found', 
    component: NotFound
  }
]

routesNew.forEach(o => console.log(o))


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routesNew
})


router.beforeEach((to, from, next)=>{
  if (to?.meta?.protected) {
    const userRights = store.getters['rights/getUserRights']
    const allow = userRights?.some((right) => right?.code_name == to?.name)
    if (!allow) return { name: 'no_access'}
  }
  console.log(to, from)
  next()
})


export default router