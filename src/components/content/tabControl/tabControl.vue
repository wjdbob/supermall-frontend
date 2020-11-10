<template>
<div class="tab-control">
  <div v-for="(item,index) in titles" class="tab-control-item"
       :class="{active: index === currentIndex}" @click="itemclick(index)">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "tabControl",
  data(){
   return {
     currentIndex: 0
   }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index
      this.$emit("tabClick",index)
    }
  },
  props: {
    titles: {
      type: Array,
      //当type是对象或者数组时deault要写成函数的形式default()
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint)
}
</style>
