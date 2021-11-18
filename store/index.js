import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userid: '',
		waitPayOrder: {}
	},
	mutations: {
		SET_USERID: (state, userid) => {
			state.userid = userid
		},
		SET_WAITPAYORDER: (state,waitPayOrder) => {
			state.waitPayOrder = waitPayOrder
		}
	},
	getters: {
		userid: state => state.userid,
		waitPayOrder: state => state.waitPayOrder
	}
})
