export default {
    path: '/teach',
    name: 'teach',
    component: () => import('@/components/user'),
    children:[
        {
            path:'/',
            name:'selectNumber',
            redirect:'selectNumber'
        },
        {
            path:'/teach/addGrade',
            name:'addGrade',
            component:()=>import('@/views/teach/addGrade')
        },
        {
            path:'/teach/selectNumber',
            name:'selectNumber',
            component:()=>import('@/views/teach/selectNumber')
        }
    ]
}