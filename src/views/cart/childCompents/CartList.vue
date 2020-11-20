<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in productList" :product="item" :key="index"></cart-list-item>
  </scroll>
</div>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from 'components/common/scroll/Scroll.vue'
import { mapGetters } from 'vuex'
export default {
name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    //在计算属性里映射store里的Getters的‘productList’
    ...mapGetters(['productList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
