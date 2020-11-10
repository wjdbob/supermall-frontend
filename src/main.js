import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//给vue的原型vue.prototype定义一个$bus赋值一个vue实例，然后this.$bus.$on()进行事件监听
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
