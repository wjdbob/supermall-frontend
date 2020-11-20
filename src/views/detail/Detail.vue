<template>
<div id="detail" class="detail">
  <detail-nav-bar @titleClick="titleClick" ref="navbar"></detail-nav-bar>
  <scroll class="content" :probe-type="2" @scroll="contentScroll" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods-info="goodsInfo"></detail-base-info>
    <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
    <detail-image-info :detail-image="detailImages"></detail-image-info>
    <detail-params-info :params-info="paramsInfo" ref="params"></detail-params-info>
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommends"></goods-list>
  </scroll>
  <!--组件默认不能监听原生事件，加上native修饰符就可以监听了-->
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
</div>
</template>

<script>
import DetailNavBar from './childCompents/DetailNavBar.vue'
import DetailSwiper from './childCompents/DetailSwiper.vue'
import DetailBaseInfo from './childCompents/DetailBaseInfo.vue'
import DetailShopInfo from './childCompents/DetailShopInfo.vue'
import DetailImageInfo from './childCompents/DetailImageInfo.vue'
import DetailParamsInfo from './childCompents/DetailParamsInfo.vue'
import DetailCommentInfo from './childCompents/DetailCommentInfo.vue'
import DetailBottomBar from "./childCompents/DetailBottomBar"
import {getDetail,Goods,getRecommend} from 'network/detail.js'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import {debounce} from 'common/utils.js'
import {backTopMixin} from 'common/mixin.js'
import { mapActions } from 'vuex'
export default {
name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,

  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailImages: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      compentoffsetTops: [],
      currentIndex: 0,
    }
  },
  methods: {
    //在methods里映射store里的actions的addCart方法，addCarr方法返回一个Promise
    ...mapActions(['addCart']),
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.compentoffsetTops[index],200)
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid
      //this.$store.dispatch('addCart',product).then( res => {
      //  console.log(res)
      //})
      this.addCart(product).then( res => {
        this.$toast.show(res)
      })
    },
    contentScroll(position) {
      const Y = -position.y
      let length = this.compentoffsetTops.length
      for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (Y >= this.compentoffsetTops[i] && Y < this.compentoffsetTops[i+1])) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = Y > 1000
    },
    refresh() {
      this.compentoffsetTops = []
      this.compentoffsetTops.push(0)
      this.compentoffsetTops.push(this.$refs.params.$el.offsetTop)
      this.compentoffsetTops.push(this.$refs.comment.$el.offsetTop)
      this.compentoffsetTops.push(this.$refs.recommends.$el.offsetTop)
      this.compentoffsetTops.push(Number.MAX_VALUE)
      this.$refs.scroll.refresh()
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      //获取数据
      const data = res.result
      //单个商品轮播图
      this.topImages = data.itemInfo.topImages
      //单个商品基本信息
      this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //商家信息
      this.shopInfo = data.shopInfo
      //商品详细信息（图片）
      this.detailImages = data.detailInfo
      //商品参数信息
      this.paramsInfo = data.itemParams
      //评论信息
      if (data.rate.cRate !==0) {
        this.commentInfo = data.rate.list[0]
      }
    }).catch(err => {
      console.log(err)
    })
    //推荐信息
    getRecommend().then(res => {
      this.recommends = res.data.list
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
    const refresh = debounce(this.refresh,200)
    this.$bus.$on('detailItemImageLoad',() => {
      refresh()
    })

  }
}
</script>

<style scoped>
.detail {
  height: 100vh;
  background-color: #ffffff;
  position: relative;
  z-index: 1;
}
.content {
  background-color: #ffffff;
  height: calc(100% - 44px);
}
</style>
