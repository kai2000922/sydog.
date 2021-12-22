import { http } from '../request.js'

// 获取商品列表
export function getGoods(query) {
	return http.post('/recycle/goods/list', query)
}

// 根据id查找商品
export function getGoodsById(query, custom = {}) {
	return http.request({
		url: '/recycle/goods/listByID',
		method: 'POST',
		data: query,
		custom: custom
	})	
}

// 获取传送带展示商品列表
export function getStoreList() {
	return http.get('/recycle/goods/getStoreList')
}