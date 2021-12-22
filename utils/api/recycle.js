import { http } from '../request.js'

// 添加回收订单
export function addRecycle(query) {
	return http.post('recycle/recycle/add', query)
}

// 获取用户回收订单
export function getRecycle(query) {
	return http.post('/recycle/recycle/list', query)
}

// 修改用户回收订单
export function editRecycle(query) {
	return http.post('/recycle/recycle/editOrder', query)
}

// 删除用户回收订单
export function deleteRecycle(query) {
	return http.post('/recycle/recycle/removeOrder', query)
}