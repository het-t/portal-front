import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index.js'
import { users } from '@/api/index.js'
import tasksRoutes from './tasks.js'
import activityRoutes from './activity.js'
import rolesRoutes from './roles.js'
import clientsRoutes from './clients.js'
// import myTasks from './myTasks.js'
import usersRoutes from './users.js'
import tasksTemplateRoutes from './tasksTemplate.js'
import settingsRoutes from './settings.js'
import workDiaryRoutes from './workDiary.js'
import tagsRoutes from './tags.js'

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

let chatInternal = {
  title: 'chat'
}

let routesNew = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/InitialView.vue'),
    children: [
      {
        path: '',
        name: 'landing_page',
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
      rolesRoutes,
      usersRoutes,
      clientsRoutes,
      // myTasks,
      tasksRoutes,
      tasksTemplateRoutes,
      workDiaryRoutes,
      tagsRoutes,
      activityRoutes,
      settingsRoutes,
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
        path: 'chat',
        name: 'chat_internal',
        component: () => import('@/views/ChatInternal.vue'),
        meta: {
          breadcrumb: chatInternal
        }
      },
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
      users.getRights()
      .then((res) => {
        store.commit('rights/setUserRights', res.data)
        const allow = userRights.some((right) => right.code_name === to.name)
        if (allow === false) return { name: 'no_access'}
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