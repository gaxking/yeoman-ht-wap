<template>
  <div
    v-if="isShow"
    class="wapper">
    <div @click="live800"><img class="call" src="./images/a.png" ></div>
    <div @click="scrollTop"><img class="top" src="./images/b.png" ></div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import { live800 } from '@/utils/common'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  props: ['index'],
  mounted () {
    window.onscroll = () => {
      var scrollT = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollT > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  methods: {
    scrollTop: () => {
      window.scrollTo(0, 0)
    },
    live800: () => {
      live800()
    }
  },
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.wapper{
  position:fixed;
  right:13px;
  bottom:122px;
  width: 90px;
  height: 180px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  text-align:center;
  >div{
    height:90px;
    line-height:90px;
    >img{
      vertical-align:middle;
    }
  }
}
.call{
  width:43px;
  height:43px;
}
.top{
  height:32px;
  width:40px;
}

</style>
