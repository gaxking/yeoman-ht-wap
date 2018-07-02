<template>
  <div class="wapper">
    <tabbar :style="{position:'fixed'}">
      <tabbar-item link="/" selected>
        <img v-if="index===1" slot="icon" src="./images/icon1.png" alt="" >
        <img v-else slot="icon" src="./images/icon1a.png" alt="" >
        <span :class="{active:index===1}" slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/search">
        <img v-if="index===2" slot="icon" src="./images/icon2.png" alt="" >
        <img v-else slot="icon" src="./images/icon2a.png" alt="" >
        <span :class="{active:index===2}" slot="label">套餐包</span>
      </tabbar-item>
      <tabbar-item link="/aboutus/aboutus">
        <img v-if="index===3" slot="icon" src="./images/icon3.png" alt="" >
        <img v-else slot="icon" src="./images/icon3a.png" alt="" >
        <span :class="{active:index===3}" slot="label">关于我们</span>
      </tabbar-item>
      <tabbar-item :link="isLogin?'/UserCenter/info':'/login'">
        <img v-if="index===4" slot="icon" src="./images/icon4.png" alt="" >
        <img v-else slot="icon" src="./images/icon4a.png" alt="" >
        <span :class="{active:index===4}" slot="label">{{isLogin?'个人中心':'登录注册'}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import { checkLogin } from '@/utils/common'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  props: [ 'foo' ],
  computed: {
    index () {
      const router = this.$route.fullPath.toLowerCase()

      if (router === '/') {
        return 1
      } else if (router === '/search') {
        return 2
      } else if (router.search(/\/aboutus/) > -1) {
        return 3
      } else if (router.search(/\/UserCenter|\/login|\/register/i) > -1) {
        return 4
      }
    },
    isLogin () {
      this.$route
      return checkLogin()
    }
  }
}
</script>

<style lang="less" scoped>
span{color:#666666}
span.active{color:#43bae4}
.wapper /deep/ .weui-tabbar{
  height:100px;
  overflow:hidden;
  img{width:52px;height:52px;}
  span{
    font-size:9px;
  }
}
</style>
