import { createRouter, createWebHistory } from 'vue-router'
import InitialView from '../views/InitialView.vue'
import store from '@/store/index.js'

import { defineAsyncComponent } from 'vue'
import SkeletonCard from '../components/SkeletonCard.vue'

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
const MyTasksList = defineAsyncComponent({
  loader: () => import('../components/MyTasksList.vue'),
  loadingComponent: SkeletonCard,
  delay: 0
})
const ActivityList = defineAsyncComponent({
  loader: () => import('../components/UserActivity.vue'),
  loadingComponent: SkeletonCard,
  delay: 0
})

const routes = [{
    path: '/',
    alias: '/portal-deploy',
    name: 'main',
    component: InitialView,
    children: [{
      path: '/',
      alias: '/login',
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
          meta: {protected: true},
          component: () => import('../components/UserCreate.vue')
        }, {
          path: 'list',
          alias: '',
          name: 'users_list',
          component: UsersList,
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
        meta: {protected: true},
        component: () => import('../components/RoleCreate.vue')
      }, {
        path: 'list',
        alias: '',
        name: 'roles_list',
        component: RolesList,
      }, {
        path: 'edit/:editRoleId',
        name: 'edit_role',
        meta: {protected: true},
        component: () => import('../components/RoleCreate.vue'),
        props: true
      }]
    },{
      path: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      children: [{
        path: 'list',
        alias: '',
        name: 'projects_list',
        component: () => import('../components/ProjectsList.vue')
      }, {
        path: 'create',
        name: 'create_project',
        component: () => import('../components/ProjectsCreate.vue')
      }]
    }, {
      path: 'clients',
      name: 'clients_list',
      component: () => import('../views/ClientView.vue'),
      children: [{
        path: 'list',
        alias: '',
        name: 'clients_list',
        component: ClientsList
      }, {
        path: 'create-client',
        name: 'create_client',
        component: () => import('../components/ClientCreate.vue')
      }]
    }, {
      path: 'tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      children: [{
        path: 'list',
        alias: '',
        component: TasksList
      }, {
        path: 'create-task',
        name: 'create_task',
        component: () => import('../components/TasksCreate.vue')
      }
      //, {
      //   path: 'edit-task',
      //   name: 'edit_task',
      //   component: () => import('../components/TasksCreate.vue'),
      //   props: true,        
      // }
      ]
    }, {
      path: 'my-tasks',
      name: 'my_tasks',
      component: () => import('../views/MyTasksView.vue'),
      children: [{
        path: 'list',
        alias: '',
        name: 'my_tasks_list',
        component: MyTasksList
      }]
    }, {
      path: 'activity',
      name: 'activity',
      meta: {protected: true},
      component: ActivityList
    }]
  }
]    
      
    

const router = createRouter({
  // mode: 'hash',
  base: 'portal-deploy',
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to)=>{
  if (to?.meta.protected) {
    const userRights = store.getters['rights/getUserRights']
    const allow = userRights.some((right) => right.code_name == to.name)
    if (!allow) return { name: 'no_access'}
  }
})


export default router