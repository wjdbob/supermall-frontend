import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
//npm install fastclick
import FastClick from 'fastclick'

Vue.config.productionTip = false
//给vue的原型vue.prototype定义一个$bus赋值一个vue实例，然后this.$bus.$on()进行事件监听
Vue.prototype.$bus = new Vue()
//安装toast插件,这里会执行toast插件的install函数
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
