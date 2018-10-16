
<template>
  <div>
    <div class="couponContent gray_bg">
      <view-box ref="viewBox" :body-padding-bottom="0">
        <div ref="viewBoxBody">
          <div style="height:44px;">
            <sticky  scroll-box="vux_view_box_body" :check-sticky-support="false">
              <tab :line-width="2" custom-bar-width="60px" active-color='#222'>
                <tab-item @on-item-click="changeItem" selected>未使用</tab-item>
                <tab-item @on-item-click="changeItem">已使用</tab-item>
                <tab-item @on-item-click="changeItem">已过期</tab-item>
              </tab>
            </sticky>
          </div>
          <div class="couponList" v-if="selectIndex==0">
            <ul>
              <li v-for="(coupon, index) in couponList1">
                <h1>全品类</h1>
                <div class="couponInfo">
                  <div class="priceInfo">
                    <span>&yen;</span><b>100</b><span>[满1000可用]</span>
                  </div>
                  <div class="time">2017-09-15 至 2018-09-14</div>
                </div>
              </li>
            </ul>
            <load-more :tip="couponPager1.finish?'没有更多了':''" :show-loading="!couponPager1.finish"></load-more>
          </div>
          <div class="couponList" v-if="selectIndex==1">
            <ul>
              <li v-for="(coupon, index) in couponList2">
                <h1>全品类</h1>
                <div class="couponInfo isUsed">
                  <div class="priceInfo">
                    <span>&yen;</span><b>100</b><span>[满1000可用]</span>
                  </div>
                  <div class="time">2017-09-15 至 2018-09-14</div>
                </div>
              </li>
            </ul>
            <load-more :tip="couponPager2.finish?'没有更多了':''" :show-loading="!couponPager2.finish"></load-more>
          </div>
          <div class="couponList" v-if="selectIndex==2">
            <ul>
              <li v-for="(coupon, index) in couponList3">
                <h1>全品类</h1>
                <div class="couponInfo isPast">
                  <div class="priceInfo">
                    <span>&yen;</span><b>100</b><span>[满1000可用]</span>
                  </div>
                  <div class="time">2017-09-15 至 2018-09-14</div>
                </div>
              </li>
            </ul>
            <load-more :tip="couponPager3.finish?'没有更多了':''" :show-loading="!couponPager3.finish"></load-more>
          </div>
        </div>
      </view-box>
    </div>

    <div class="footerBtn">
      <a class="greenBtn_nob" @click="showDialog=true">兑换</a>
    </div>

    <!--兑换优惠券-->
    <div class="diyDialog gray_bg" :class="{show:showDialog}">
      <x-header title="兑换优惠券" :left-options="{backText: '',preventGoBack:true}" @on-click-back="showDialog=false"/>
      <group class="firstGroup">
        <x-input title="" :max="50" placeholder="请输入激活码" v-model="form.code"></x-input>
      </group>
      <div class="btnGroup m_20">
        <x-button class="yellowBtn" @click.native="toExchange">确定兑换</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import  { ConfirmPlugin, LoadingPlugin, AlertPlugin, ToastPlugin } from 'vux'
  Vue.use(ConfirmPlugin);
  Vue.use(LoadingPlugin);
  Vue.use(AlertPlugin);
  Vue.use(ToastPlugin);

  import http from "@/http";

  import {
    TransferDom,
    Cell, XInput, Group, Flexbox, FlexboxItem, XButton, Popup, ViewBox, Sticky, Tab, TabItem, LoadMore, XHeader
  } from 'vux'

  export default {
    props: ['address'],
    directives: {
      TransferDom
    },
    components: {
      Cell, XInput, Group, Flexbox, FlexboxItem, XButton, Popup, ViewBox, Sticky, Tab, TabItem, LoadMore, XHeader
    },
    methods: {
      /*改变选中*/
      changeItem(index){
        this.selectIndex = index;
      },
      /*去兑换*/
      toExchange(){
      }
    },
    mounted(){

    },
    watch:{

    },
    data () {
      return {
        selectIndex:0,
        couponList1:[1,2,3,4,5,6],
        couponList2:[1,2,3,4,5,6],
        couponList3:[1,2,3,4,5,6],
        couponPager1:{
          currPage:1,
          pageSize:20,
          finish:false,
          isLoading:false
        },
        couponPager2:{
          currPage:1,
          pageSize:20,
          finish:false,
          isLoading:false
        },
        couponPager3:{
          currPage:1,
          pageSize:20,
          finish:false,
          isLoading:false
        },
        form:{
          code:''
        },
        showDialog:false
      }
    }
  }

</script>

<style lang="less" scoped>
  .firstGroup /deep/ .vux-cell-value{ color:#000;}
  .couponContent{ position: fixed; left: 0; top:0; width: 100%; bottom:0;}
  .couponList ul{ margin: 20px; }
  .couponList li{ background-color: #fff; margin-bottom: 20px; border: 1px solid #dcdcdc; padding: 10px 20px;}
  .couponList li h1{ line-height: 60px; border-bottom: 1px dotted #dcdcdc; font-weight: normal;}
  .couponList li .priceInfo{}
  .couponList li .priceInfo b{ font-size: 30PX; margin-right: 20px;}
  .couponList li .time{ font-size: 12PX; color:#999;}
  .couponInfo{ position: relative;}
  /*.couponInfo.isUsed:after{ content:''; width: 140px; height: 115px; position: absolute; right:0; top:-20px;*/
    /*background: url(./../assets/images/isUsed.png) no-repeat left top; background-size: 140px 115px;}*/
  /*.couponInfo.isPast:after{ content:''; width: 140px; height: 115px; position: absolute; right:0; top:-20px;*/
    /*background: url(./../assets/images/isPast.png) no-repeat left top; background-size: 140px 115px;}*/
</style>
