import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userid: null,
		waitPayOrder: {},
		orderReload: false,
		recycleReload: false,
		ddTab: -1,
		config: null,
	},
	mutations: {
		SET_USERID: (state, userid) => {
			state.userid = userid
		},
		SET_WAITPAYORDER: (state,waitPayOrder) => {
			state.waitPayOrder = waitPayOrder
		},
		SET_ORDERRELOAD: (state,orderReload) => {
			state.orderReload = orderReload
		},
		SET_RECYCLERELOAD: (state,recycleReload) => {
			state.recycleReload = recycleReload
		},
		SET_DDTAB: (state,ddTab) => {
			state.ddTab = ddTab
		},
		SET_CONFIG: (state, config) => {
			state.config = config
		}
	},
	getters: {
		userid: state => state.userid,
		waitPayOrder: state => state.waitPayOrder,
		recycleReload: state => state.recycleReload,
		orderReload: state => state.orderReload,
		ddTab: state => state.ddTab,
		config: state => state.config
	}
})
