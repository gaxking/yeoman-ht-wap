<template>
<div class="topHeader" v-if="true">
  <x-header :title="this.$route.meta.title" :left-options="{backText: '', preventGoBack:true}" @on-click-back="backFn">
    <router-link v-if="showHouse" to="/" slot="right" class="home-icon"></router-link>
  </x-header>
</div>
</template>

<script>
import {
  XHeader
} from 'vux'

import {isWeiXin} from '@/utils/common'

export default {
  props: {
    back: String,
    showHouse: {default:true}
  },
  components: {
    XHeader
  },
  methods: {
    backFn () {
      if(this.back){
        this.$router.push(this.back)
      }else{
        this.$router.back(-1)
      }
    }
  },
  data () {
    return {
      backPath:this.back,
      isWeiXin:isWeiXin
    }
  }
}
</script>

<style lang="less" scoped>
.topHeader .vux-header{ background-color: #fff; border-bottom: 1PX solid #f2f3f4}
.topHeader /deep/ .vux-header .vux-header-title{ color:#5f5f5f;}
.home-icon{
  display:inline-block;
  background:url(./images/index.png) no-repeat;
  background-size:36px 36px;
  width:36px;
  height:35px;
}
</style>
