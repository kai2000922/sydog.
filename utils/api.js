import { http, BASE_URL } from './request.js'
import store from '@/store'
import tip from'@/utils/tip.js'

const api = {
	
	getUserId() {
		return new Promise((resolve, reject) => {
			tip.loading('获取用户信息中')
			my.getAuthCode({
			  scopes: ['auth_base'],
			  success: (res) => {
			    if (res.authCode) {
				  http.post('/ali/auth',{authCode: res.authCode}).then(res => {
					  store.commit('SET_USERID', res.data.msg);
					  tip.loaded()
					  resolve(res.data.msg)
				  }).catch(res => {
					  tip.loaded()
					  tip.confirm('获取用户信息失败，是否重试', true).then(() => {
						  this.getUserId()
					  }).catch(() => {
						  reject()
					  })
				  })
			    }
			  }
			})
		})
	},
	
	getImgUrl(url) {
		return BASE_URL + url
	}
}

export default api