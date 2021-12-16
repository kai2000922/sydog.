import { http, BASE_URL } from './request.js'
import store from '@/store'
import qs from 'qs'

// 获取小程序配置
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

// 跳转其他小程序
export function getMiniProgram(url) {
	let result = {
		appId: null,
		page: null,
		param: {},
		status: true
	}
	let a = url.split('?')
	let b = a[1]
	let c = a.length === 3 ? a[2] : null
	let d = b.split('&')
	d.forEach(f => {
		f = f.split('=')
		if(f[0] === 'appId') {
			result.appId = f[1]
		}
		if(f[0] === 'page') {
			let g = unescape(f[1])
			let h = g.split('?')
			result.page = unescape(h[0])
			if(h.length === 2) {
				result.param = qs.parse(h[1])
			}
		}
	})
	if(!result.appId || !result.page) {
		result.status = false
		return result
	}
	if(c != null) {
		c.split('&').forEach(m => {
			m = m.split('=')
			if(m.length === 2) result.param[m[0]] = m[1]
		})
	}
	return result
}

// 渠道
export function sendChannel(channelName, links = '', remark = ''){
	if (channelName != null){
		http.post('recycle/channel/add', {channelName: channelName, links: links ? links + '?channelName=' + channelName : links, remark: remark})
		.then(res => {})
		.catch(err => { tip.confirm('渠道信息添加失败', true).then(() => {}) })
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
			if(config.activity) {
				config.activity.map(v => {
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
			}, 700)
		}
	}
}

