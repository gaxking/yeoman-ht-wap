<template>
<div id="app" v-bind:class="{'show-btn':showFooterBtn}">
  <!--<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">-->

  <!--</transition>-->
  <router-view v-if="isInit" class="router-view" ></router-view>
  <footerBtn v-if="showFooterBtn" />
  <back2top />
</div>
</template>

<script>
import back2top from '@/components/back2top'
import {footerBtn} from '@/components'
import {isWeiXin, checkLogin} from '@/utils/common'
import {getCookies, setCookies} from '@/utils/cookies'
import VueCookie from "vue-cookie";
import http from '@/http'

export default {
  name: 'app',
  components: {
    'back2top': back2top,
    'footerBtn': footerBtn
  },
  computed: {
    showFooterBtn () {
      if (this.$route.fullPath.search('/Package/detail') > -1) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    if (isWeiXin && getCookies('unionid') && !checkLogin()) {
      http('b2bm-supplier-api/purchaser/self/loginByUnionId', {unionId: getCookies('unionid')}, {showError: false}).then((token) => {
        if (token) {
          VueCookie('x-security-token', token, 1)
          location.reload()
        }
      }).catch((res) => {
        this.isInit = true
      })
    } else {
      this.isInit = true
    }
  },
  data () {
    return {
      isInit: false
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import "./assets/css/global.less";

#app.show-btn{
  margin-bottom:100px;
}
</style>
