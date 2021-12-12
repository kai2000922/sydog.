import { http } from '../request.js'

// 获取订单支付情况
export function queryOrderStatus(query, custom = {}) {
	return http.request({
		url: '/ali/queryOrderStatus',
		method: 'POST',
		data: query,
		custom: custom
	})
}

// 获取订单号
export function queryOrderNum(query, custom = {}) {
	return http.request({
		url: '/ali/queryOrderNum',
		method: 'POST',
		data: query,
		custom: custom
	})
}