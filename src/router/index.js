// 导入vue模块
import Vue from 'vue'
// 导入路由模块
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
// 使用路由
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home }
  ]
})
export default router
