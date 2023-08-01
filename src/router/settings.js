const breadcrumb = {
    list: {
        title: 'settings',
    }
}
const routes = {
    path: 'settings',
    name: 'settings',
    component: () => import('@/views/SettingView.vue'),
    meta: {
        breadcrumb: breadcrumb.list,
    }
}

export default routes