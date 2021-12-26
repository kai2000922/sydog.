import {
	http,
	BASE_URL,
	DOMAIN
} from './request.js'
import store from '@/store'
import qs from 'qs'
import tip from './tip.js'

// 登录
export async function login() {
	let userid = uni.getStorageSync('userid')
	if (userid.indexOf('2088') !== -1 || store.getters.userid) {
		if (!store.getters.userid) {
			store.commit('SET_USERID', userid)
		}
		return true
	}
	let flag = await helper.loginReq()
	while (!flag) {
		try {
			await tip.confirm('未获取到用户信息，是否重试', true)
			flag = await helper.loginReq()
		} catch (e) {
			tip.toast('用户取消授权')
			return false
		}
	}
	return true;
}

// 获取小程序配置
export async function getConfig(name) {
	let config = store.getters.config
	if (config != null) {
		return name === 'all' ? config : config[name]
	} else {
		let flag = await helper.getConfigs(0)
		if (flag) return name === 'all' ? store.getters.config : store.getters.config[name]
		else return null

	}
}

// 获取小程序活动配置
export async function getActivityConfig(name) {
	let configNum = store.getters.hdid
	let res = await helper.getActivityConfigs(configNum, 0)
	if (res) return name === 'all' ? res : res[name]
	else return null
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
		if (f[0] === 'appId') {
			result.appId = f[1]
		}
		if (f[0] === 'page') {
			let g = unescape(f[1])
			let h = g.split('?')
			result.page = unescape(h[0])
			if (h.length === 2) {
				result.param = qs.parse(h[1])
			}
		}
	})
	if (!result.appId || !result.page) {
		result.status = false
		return result
	}
	if (c != null) {
		c.split('&').forEach(m => {
			m = m.split('=')
			if (m.length === 2) result.param[m[0]] = m[1]
		})
	}
	return result
}

// 渠道
export function sendChannel(channelName, links = '', remark = '') {
	if (channelName != null) {
		http.post('recycle/channel/add', {
				channelName: channelName,
				links: links ? links + '?channelName=' + channelName : links,
				remark: remark
		})
		.then(res => {})
		.catch(err => {
			tip.confirm('渠道信息添加失败', true).then(() => {})
		})
	}
}

// 分享
export function getShareObject() {
	return {
		title: '旧衣回收换好礼',
		desc: '0运费，最快2小时免费上门',
		path: 'page/component/view/view',
		imageUrl: BASE_URL + '/profile/upload/share.jpg',
		bgImgUrl: BASE_URL + '/profile/upload/share.jpg'
	}
}

// 获取图片连接
export function getImgUrl(url) {
	return url?.indexOf(DOMAIN) != -1 ? url : BASE_URL + url
}

const helper = {
	async loginReq() {
		try {
			let auth = await my.getAuthCode()
			tip.loading('获取用户信息中')
			let user = await http.post('/ali/auth', {
				authCode: auth.authCode
			})
			store.commit('SET_USERID', user.data.msg)
			// 缓存到本地
			uni.setStorage({
				key: 'userid',
				data: user.data.msg
			});
			return true
		} catch (e) {
			return false
		}
	},

	async getConfigs(num) {
		let timer
		try {
			let res = await http.get('/recycle/config/getConfigs', {
				custom: {
					autoload: false,
					neglectError: true
				}
			})
			let config = JSON.parse(res.data.msg.replace(/configImgPath/g, "image"))
			console.log(config);
			if (config.banner) {
				config.banner.map(v => {
					v.image = BASE_URL + v.image
					return v
				})
			}
			if (config.store) {
				config.store.map(v => {
					v.image = BASE_URL + v.image
					return v
				})
			}
			// if(config.activity) {
			// 	config.activity.map(v => {
			// 		v.image = BASE_URL + v.image
			// 		return v
			// 	})
			// }
			if (config.流程图) {
				config.flow = config.流程图
				config.flow.image = BASE_URL + config.flow.image
				delete config.流程图
			}
			// if(config.优惠券) {
			// 	config.coupon = config.优惠券
			// 	config.coupon.image = BASE_URL + config.coupon.image
			// 	delete config.优惠券
			// }
			store.commit('SET_CONFIG', config)
			clearTimeout(timer)
			return true
		} catch (e) {
			if (num >= 10) return false
			timer = setTimeout(() => {
				getConfigs(num++)
			}, 700)
		}
	},

	async getActivityConfigs(configNum, num) {
		let timer
		try {
			let res = await http.post('/recycle/activityConfig/list', {
				configNum: configNum
			}, {
				custom: {
					autoload: false,
					neglectError: true
				}
			})
			let temp = res.data.rows[0]
			let banner = {
				image: temp.banners.indexOf(DOMAIN) != -1 ? temp.banners : BASE_URL + temp.banners,
				param: temp.param,
				toPages: temp.toPages
			}
			let coupon = {
				image: temp.coupon.indexOf(DOMAIN) != -1 ? temp.coupon : BASE_URL + temp.coupon,
				param: temp.param,
				toPages: temp.toPages
			}
			let flow = {
				image: temp.process.indexOf(DOMAIN) != -1 ? temp.process : BASE_URL + temp.process
			}
			let activityConfig = {
				banner: banner,
				coupon: coupon,
				flow: flow
			}
			store.commit('SET_ACTIVITYCONFIG', activityConfig)
			clearTimeout(timer)
			return activityConfig
		} catch (e) {
			if (num >= 10) return false
			timer = setTimeout(() => {
				getActivityConfigs(num++)
			}, 700)
		}
	}
}
