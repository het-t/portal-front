import { createRouter, createWebHashHistory } from 'vue-router'
import InitialView from '../views/InitialView.vue'
import store from '@/store/index.js'

import { defineAsyncComponent } from 'vue'
import SkeletonCard from '../skeletons/SkeletonCard.vue'
import NotFound from '@/components/NotFound.vue'

const UsersList = defineAsyncComponent({ 
  loader: () => import("@/components/UserList.vue"), 
  loadingComponent: SkeletonCard,
  delay: 0
})
const RolesList = defineAsyncComponent({
  loader: () => import('../components/RoleList.vue'),
  loadingComponent: SkeletonCard,
  delay: 0
})
const ClientsList = defineAsyncComponent({
  loader: () => import('../components/ClientsList.vue'),
  loadingComponent: SkeletonCard,
  delay: 0
})
const TasksList = defineAsyncComponent({
  loader: () => import('../components/TasksList.vue'),
  loadingComponent: SkeletonCard,
  delay: 0
})
// const MyTasksList = defineAsyncComponent({
  // loader: () => 
//   loadingComponent: SkeletonCard,
//   delay: 0
// })
const ActivityList = defineAsyncComponent({
  loader: () => import('../components/UserActivity.vue'),
  loadingComponent: SkeletonCard,
  delay: 0
})

const routes = [
  {
    path: '/',
    alias: '/#',
    name: 'main',
    component: InitialView,
    children: [{
      path: '/',
      alias: 'login',
      name: 'login',
      component: () => import('../components/LogIn.vue')
    }]
  },
  {
    path: '/u',
    name: 'u',
    component: () => import('../views/MainView.vue'),
    children: [
      {
        path: '/no-access',
        name: 'no_access',
        component: () => import('../components/NoAccess.vue')
      },{
      path: 'users',
      alias: 'users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      children: [{
          path: 'create-user',
          name: 'create_user',
          component: () => import('../components/UserCreate.vue'),
          meta: {
            protected: true,
            breadcrumb: {
              title: 'create user',
              path: [{
                text: 'list',
                route: '/u/users/list'
              }, {
                text: 'create',
                route: '/u/users/create-user'
              }]
            }
          },
        }, {
          path: 'list',
          alias: '',
          name: 'users_list',
          component: UsersList,
          meta: {
            breadcrumb: {
              title: 'users',
              action: true,
              actionUrl: '/u/users/create-user',
              path: [{
                text: 'list',
                route: '/u/users/list'
              }]
            }
          }
        }, 
        {
          path: 'edit/:editUserId',
          name: 'edit_user',
          meta: {protected: true},
          component: () => import('../components/UserCreate.vue'),
          props: true,
        }
      ]
    }, {
      path: 'roles',
      name: 'roles',
      component: () => import('../views/RoleView.vue'),
      children: [{
        path: 'create-role',
        name: 'create_role',
        component: () => import('../components/RoleCreate.vue'),
        meta: {
          breadcrumb: {
            title: 'roles',
            path: [{
              text: 'list',
              route: '/u/roles/list'
            }, {
              text: 'create',
              route: '/u/roles/create-role'
            }]
          },
          protected: true
        },
      }, {
        path: 'list',
        alias: '',
        name: 'roles_list',
        component: RolesList,
        meta: {
          breadcrumb: {
            title: 'roles',
            action: true,
            actionUrl: '/u/roles/create-role',
            path: [{
              text: 'list',
              route: '/u/roles/list'
            }]
          }
        }
      }, {
        path: 'edit/:editRoleId',
        name: 'edit_role',
        meta: {
          breadcrumb: [{
            title: 'edit role',
            path: [{
              text: 'list',
              route: '/u/roles/list'
            }, {
              text: 'edit',
              route: '/u/roles/edit/:editRoleId',
            }]
          }],
          protected: true
        },
        component: () => import('../components/RoleCreate.vue'),
        props: true
      }]
    },{
      path: 'clients',
      name: 'clients_list',
      component: () => import('../views/ClientView.vue'),
      children: [{
        path: 'list',
        alias: '',
        name: 'clients_list',
        component: ClientsList,
        meta: {
          breadcrumb: {
            title: 'clients',
            action: true,
            actionUrl: '/u/clients/create-client',
            path: [{
              text: 'list',
              route: '/u/clients/list'  
            }]
          }
        }
      }, {
        path: 'create-client',
        name: 'create_client',
        component: () => import('../components/ClientCreate.vue'),
        meta: {
          breadcrumb: {
            title: 'create client',
            path: [{
              text: 'list',
              route: '/u/clients/list'
            }, {
              text: 'create',
              route: '/u/clients/create-client'
            }]
          },
          protected: true,
        }}
    ]}, {
      path: 'tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      children: [{
        path: 'list',
        alias: '',
        component: TasksList,
        meta: {
          breadcrumb: {
            title: 'tasks',
            action: true,
            actionUrl: '/u/tasks/create-task',
            path: [{
              text: 'list',
              route: '/u/tasks/list'
            }]
          }
        }
      }, {
        path: 'create-task',
        name: 'create_task',
        component: () => import('../components/TasksCreate.vue'),
        meta: {
          breadcrumb: {
            title: 'create task',
            path: [{
              text: 'list',
              route: '/u/tasks/list'
            }, {
              text: 'create',
              route: '/u/tasks/create-task'
            }]
          },
          protected: true
        }
      }]
    }, {
      path: 'my-tasks',
      name: 'my_tasks',
      component: () => import('../views/MyTasksView.vue'),
      children: [{
        path: '',
        // alias: '',
        name: 'my_tasks_list',
        component: () => import('../components/MyTasksList.vue'),
        meta: {
          breadcrumb: {
            title: 'my tasks',
            path: [{
              text: 'list',
              route: '/u/my-tasks/list'
            }]
          }
        }
      }]
    }, {
      path: 'activity',
      name: 'activity',
      component: ActivityList,
      meta: {
        breadcrumb: {
          title: 'activity',
          path: [{
            text: 'list',
            route: '/u/activity/'
          }]
        },
        protected: true
      },
    }]
  }, 
  { 
    path: '/:pathMatch(.*)', 
    name: 'not-found', 
    component: NotFound
  }
]    
      
    

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from)=>{
  if (to?.meta?.protected) {
    console.log(to, from)
    const userRights = store.getters['rights/getUserRights']
    const allow = userRights?.some((right) => right?.code_name == to?.name)
    if (!allow) return { name: 'no_access'}
  }
})



export default router