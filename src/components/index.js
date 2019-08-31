import Mybread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    //   配置全局 组件名称 组件配置对象
    Vue.component(Mybread.name, Mybread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
