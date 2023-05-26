import Vue from 'vue'
import VueRouter from 'vue-router'
import user from './user'
import teach from './teach'
import admin from './admin'
import store from '@/store'


Vue.use(VueRouter)


// 重写router跳转
const OriginPush = VueRouter.prototype.push
const OriginReplace = VueRouter.prototype.replace


VueRouter.prototype.push = function(location, resolve, reject) {
	if (reject && resolve) {
		OriginPush.call(this, location, resolve, reject)
	} else {
		OriginPush.call(this, location, () => {}, () => {})
	}
}


VueRouter.prototype.replace = function(location, resolve, reject) {
	if (reject && resolve) {
		OriginReplace.call(this, location, resolve, reject)
	} else {
		OriginReplace.call(this, location, () => {}, () => {})
	}
}


const routes = [{
		path: '/home',
		name: 'home',
		component: () => import('@/views/teach')
	},
	{
		path: '/log',
		name: 'log',
		component: () => import('@/views/log')
	},
	{
		path: '/',
		name: '/',
		component: () => import('@/views/log')
	},
	{
		path: '/err',
		name: 'err',
		component: () => import('@/pages/err')
	},
	{
		...user
	},
	{
		...teach
	},
	{
		...admin
	}

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

let type = localStorage.getItem('userType')


router.beforeEach(async (to, from, next) => {
	await store.dispatch("GetInfo");
	var teacherPermission = store.state.login.personInfo.teacherPermission
	console.log(from.path);
	if(from.path=='/log' || from.path == '/'){
		next();
	}
	if (to.matched.length == 0) {
		next('/err')
	}
	next()
	if (to.path == '/admin/updataTeach' || to.path == '/admin/pages' || to.path == '/admin/addStudent' ||
		to.path == '/admin/updataStudent' || to.path == '/admin/allImport' || to.path ==
		'/admin/addTeach' ||
		to.path == '/admin/addClass') {
		if (teacherPermission == 1) {
			next()
		} else {
			Vue.prototype.$message.error('不是管理员请不要乱跑')
			next('/log')
		}
	}
	if (to.path == '/teach/addGrade' || to.path == '/teach/selectNumber') {
		if (teacherPermission == 0) {
			next()
		} else {

			Vue.prototype.$message.error('不是老师请不要乱跑')
			next('/log')
		}
	}
	if (to.path == '/student/selectclass' || to.path == '/student/classinfi') {
		if (type == 0) {
			next()
		} else {
			Vue.prototype.$message.error('不是学生请不要乱跑')
			next('/log')
		}
	}
})



export default router