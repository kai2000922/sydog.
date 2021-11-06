import App from './App'
import Vue from 'vue'
import uView from 'uview-ui'
import store from './store'
import tip from'@/utils/tip.js'
import { http } from '@/utils/request.js' 

Vue.config.productionTip = false

// tip
Vue.prototype.$tip=tip;

// request请求
Vue.prototype.$http = http

// store
Vue.prototype.$store=store;

App.mpType = 'app'

Vue.use(uView)

const app = new Vue({
	store,
    ...App
})

app.$mount()