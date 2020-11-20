<template>
<div class="cart">
  <nav-bar class="nav-bar"><div slot="center">购物车({{productNums}})</div></nav-bar>
  <cart-list></cart-list>
  <cart-buttom-bar></cart-buttom-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childCompents/CartList'
import CartButtomBar from "./childCompents/CartButtomBar";
import { mapGetters } from 'vuex'

export default {
name: "Cart",
  components: {
    NavBar,
    CartList,
    CartButtomBar,

  },
  computed: {
    //productNums() {
    //  return this.$store.state.goodsCart.length
    //}

    //把getters映射到计算属性
    ...mapGetters(['productNums'])
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
