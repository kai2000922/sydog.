import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userid: null,
		// 待支付订单
		waitPayOrder: {},
		// 重新刷新商城订单开关
		orderReload: false,
		// 重新刷新回收订单开关
		recycleReload: false,
		// 订单页tab
		ddTab: -1,
		// 小程序配置（如首页banner，商城页banner）
		config: null,
		// 活动界面配置（如活动页banner，优惠券）
		activityCongfig: null,
		// 活动id(默认为2)
		hdid: 2
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
		},
		SET_ACTIVITYCONFIG: (state, activityConfig) => {
			state.activityConfig = activityConfig
		},
		SET_HDID: (state, hdid) => {
			state.hdid = hdid
		}
	},
	getters: {
		userid: state => state.userid,
		waitPayOrder: state => state.waitPayOrder,
		recycleReload: state => state.recycleReload,
		orderReload: state => state.orderReload,
		ddTab: state => state.ddTab,
		config: state => state.config,
		activityConfig: state => state.activityConfig,
		hdid: state => state.hdid
	}
})
