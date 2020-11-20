<template>
<div class="buttom-bar">
  <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
  <span>全选</span>
  <span class="total-price">合计: ¥{{totalPrice}}</span>
  <span class="buy-product">去计算({{checkLength}})</span>
</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.productList.forEach(item => item.checked = false)
      }else {
        this.productList.forEach(item => item.checked = true)
      }
    }
  },
  computed: {
    ...mapGetters(['productList']),
    totalPrice() {
      return this.productList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.productList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.productList.length !=0) {
        return !this.productList.find(item => !item.checked)
      }

    }
  }
}
</script>

<style scoped>
.buttom-bar {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: relative;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.buttom-bar .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.buttom-bar .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.buttom-bar .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
