import axios from "axios";


// 进度条

import nProgress from 'nprogress';

import 'nprogress/nprogress.css'

const request = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000,
})

request.interceptors.request.use((config) => {
	// 进度条君
	nProgress.start();
	
	//请求头

	config.headers.token = localStorage.getItem('token')

	return config
})

request.interceptors.response.use((res) => {
	//进度条君撑不着啦
	nProgress.done();

	return res.data;
}, (err) => {

	//返回错误信息
	nProgress.done();
	return Promise.reject(new Error(err.message))
})

export default request