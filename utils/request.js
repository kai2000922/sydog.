import Request from '@/utils/luch-request/index.js'
import tip from './tip.js'

// const BASE_URL = 'https://49.235.238.110:8080'
const BASE_URL = 'https://hkkkkk.cn:8080'
// const BASE_URL = 'https://192.168.0.101:8080'

const http = new Request()
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = BASE_URL
	config.header = {
		'content-type': 'application/x-www-form-urlencoded',
		...config.header
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptors.response.use((response) => {
	if(tip.isLoading) {
		tip.loaded()
	}
	/* 对响应成功做点什么 可使用async await 做异步操作*/
	if (response.data.code !== 0) { // 服务端返回的状态码不等于0，则reject()
		tip.error(response.data.msg)
		return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
	}
	return response
}, (response) => {
	if(tip.isLoading) {
		tip.loaded()
	}
	/*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(response)
	return Promise.reject(response)
})

export {
	BASE_URL,
	http
}
