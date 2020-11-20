import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    goodsCart: []
  },
  mutations: {
    //mutations的唯一目的就是修改state中的变量状态，其中的每个方法尽可能完成的事件比较单一
    //比较复杂的操作放在actions里操作，在actions里进行commit操作，在组件的方法里用dispatch调用actions
    addCounter(state,payload) {
      payload.count += 1
    },
    addToCart(state,payload) {
      state.goodsCart.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      //let oldproduct = null
      //for(let item in state.goodsCart) {
      //  if(item.iid === payload.iid) {
      //    oldproduct = item
      //  }
      //}
      return new Promise((resolve,reject) => {
        let oldproduct = context.state.goodsCart.find(item => item.iid === payload.iid)
        if (oldproduct) {
          context.commit('addCounter',oldproduct)
          resolve('当前商品数量+1')
        } else {
          payload.count = 1
          payload.checked = true
          context.commit('addToCart',payload)
          resolve('添加商品成功')
        }
      })
    }
  },
  getters: {
    productNums(state) {
      return state.goodsCart.length
    },
    productList(state) {
      return state.goodsCart
    }
  },
  modules: {
  }
})

export default store
