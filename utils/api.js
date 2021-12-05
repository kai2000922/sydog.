import { http, BASE_URL } from './request.js'
import store from '@/store'
import tip from '@/utils/tip.js'

const api = {

	async login() {
		if(store.getters.userid) {
			return true
		}
		let flag = await this.loginReq()
		while (!flag) {
			try {
				await tip.confirm('获取用户信息失败，是否重试', true)
				flag = await this.loginReq()
			} catch (e) {
				tip.toast('用户取消授权')
				return false
			}
		}
		return true;
	},

	async loginReq() {
		try {
			let auth = await my.getAuthCode()
			tip.loading('获取用户信息中')
			let user = await http.post('/ali/auth', { authCode: auth.authCode })
			store.commit('SET_USERID', user.data.msg)
			return true
		} catch (e) {
			return false
		}
	},

	getImgUrl(url) {
		return BASE_URL + url
	},

	getShareObject(){
		return {
			title: '旧衣回收换好礼' ,
			desc: '0运费，最快2小时免费上门' ,
			path: 'page/component/view/view',
			imageUrl: 'https://hkkkkk.cn:8080/profile/upload/share.jpg',
			bgImgUrl: 'https://hkkkkk.cn:8080/profile/upload/share.jpg'
		}
	}
}

export default api
