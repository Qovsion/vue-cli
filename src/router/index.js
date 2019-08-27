// 导入vue模块
import Vue from 'vue'
// 导入路由模块
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Notfun from '../views/404/index.vue'
import Welcome from '../views/welcome/index.vue'
import store from '@/store'
// 使用路由
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  routes: [
    // { path: '/', redirect: '/login' },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    { path: '/login', name: 'login', component: Login },

    { path: '*', name: '404', component: Notfun }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // 获取用户信息
  const user = store.getUser()
  // console.log(user)
  if (to.path !== '/login' && !user.token) return next('/login')
  next()
})

export default router
