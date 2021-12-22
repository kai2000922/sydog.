import { http } from '../request.js'

// 获取用户信息
export function getUser(query) {
	return http.post('/recycle/user/list', query)
}