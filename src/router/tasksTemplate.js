const breadcrumb  = {
  list: {
    title: 'task templates',
    path: [{
      text: 'list',
      route: '/u/task-templates'
    }]
  }
}

const routes = {
  path: 'task-templates',
  component: () => import('@/views/TasksMasterView.vue'),
  children: [
    {
      path: '',
      alias: 'list',
      name: 'edit_tasks_master',
      component: () => import('@/components/TasksMasterList.vue'), 
      meta: {
        protected: true,
        breadcrumb: breadcrumb.list
      }
    }
  ]
}
export default routes