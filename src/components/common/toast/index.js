import Toast from './Toast'

const obj = {}
obj.install = function(Vue) {
  //1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2、根据组件构造器new出一个组件对象实例
  const toast = new toastContrustor()
  //3、手动地将组件对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //5、注册组件
  Vue.prototype.$toast = toast
}

export default obj
