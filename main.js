import App from './App'
import Vue from 'vue'
import uView from 'uview-ui'
import {showSuccess, showError} from './utils/app.js'

Vue.config.productionTip = false

// tip
import tip from'@/utils/tip.js'
Vue.prototype.$tip=tip;

// request请求
import { http } from '@/utils/request.js' 
Vue.prototype.$http = http

App.mpType = 'app'

Vue.use(uView)

// 挂载全局函数
Vue.prototype.$success = showSuccess
Vue.prototype.$error = showError

const app = new Vue({
    ...App
})

app.$mount()