
<template>
  <div class="addressMain">
    <div class="gray_bg" :class="{bottom_100: isSelected}">
      <view-box ref="viewBox" :body-padding-bottom="0">
        <div ref="viewBoxBody">
          <div style="height:44px;">
            <sticky scroll-box="vux_view_box_body" :check-sticky-support="false">
              <tab :line-width="2" custom-bar-width="60px" active-color='#222'>
                <tab-item @on-item-click="changeType" :selected="selectedType==0">可用优惠券(3)</tab-item>
                <tab-item @on-item-click="changeType" :selected="selectedType==1">不可用优惠券(2)</tab-item>
              </tab>
            </sticky>
          </div>

          <div>
            <ul class="couponList mb_20" v-if="list && list.length>0">
              <li class="couponItem" :class="{'current':couponId==item.couponId}"
                  v-for="(item,index) in list" :key="index" @click="selectCoupon(item)">
                <div class="content">
                  <h1 class="couponType">{{item.type}}</h1>
                  <div class="couponRule">
                    &yen;<b>{{item.value|money(0)}}</b><span>[{{item.info}}]</span>
                  </div>
                  <div class="couponTime">{{item.startTime|date('yyyy-MM-dd')}} 至 {{item.endTime|date('yyyy-MM-dd')}}</div>
                </div>
                <icon v-if="couponId===item.couponId" class="icon checked" type="success-circle"></icon>
                <icon v-if="couponId!==item.couponId" class="icon unchecked" type="circle"></icon>
              </li>
            </ul>
          </div>
          <!--<div :class="{pb_20:isSelected}">-->
            <!--<a class="whiteBtn_nob" @click="add">兑换</a>-->
          <!--</div>-->
        </div>
      </view-box>
    </div>

    <div class="footerBtn" v-if="isSelected">
      <a class="greenBtn_nob" @click="ok">确认</a>
    </div>

    <!--收货地址修改-->
    <div class="diyDialog" :class="{show:showDialog}">
      <group class="firstGroup">
        <x-input title="收货人" :max="20" placeholder="请输入收货人" label-width="5" v-model="form.code"></x-input>
      </group>
      <div class="btnGroup">
        <x-button class="saveBtn" @click.native="saveCoupon">保存</x-button>
        <x-button class="cancelBtn mt_20" @click.native="cancelCoupon">取消</x-button>
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
    Cell, XInput, Group, Flexbox, FlexboxItem, XButton, Popup, PopupPicker, Scroller, ViewBox, Tab, TabItem, Sticky, Icon
  } from 'vux'

  export default {
    props: ['coupon'],
    directives: {
      TransferDom
    },
    components: {
      Cell, XInput, Group, Flexbox, FlexboxItem, XButton, Popup, PopupPicker, Scroller, ViewBox, Tab, TabItem, Sticky, Icon
    },
    methods: {
      changeType(index){
        this.selectedType = index;
      },
      selectCoupon(item){
        let coupon = this.couponObj;
        if(this.couponId){
          this.couponId = item.couponId;
        }
        this.$emit('selectCoupon', item);
      },
      ok(){
        let list = this.list;
        let couponId = this.couponId;
        let nowCoupon = {};
        list.map((v,i)=>{
          if(v['couponId']===couponId){
            nowCoupon = v;
          }
        });
        this.$emit('selectCoupon', nowCoupon);
      },
      add(){
        this.getAllRegions();
        this.form = {
          consignee:'',
          mobile:'',
          area:[],
          coupon:''
        };
        this.showDialog=true;
      },
      areaChange(value){
        if(value && value.length===3){
          this.form.area = value;
        }
      },
      onHide(closeType){
        if(closeType && this.form.area.length===0){
          this.form.area = ["1", "2", "3"]
        }
      },
      saveCoupon(){
        let form = this.form;
        let couponObj = {
          provinceId:form.area[0],
          cityId:form.area[1],
          areaId:form.area[2],
          consignee:form.consignee,
          mobile:form.mobile,
          coupon:form.coupon,
        };
        if(form && form.couponId){
          couponObj.couponId = form.couponId;
        }
        http('user-center-server/user/address/add-update', {model:couponObj})
          .then(function(suc){
            if(suc){
              this.$vux.toast.text(couponObj.couponId?'保存':'新增' + '成功!');
              this.showDialog=false;
              this.getCouponList();
            }
          }.bind(this));
      },
      cancelCoupon(){
        this.showDialog=false;
      },
      getCouponList(){
        http('user-center-server/user/address', {} )
          .then(function(suc){
            this.list = suc;
          }.bind(this));
      }
    },
    mounted(){
      console.log({coupon:this.coupon});
      let coupon = this.coupon;
      this.isSelected = true;
      this.couponObj = coupon;
      this.couponId = coupon.couponId;
      // this.getCouponList();

    },
    watch:{
      coupon(newVal){
        console.log({newVal:newVal});
        this.isSelected = true;
        this.couponObj = newVal;
        this.couponId = newVal.couponId;
      }
    },
    data () {
      return {
        isSelected:false,
        selectedType:0,
        couponObj:{},
        couponId:'',
        list:[
          {couponId:1, value:10000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:2, value:20000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:3, value:30000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:4, value:40000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:5, value:50000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:6, value:60000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:7, value:70000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:8, value:80000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:9, value:90000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
          {couponId:10, value:10000, info:'满1000可用', type:'全品类', startTime:new Date().getTime(), endTime:new Date().getTime()},
        ],
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
  .couponList{ background-color: #fff; padding: 20px;}
  .couponItem{ background-color: #fff; margin-bottom: 20px; color:#222; border: 1PX solid #eee; position: relative;}
  .couponItem.current{ border: 1PX solid #ffb000;}
  .couponItem.disabled{ color:#aaa;}
  .couponItem .icon{ position: absolute; right:5px; bottom:10px;}
  .couponItem .unchecked{ display: block;}

  .couponType{ border-bottom: 1px dotted #ebebeb; font-weight: normal; padding: 0 10px; line-height: 60px;}
  .couponRule{ padding: 0 10px;}
  .couponRule b{ font-size: 36PX;}
  .couponRule span{ color:#6b6a72; margin-left: 20px;}
  .couponTime{ color:#6b6a72; padding: 0 10px; line-height: 60px;}

  .addBtn{ background-color: #fff; font-size: 16PX; line-height: 100px;}
  .addBtn i{ margin-right: 10px;}

  .areaTitle{ width: 105PX;}
  .btnGroup{ margin: 60px 20px 20px;}
  .saveBtn{ background-color: #FFB000; border-radius: 50px; line-height: 100px; height: 100px; color:#fff; font-size: 16PX;}
  .cancelBtn{ background-color: #A1A7AE; border-radius: 50px; line-height: 100px; height: 100px; color:#fff; font-size: 16PX;}
  .addressMain{ height:100%; position: relative;}
  .addressMain .gray_bg{ position: absolute; left: 0; top:0; right:0; bottom: 0;}
  .bottom_100{ bottom: 100px!important;}
</style>
