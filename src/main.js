import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 导入路由
import router from '@/router'
import axios from '@/axios'
import myPlugin from '@/components'
import '@/styles/index.css'
Vue.use(myPlugin)
Vue.prototype.$http = axios
// Vue.prototype.$store = store
Vue.use(ElementUI)

new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
