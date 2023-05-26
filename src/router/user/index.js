
export default {
    path: '/student',
    name: 'student',
    component: () => import('@/components/user'),
    children: [
        {
            path:'/',
            name:'classinfi',
            redirect: '/student/classinfi'
        },
        {
            path: '/student/selectclass',
            name: 'selectclass',
            component: () => import('@/views/student/selectClass'),
        },
        {
            path: '/student/classinfi',
            name: 'classinfi',
            component: () => import('@/views/student/classInfo'),
        },
        {
            path: '/userinfi',
            name: 'userinfi',
            component:()=>import('@/components/userInfo'),
            children:[
                {
                    path:'/',
                    redirect: '/userinfi/updataUserInfi'
                },
                {
                    path:'/userinfi/updataUserInfi',
                    name:'updataUser',
                    component:()=>import('@/components/userInfo/person')
                },
                {
                    path:'/userinfi/updataPassword',
                    name:'updataPassword',
                    component:()=>import('@/components/userInfo/updataPassword')
                }
            ]
        },
        
    ]
}