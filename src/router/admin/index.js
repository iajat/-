
export default {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin'),
    children: [

        {
            path: '/',
            name: 'pages',
            redirect: '/admin/pages'
        },
        ,
        {
            path: '/admin/pages',
            name: 'pages',
            component: () => import('@/views/admin/pages')
        },
        {
            path: '/admin/addStudent',
            name: 'addStudent',
            component: () => import('@/views/admin/addStudent')
        },
        {
            path: '/admin/updataStudent',
            name: 'updataStudent',
            component: () => import('@/views/admin/updataStudent')
        },
        {
            path: '/admin/allImport',
            name: 'allImportStudent',
            component: () => import('@/views/admin/allImportStudent')
        },
        {
            path: '/admin/addTeach',
            name: 'addTeach',
            component: () => import('@/views/admin/addTeach')
        },
        {
            path: '/admin/updataTeach',
            name: 'updataTeach',
            component: () => import('@/views/admin/updataTeach')
        },
        {
            path: '/admin/addClass',
            name: 'addClass',
            component: () => import('@/views/admin/addClass')
        },
    ]
}