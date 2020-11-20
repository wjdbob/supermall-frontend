<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    refresh() {
      //保证scroll生成完成后才能调用scroll.refresh()
      this.scroll && this.scroll.refresh()
    },
    scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }

  },
  mounted() {
  //创建scroll实例挂载到wapper上
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType, //probeType是0，1时不监听滚动事件是2，3时监听滚动事件
      scrollY: true,
      click: true, //click默认是false,当为true时，scroll范围内的元素才能触发点击事件（button除外）
      pullUpLoad: this.pullUpLoad,
    })
  //监听滚动，往外发送自定义scroll事件，传送position
  //默认情况下better-scroll是不可以实时地侦听滚动位置的，加上参数：probeType:2就可以侦听不包惯性滚动，3包括惯性滚动
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
  //当pullUpLoad为true时，可以侦听上拉下载更多事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

  //数据请求完成，将数据展示出来后调用finishpullup()f才能进行下一次上拉加载更多

  }
}
</script>

<style scoped>

</style>
