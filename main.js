import App from './App'
import Vue from 'vue'
import uView from 'uview-ui'
import {
	showSuccess,
	showError
} from './utils/app.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView)

// 挂载全局函数
Vue.prototype.$success = showSuccess
Vue.prototype.$error = showError

const app = new Vue({
    ...App
})

app.$mount()