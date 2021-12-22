import { http } from '../request.js'

// 添加渠道信息
export function addChannel(query) {
	return http.post('recycle/channel/add', query)
}