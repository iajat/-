import request from "@/api/request";
//登录
export const login = (user, password, typeUser) => request({ url: `/api/login?id=${user}&password=${password}&type=${typeUser} `, method: 'post' })

//  data:{id:user,password:password,type:typeUser}
//获取用户信息
export const getInfo = () => request({ url: '/sscm/getinfo' })

//更改学生信息
export const updataStudentInfo = (data) => request({ url: '/sscm/upStudentInfo', data: data, method: 'put' })

//更改老师信息
export const updataTeachInfo = (data) => request({ url: 'sscm/upTeacherInfo', data, method: 'put' })

// 更改密码
export const updataPassword = (password) => request({ url: `/sscm/upPassword/${password}`, method: 'put' })

//老师获取选过这课程的学生
export const getStudentInfoList = (pageNum, pageSize) => request({ url: `/sscm/getStuscore/${pageNum}/${pageSize}` })

//老师删除学生      
export const delStudent = (id) => request({ url: `/sscm/delStuscore/${id}`, method: 'delete' })

// 添加学生成绩
export const updataStudentGrade = data => request({ url: '/sscm/updateStuScore', data: data ,method:'put' })

//学生抢课
export const stdentSelect = data=> request({url:`/sscm/addStuscore`,data:data,method:'post'})

// /sscm/admin/getStudent  获取所有学生信息

export const getAllStduent = (pageNum,pageSize) => request({url:`/sscm/admin/getStudent/${pageNum}/${pageSize}`,method:'get'})

///sscm/admin/getTeacher    分页获取老师信息
export const  getAllTeach = (pageNum,pageSize) => request({url:`/sscm/admin/getTeacher/${pageNum}/${pageSize}`,method:'get'})

///sscm/admin/getAllMajor 获取所有专业信息
export const getAllMajor = ()=> request({url:`/sscm/admin/getAllMajor`})


///sscm/admin/addStudent 添加学生
export const addStudent = (data)=>request ({url:`/sscm/admin/addStudent`,data:data,method:'post'})

///sscm/admin/upStudent 更新学生信息

export const updataStudent =data =>request ({url:`/sscm/admin/upStudent`,data:data,method:'put'})

export const getNoCouTea = function(){ return request({url:'/sscm/admin/getNoCouTea'})}

export const getNoTeaCou = ()=> request({url:`/sscm/admin/getNoTeaCou`})

///sscm/admin/getCourse 获取所有课
export const getCourse = ()=>request({url:`/sscm/admin/getCourse`})

///sscm/admin/getAllDept 获取所有学院
export const getDept = () =>request({url:`/sscm/admin/getAllDept`})  //接口有问题，傻逼后端

///sscm/admin/upTeacher 更新老师信息
export const upTeacher = (data)=>request({url:`/sscm/admin/upTeacher`,data:data,method:'put'})

///sscm/admin/addTeacher 新加老师
export const addTeacher = data =>request({url:`/sscm/admin/addTeacher`,data:data,method:'post'})

///sscm/admin/getStudent/{id} 查询学生

export const getStudentInfo = id => request({url:`/sscm/admin/getStudent/${id}`})

///sscm/admin/getTeacher/{id} 查询老师
export const getTeacherInfo = id => request({url:`/sscm/admin/getTeacher/${id}`})

///sscm​/admin​/addCourse 添加课程
export const addCourse = data => request({url:'/sscm/admin/addCourse',data:data,method:'post'})

///sscm/getAllScore 获取所有可选课程
export const getAllScore = () =>request({url:`/sscm/getAllScore`})

///sscm​/addStuscore 抢课
export const addStuscore = data =>request({url:`/sscm/addStuscore`,data:data,method:'post'})

///sscm/admin/delStudent/{id} 删除学生
export const delStduent = id =>	request({url:`/sscm/admin/delStudent/${id}`,method:'delete'})

///sscm/admin/delTeacher/{id} 删除老师
export const delTeach = id =>request({url:`/sscm/admin/delTeacher/${id}`,method:'delete'})

///sscm/delStuscore/{id} 老师删除学生
export const teachDelStudent = id => request({url:`/sscm/delStuscore/${id}`,method:'delete	'})