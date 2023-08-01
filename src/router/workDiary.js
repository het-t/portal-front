const breadcrumb = {
    list: {
      title: 'work diary',
    path: [{
        text: 'list',
        route: '/u/work-diary'
    }]
  }
}

const routes = {
    path: 'work-diary',
    children: [{
        path: '',
        alias: 'list',
        name: 'work_diary',
        component: () => import('@/components/WorkDiaryMain.vue'),
        meta: {
        protected: true,
        breadcrumb: breadcrumb.list
        }
    }]
}

export default routes