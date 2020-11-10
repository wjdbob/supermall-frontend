<template>
<div>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper' //相当'components/common/swiper/index.js'
export default {
name: "HomeSwiper",
  data() {
    return {
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {

    }

}
</script>

<style scoped>

</style>
