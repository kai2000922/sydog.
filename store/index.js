import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userid: ''
	},
	mutations: {
		SET_USERID: (state, userid) => {
			state.userid = userid
		}
	},
	getters: {
		userid: state => state.userid
	}
})
