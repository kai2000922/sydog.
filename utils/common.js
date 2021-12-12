import { http, BASE_URL } from './request.js'
import store from '@/store'

export async function getConfig(name) {
	let config = store.getters.config
	if(config != null) {
		return name === 'all' ? config : config[name]
	} else {
		let flag = await helper.getConfigs(0)
		if(flag) return name === 'all' ? store.getters.config : store.getters.config[name]
		else return null
	}
}
// 获取图片连接
export function getImgUrl(url) {
	return BASE_URL + url
}

const helper = {
	async getConfigs(num) {
		let timer
		try {
			let res = await http.get('/recycle/config/getConfigs', {custom: {autoload: false, neglectError: true}})
			let config = JSON.parse(res.data.msg.replace(/configImgPath/g, "image"))
			console.log(config);
			if(config.banner) {
				config.banner.map(v => {
					v.image = BASE_URL + v.image
					return v
				})
			}
			if(config.store) {
				config.store.map(v => {
					v.image = BASE_URL + v.image
					return v
				})
			}
			if(config.流程图) {
				config.flow = config.流程图
				config.flow.image = BASE_URL + config.flow.image
				delete config.流程图
			}
			if(config.优惠券) {
				config.coupon = config.优惠券
				config.coupon.image = BASE_URL + config.coupon.image
				delete config.优惠券
			}
			store.commit('SET_CONFIG', config)
			clearTimeout(timer)
			return true
		} catch(e) {
			if(num >= 10) return false
			timer = setTimeout(() => {
				getConfigs(num++)
			})
		}
	}
}

