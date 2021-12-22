import { http } from '../request.js'

// 获取商城订单列表
export function getOrder(query) {
	return http.post('/recycle/orders/list', query)
}

// 退款
export function orderRefund(query) {
	return http.post('/recycle/orders/refund', query)
}

// 添加商城订单
export function addOrder(query) {
	return http.post('/recycle/orders/add', query)
}

// 修改商城订单
export function editOrder(query) {
	return http.post('/recycle/orders/edit', query)
}

// 修改商城订单状态
export function editOrderForStatus(query ,custom = {}) {
	return http.request({
		url: '/recycle/orders/updateOrderStatus',
		method: 'POST',
		data: query,
		custom: custom
	})
}