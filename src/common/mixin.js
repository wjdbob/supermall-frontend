//混入，抽取多个组件公共的代码进行抽取
//回到顶部组件
import backTop from 'components/content/backTop/backTop.vue'
export const backTopMixin = {
  components: {
    backTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    //点击回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0,400)
    },
  }
}
