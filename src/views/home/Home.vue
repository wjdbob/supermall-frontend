<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <scroll class="content"
          :probe-type="2"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore"
          ref="scroll">
    <home-swiper :banners="banners"/>
    <home-recommend :recommends="recommends"/>
    <home-feature/>
    <tab-control :titles="['流行','新款','精品']" @tabClick="tabclick" class="tab-control" ref="tabControl"/>
    <goods-list :goods="goodlist[currentType].list"/>
  </scroll>
  <!--组件默认不能监听原生事件，加上native修饰符就可以监听了-->
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
//导航栏
import NavBar from 'components/common/navbar/NavBar.vue'
//轮播图
import HomeSwiper from './childCompents/HomeSwiper.vue'
//产品推荐
import HomeRecommend from './childCompents/HomeRecommend.vue'
import HomeFeature from './childCompents/HomeFeature.vue'
//产品列表
import GoodsList from 'components/content/goods/GoodsList.vue'
import tabControl from 'components/content/tabControl/tabControl.vue'
//滚动组件
import scroll from 'components/common/scroll/Scroll.vue'
//回到顶部组件
import backTop from 'components/content/backTop/backTop.vue'
//数据请求
import {getHomeMultidata,getHomeGoods} from 'network/home.js'


export default {
name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    tabControl,
    GoodsList,
    scroll,
    backTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: 'pop',
      goodlist: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      isShowBackTop: false,
    }
  },
  methods: {
    //请求复合数据
    getMultidata() {
      getHomeMultidata().then( res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }).catch(err => {
        console.log(err)
      })
    },
    //请求商品数据
    getGoods(type) {
      const page = this.goodlist[type].page +1
      getHomeGoods(type,page).then( res => {
        this.goodlist[type].list.push(...res.data.list)
        this.goodlist[type].page = page

      }).catch(err => {
        console.log(err)
      })
    },
    //点击商品类别
    tabclick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
    //点击回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0,400)
    },
    //监听滚动位置，决定是否显示回到顶部按钮
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    //上拉加载更多
    loadMore() {
      this.getGoods(this.currentType)
      this.$refs.scroll. finishPullUp()
    },
    //防抖函数，每隔delay时间调用（返回）func函数
    debounce(func,delay) {
      let timer = null
      return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
    },
    //等轮播图片加载完成后获取tabControl组件的offsetTop，所有组件都有属性$el，用于获取组件中的元素

  },
  created() {
    //请求多个数据
    this.getMultidata()
    //请求商品数据
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')
  },
  mounted() {
    //放在monted里监听图片加载完成保证可以拿到scroll对象,涉及非父子组件，我们采用事件总线来进行通讯
    //延迟200毫秒执行$refs.scroll.refresh函数，防抖动，避免频繁调用scroll.refresh
    const refresh = this.debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

  }

}
</script>

<style scoped>

#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
 }*/
</style>
