webpackJsonp([25],{"0k+n":function(t,e,n){function r(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var a=n("T9ab"),i=n("rXbU"),o=n("u5CL"),s=n("HOPj"),A=n("PjAo"),u=r.prototype;u.addData=function(t){var e=new a(t);this.dataList.push(e),this.dataCache=null},u.isDark=function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},u.getModuleCount=function(){return this.moduleCount},u.make=function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var e=i.getRSBlocks(t,this.errorCorrectLevel),n=new o,r=0,a=0;a<e.length;a++)r+=e[a].dataCount;for(var a=0;a<this.dataList.length;a++){var A=this.dataList[a];n.put(A.mode,4),n.put(A.getLength(),s.getLengthInBits(A.mode,t)),A.write(n)}if(n.getLengthInBits()<=8*r)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},u.makeImpl=function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var a=0;a<this.moduleCount;a++)this.modules[n][a]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=r.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},u.setupPositionProbePattern=function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+n][e+r]=0<=n&&n<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=r&&r<=4)},u.getBestMaskPattern=function(){for(var t=0,e=0,n=0;n<8;n++){this.makeImpl(!0,n);var r=s.getLostPoint(this);(0==n||t>r)&&(t=r,e=n)}return e},u.createMovieClip=function(t,e,n){var r=t.createEmptyMovieClip(e,n);this.make();for(var a=0;a<this.modules.length;a++)for(var i=1*a,o=0;o<this.modules[a].length;o++){var s=1*o,A=this.modules[a][o];A&&(r.beginFill(0,100),r.moveTo(s,i),r.lineTo(s+1,i),r.lineTo(s+1,i+1),r.lineTo(s,i+1),r.endFill())}return r},u.setupTimingPattern=function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},u.setupPositionAdjustPattern=function(){for(var t=s.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var r=t[e],a=t[n];if(null==this.modules[r][a])for(var i=-2;i<=2;i++)for(var o=-2;o<=2;o++)this.modules[r+i][a+o]=-2==i||2==i||-2==o||2==o||0==i&&0==o}},u.setupTypeNumber=function(t){for(var e=s.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var r=!t&&1==(e>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=r}for(var n=0;n<18;n++){var r=!t&&1==(e>>n&1);this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=r}},u.setupTypeInfo=function(t,e){for(var n=this.errorCorrectLevel<<3|e,r=s.getBCHTypeInfo(n),a=0;a<15;a++){var i=!t&&1==(r>>a&1);a<6?this.modules[a][8]=i:a<8?this.modules[a+1][8]=i:this.modules[this.moduleCount-15+a][8]=i}for(var a=0;a<15;a++){var i=!t&&1==(r>>a&1);a<8?this.modules[8][this.moduleCount-a-1]=i:a<9?this.modules[8][15-a-1+1]=i:this.modules[8][15-a-1]=i}this.modules[this.moduleCount-8][8]=!t},u.mapData=function(t,e){for(var n=-1,r=this.moduleCount-1,a=7,i=0,o=this.moduleCount-1;o>0;o-=2)for(6==o&&o--;;){for(var A=0;A<2;A++)if(null==this.modules[r][o-A]){var u=!1;i<t.length&&(u=1==(t[i]>>>a&1));var h=s.getMask(e,r,o-A);h&&(u=!u),this.modules[r][o-A]=u,a--,-1==a&&(i++,a=7)}if((r+=n)<0||this.moduleCount<=r){r-=n,n=-n;break}}},r.PAD0=236,r.PAD1=17,r.createData=function(t,e,n){for(var a=i.getRSBlocks(t,e),A=new o,u=0;u<n.length;u++){var h=n[u];A.put(h.mode,4),A.put(h.getLength(),s.getLengthInBits(h.mode,t)),h.write(A)}for(var l=0,u=0;u<a.length;u++)l+=a[u].dataCount;if(A.getLengthInBits()>8*l)throw new Error("code length overflow. ("+A.getLengthInBits()+">"+8*l+")");for(A.getLengthInBits()+4<=8*l&&A.put(0,4);A.getLengthInBits()%8!=0;)A.putBit(!1);for(;;){if(A.getLengthInBits()>=8*l)break;if(A.put(r.PAD0,8),A.getLengthInBits()>=8*l)break;A.put(r.PAD1,8)}return r.createBytes(A,a)},r.createBytes=function(t,e){for(var n=0,r=0,a=0,i=new Array(e.length),o=new Array(e.length),u=0;u<e.length;u++){var h=e[u].dataCount,l=e[u].totalCount-h;r=Math.max(r,h),a=Math.max(a,l),i[u]=new Array(h);for(var d=0;d<i[u].length;d++)i[u][d]=255&t.buffer[d+n];n+=h;var f=s.getErrorCorrectPolynomial(l),c=new A(i[u],f.getLength()-1),v=c.mod(f);o[u]=new Array(f.getLength()-1);for(var d=0;d<o[u].length;d++){var C=d+v.getLength()-o[u].length;o[u][d]=C>=0?v.get(C):0}}for(var g=0,d=0;d<e.length;d++)g+=e[d].totalCount;for(var p=new Array(g),m=0,d=0;d<r;d++)for(var u=0;u<e.length;u++)d<i[u].length&&(p[m++]=i[u][d]);for(var d=0;d<a;d++)for(var u=0;u<e.length;u++)d<o[u].length&&(p[m++]=o[u][d]);return p},t.exports=r},ABCa:function(t,e,n){"use strict";function r(t){n("sX73")}var a=n("BEQ0"),i=n.n(a),o=(Object,String,String,Object,{name:"x-header",props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},beforeMount:function(){this.$slots["overwrite-title"]&&(this.shouldOverWriteTitle=!0)},computed:{_leftOptions:function(){return i()({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}},data:function(){return{shouldOverWriteTitle:!1}}}),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-header"},[n("div",{staticClass:"vux-header-left"},[t._t("overwrite-left",[n("transition",{attrs:{name:t.transition}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault",void 0,e.key,void 0))return null},t.onClickBack]}},[t._v(t._s(void 0===t._leftOptions.backText?"返回":t._leftOptions.backText))])]),t._v(" "),n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:t.onClickBack}})])]),t._v(" "),t._t("left")],2),t._v(" "),t.shouldOverWriteTitle?t._e():n("h1",{staticClass:"vux-header-title",on:{click:function(e){t.$emit("on-click-title")}}},[t._t("default",[n("transition",{attrs:{name:t.transition}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.title,expression:"title"}]},[t._v(t._s(t.title))])])])],2),t._v(" "),t.shouldOverWriteTitle?n("div",{staticClass:"vux-header-title-area"},[t._t("overwrite-title")],2):t._e(),t._v(" "),n("div",{staticClass:"vux-header-right"},[t.rightOptions.showMore?n("a",{staticClass:"vux-header-more",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault",void 0,e.key,void 0))return null},function(e){t.$emit("on-click-more")}]}}):t._e(),t._v(" "),t._t("right")],2)])},A=[],u={render:s,staticRenderFns:A},h=u,l=n("VU/8"),d=r,f=l(o,h,!1,d,null,null);e.a=f.exports},Bxtt:function(t,e,n){e=t.exports=n("FZ+f")(!0),e.push([t.i,".fs12[data-v-63b1f62d]{width:8.533333rem;margin:0 auto;margin-top:1.066667rem;border:1px dashed #c8c7cc;padding:.333333rem}.fs12 .price[data-v-63b1f62d]{color:#f55f62}.fs12 p[data-v-63b1f62d]{line-height:.8rem}.qrcode[data-v-63b1f62d]{margin-top:1.066667rem;margin-bottom:.466667rem;text-align:center}.p1[data-v-63b1f62d]{color:#6b6a72;text-align:center;margin-bottom:.066667rem}.p2[data-v-63b1f62d]{text-align:center;color:#f45b5e}.topHeader[data-v-63b1f62d] .vux-header .vux-header-title{color:#5f5f5f}","",{version:3,sources:["/Users/gax/work/htdocs/hd/jj/src/pages/Pay/lkl.vue"],names:[],mappings:"AACA,uBACE,kBAAmB,AACnB,cAAe,AACf,uBAAwB,AACxB,0BAA2B,AAC3B,kBAAqB,CACtB,AACD,8BACE,aAAe,CAChB,AACD,yBACE,iBAAoB,CACrB,AACD,yBACE,uBAAwB,AACxB,yBAA2B,AAC3B,iBAAmB,CACpB,AACD,qBACE,cAAe,AACf,kBAAmB,AACnB,wBAA2B,CAC5B,AACD,qBACE,kBAAmB,AACnB,aAAe,CAChB,AACD,0DACE,aAAe,CAChB",file:"lkl.vue",sourcesContent:["\n.fs12[data-v-63b1f62d] {\n  width: 8.533333rem;\n  margin: 0 auto;\n  margin-top: 1.066667rem;\n  border: 1PX #C8C7CC dashed;\n  padding: 0.333333rem;\n}\n.fs12 .price[data-v-63b1f62d] {\n  color: #F55F62;\n}\n.fs12 p[data-v-63b1f62d] {\n  line-height: 0.8rem;\n}\n.qrcode[data-v-63b1f62d] {\n  margin-top: 1.066667rem;\n  margin-bottom: 0.466667rem;\n  text-align: center;\n}\n.p1[data-v-63b1f62d] {\n  color: #6B6A72;\n  text-align: center;\n  margin-bottom: 0.066667rem;\n}\n.p2[data-v-63b1f62d] {\n  text-align: center;\n  color: #F45B5E;\n}\n.topHeader[data-v-63b1f62d] .vux-header .vux-header-title {\n  color: #5f5f5f;\n}"],sourceRoot:""}])},HOPj:function(t,e,n){var r=n("c1w4"),a=n("PjAo"),i=n("tzRw"),o={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;s.getBCHDigit(e)-s.getBCHDigit(s.G15)>=0;)e^=s.G15<<s.getBCHDigit(e)-s.getBCHDigit(s.G15);return(t<<10|e)^s.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;s.getBCHDigit(e)-s.getBCHDigit(s.G18)>=0;)e^=s.G18<<s.getBCHDigit(e)-s.getBCHDigit(s.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return s.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case o.PATTERN000:return(e+n)%2==0;case o.PATTERN001:return e%2==0;case o.PATTERN010:return n%3==0;case o.PATTERN011:return(e+n)%3==0;case o.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case o.PATTERN101:return e*n%2+e*n%3==0;case o.PATTERN110:return(e*n%2+e*n%3)%2==0;case o.PATTERN111:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new a([1],0),n=0;n<t;n++)e=e.multiply(new a([1,i.gexp(n)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case r.MODE_NUMBER:return 10;case r.MODE_ALPHA_NUM:return 9;case r.MODE_8BIT_BYTE:case r.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case r.MODE_NUMBER:return 12;case r.MODE_ALPHA_NUM:return 11;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case r.MODE_NUMBER:return 14;case r.MODE_ALPHA_NUM:return 13;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,r=0;r<e;r++)for(var a=0;a<e;a++){for(var i=0,o=t.isDark(r,a),s=-1;s<=1;s++)if(!(r+s<0||e<=r+s))for(var A=-1;A<=1;A++)a+A<0||e<=a+A||0==s&&0==A||o==t.isDark(r+s,a+A)&&i++;i>5&&(n+=3+i-5)}for(var r=0;r<e-1;r++)for(var a=0;a<e-1;a++){var u=0;t.isDark(r,a)&&u++,t.isDark(r+1,a)&&u++,t.isDark(r,a+1)&&u++,t.isDark(r+1,a+1)&&u++,0!=u&&4!=u||(n+=3)}for(var r=0;r<e;r++)for(var a=0;a<e-6;a++)t.isDark(r,a)&&!t.isDark(r,a+1)&&t.isDark(r,a+2)&&t.isDark(r,a+3)&&t.isDark(r,a+4)&&!t.isDark(r,a+5)&&t.isDark(r,a+6)&&(n+=40);for(var a=0;a<e;a++)for(var r=0;r<e-6;r++)t.isDark(r,a)&&!t.isDark(r+1,a)&&t.isDark(r+2,a)&&t.isDark(r+3,a)&&t.isDark(r+4,a)&&!t.isDark(r+5,a)&&t.isDark(r+6,a)&&(n+=40);for(var h=0,a=0;a<e;a++)for(var r=0;r<e;r++)t.isDark(r,a)&&h++;return n+=Math.abs(100*h/e/e-50)/5*10}};t.exports=s},K5em:function(t,e,n){var r=n("Bxtt");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("rjj0")("605797f4",r,!0,{})},LpmL:function(t,e){t.exports={L:1,M:0,Q:3,H:2}},PjAo:function(t,e,n){function r(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var n=0;n<t.length&&0==t[n];)n++;this.num=new Array(t.length-n+e);for(var r=0;r<t.length-n;r++)this.num[r]=t[r+n]}var a=n("tzRw");r.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),n=0;n<this.getLength();n++)for(var i=0;i<t.getLength();i++)e[n+i]^=a.gexp(a.glog(this.get(n))+a.glog(t.get(i)));return new r(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=a.glog(this.get(0))-a.glog(t.get(0)),n=new Array(this.getLength()),i=0;i<this.getLength();i++)n[i]=this.get(i);for(var i=0;i<t.getLength();i++)n[i]^=a.gexp(a.glog(t.get(i))+e);return new r(n,0).mod(t)}},t.exports=r},T9ab:function(t,e,n){function r(t){this.mode=a.MODE_8BIT_BYTE,this.data=t}var a=n("c1w4");r.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},t.exports=r},c1w4:function(t,e){t.exports={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}},eWst:function(t,e,n){"use strict";function r(t){n("K5em")}Object.defineProperty(e,"__esModule",{value:!0});var a=n("wpcj"),i=n("ABCa"),o=(a.a,i.a,{components:{Qrcode:a.a,XHeader:i.a},mounted:function(){},data:function(){return{orderSn:this.$route.params.orderSn,orderID:this.$route.params.orderID,needToPayAmount:this.$route.params.needToPayAmount}}}),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wapper"},[n("div",{staticClass:"topHeader"},[n("x-header",{attrs:{title:"我的订单","left-options":{backText:""}}})],1),t._v(" "),n("div",{staticClass:"fs12"},[n("p",[t._v("订单号 "),n("span",{staticClass:"fr"},[t._v(t._s(t.orderSn))])]),t._v(" "),n("p",[t._v("应付金额 "),n("span",{staticClass:"price fs16 fr"},[t._v(t._s(t.needToPayAmount))])])]),t._v(" "),n("qrcode",{staticClass:"qrcode",attrs:{value:t.orderID,type:"img"}}),t._v(" "),t._m(0),t._v(" "),n("p",{staticClass:"p2"},[t._v(t._s(t.orderID))])],1)},A=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"p1"},[t._v("请出示二维码给收银员使用pos机扫描"),n("br"),t._v("或在pos机上输入支付单号：")])}],u={render:s,staticRenderFns:A},h=u,l=n("VU/8"),d=r,f=l(o,h,!1,d,"data-v-63b1f62d",null);e.default=f.exports},rINi:function(t,e,n){e=t.exports=n("FZ+f")(!0),e.push([t.i,'.vux-header{position:relative;padding:3px 0;box-sizing:border-box;background-color:#35495e}.vux-header .vux-header-title{line-height:40px;text-align:center;font-size:18px;font-weight:400;color:#fff}.vux-header-title-area,.vux-header .vux-header-title{margin:0 88px;height:40px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vux-header .vux-header-title>span{display:inline-block}.vux-header .vux-header-left,.vux-header .vux-header-right{position:absolute;top:14px;display:block;font-size:14px;line-height:21px;color:#ccc}.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button{float:left;margin-right:8px;color:#ccc}.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active{opacity:.5}.vux-header .vux-header-left{left:18px}.vux-header .vux-header-left .vux-header-back{padding-left:16px}.vux-header .vux-header-left .left-arrow{position:absolute;width:30px;height:30px;top:-5px;left:-5px}.vux-header .vux-header-left .left-arrow:before{content:"";position:absolute;width:12px;height:12px;border:1px solid #ccc;border-width:1px 0 0 1px;-webkit-transform:rotate(315deg);transform:rotate(315deg);top:8px;left:7px}.vux-header .vux-header-right{right:15px}.vux-header .vux-header-right a,.vux-header .vux-header-right button{margin-left:8px;margin-right:0}.vux-header .vux-header-right .vux-header-more:after{content:"\\2022   \\2022   \\2022   ";font-size:16px}.vux-header-fade-in-right-enter-active{-webkit-animation:fadeinR .5s;animation:fadeinR .5s}.vux-header-fade-in-left-enter-active{-webkit-animation:fadeinL .5s;animation:fadeinL .5s}@-webkit-keyframes fadeinR{0%{opacity:0;-webkit-transform:translateX(150px);transform:translateX(150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeinR{0%{opacity:0;-webkit-transform:translateX(150px);transform:translateX(150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes fadeinL{0%{opacity:0;-webkit-transform:translateX(-150px);transform:translateX(-150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeinL{0%{opacity:0;-webkit-transform:translateX(-150px);transform:translateX(-150px)}to{opacity:1;-webkit-transform:translateX(0);transform:translateX(0)}}',"",{version:3,sources:["/Users/gax/work/htdocs/hd/jj/node_modules/vux/src/components/x-header/index.vue"],names:[],mappings:"AAiJA,YACE,kBAAmB,AACnB,cAAe,AACf,sBAAuB,AACvB,wBAA0B,CAC3B,AACD,8BACE,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,UAAY,CACb,AACD,qDAEE,cAAe,AACf,YAAa,AACb,WAAY,AACZ,gBAAiB,AACjB,uBAAwB,AACxB,kBAAoB,CACrB,AACD,mCACE,oBAAsB,CACvB,AACD,2DAEE,kBAAmB,AACnB,SAAU,AACV,cAAe,AACf,eAAgB,AAChB,iBAAkB,AAClB,UAAY,CACb,AACD,wIAIE,WAAY,AACZ,iBAAkB,AAClB,UAAY,CACb,AACD,oKAIE,UAAa,CACd,AACD,6BACE,SAAW,CACZ,AACD,8CACE,iBAAmB,CACpB,AACD,yCACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,SAAU,AACV,SAAW,CACZ,AACD,gDACE,WAAY,AACZ,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,sBAAuB,AACvB,yBAA0B,AAC1B,iCAAkC,AAC1B,yBAA0B,AAClC,QAAS,AACT,QAAU,CACX,AACD,8BACE,UAAY,CACb,AACD,qEAEE,gBAAiB,AACjB,cAAgB,CACjB,AACD,qDACE,mCAA0C,AAC1C,cAAgB,CACjB,AACD,uCACE,8BAA+B,AACvB,qBAAuB,CAChC,AACD,sCACE,8BAA+B,AACvB,qBAAuB,CAChC,AACD,2BACA,GACI,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACxC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,mBACA,GACI,UAAW,AACX,oCAAqC,AAC7B,2BAA6B,CACxC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,2BACA,GACI,UAAW,AACX,qCAAsC,AAC9B,4BAA8B,CACzC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA,AACD,mBACA,GACI,UAAW,AACX,qCAAsC,AAC9B,4BAA8B,CACzC,AACD,GACI,UAAW,AACX,gCAAiC,AACzB,uBAAyB,CACpC,CACA",file:"index.vue",sourcesContent:['/**\n* actionsheet\n*/\n\n/**\n* datetime\n*/\n\n/**\n* tabbar\n*/\n\n/**\n* tab\n*/\n\n/**\n* dialog\n*/\n\n/**\n* x-number\n*/\n\n/**\n* checkbox\n*/\n\n/**\n* check-icon\n*/\n\n/**\n* Cell\n*/\n\n/**\n* Mask\n*/\n\n/**\n* Range\n*/\n\n/**\n* Tabbar\n*/\n\n/**\n* Header\n*/\n\n/**\n* Timeline\n*/\n\n/**\n* Switch\n*/\n\n/**\n* Button\n*/\n\n/**\n* swipeout\n*/\n\n/**\n* Cell\n*/\n\n/**\n* Badge\n*/\n\n/**\n* Popover\n*/\n\n/**\n* Button tab\n*/\n\n/* alias */\n\n/**\n* Swiper\n*/\n\n/**\n* checklist\n*/\n\n/**\n* popup-picker\n*/\n\n/**\n* popup\n*/\n\n/**\n* popup-header\n*/\n\n/**\n* form-preview\n*/\n\n/**\n* sticky\n*/\n\n/**\n* group\n*/\n\n/**\n* toast\n*/\n\n/**\n* icon\n*/\n\n/**\n* calendar\n*/\n\n/**\n* week-calendar\n*/\n\n/**\n* search\n*/\n\n/**\n* radio\n*/\n\n/**\n* loadmore\n*/\n.vux-header {\n  position: relative;\n  padding: 3PX 0;\n  box-sizing: border-box;\n  background-color: #35495e;\n}\n.vux-header .vux-header-title {\n  line-height: 40PX;\n  text-align: center;\n  font-size: 18PX;\n  font-weight: 400;\n  color: #fff;\n}\n.vux-header-title-area,\n.vux-header .vux-header-title {\n  margin: 0 88PX;\n  height: 40PX;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.vux-header .vux-header-title > span {\n  display: inline-block;\n}\n.vux-header .vux-header-left,\n.vux-header .vux-header-right {\n  position: absolute;\n  top: 14PX;\n  display: block;\n  font-size: 14PX;\n  line-height: 21PX;\n  color: #ccc;\n}\n.vux-header .vux-header-left a,\n.vux-header .vux-header-left button,\n.vux-header .vux-header-right a,\n.vux-header .vux-header-right button {\n  float: left;\n  margin-right: 8PX;\n  color: #ccc;\n}\n.vux-header .vux-header-left a:active,\n.vux-header .vux-header-left button:active,\n.vux-header .vux-header-right a:active,\n.vux-header .vux-header-right button:active {\n  opacity: 0.5;\n}\n.vux-header .vux-header-left {\n  left: 18PX;\n}\n.vux-header .vux-header-left .vux-header-back {\n  padding-left: 16PX;\n}\n.vux-header .vux-header-left .left-arrow {\n  position: absolute;\n  width: 30PX;\n  height: 30PX;\n  top: -5PX;\n  left: -5PX;\n}\n.vux-header .vux-header-left .left-arrow:before {\n  content: "";\n  position: absolute;\n  width: 12PX;\n  height: 12PX;\n  border: 1PX solid #ccc;\n  border-width: 1PX 0 0 1PX;\n  -webkit-transform: rotate(315deg);\n          transform: rotate(315deg);\n  top: 8PX;\n  left: 7PX;\n}\n.vux-header .vux-header-right {\n  right: 15PX;\n}\n.vux-header .vux-header-right a,\n.vux-header .vux-header-right button {\n  margin-left: 8PX;\n  margin-right: 0;\n}\n.vux-header .vux-header-right .vux-header-more:after {\n  content: "\\2022\\0020\\2022\\0020\\2022\\0020";\n  font-size: 16PX;\n}\n.vux-header-fade-in-right-enter-active {\n  -webkit-animation: fadeinR .5s;\n          animation: fadeinR .5s;\n}\n.vux-header-fade-in-left-enter-active {\n  -webkit-animation: fadeinL .5s;\n          animation: fadeinL .5s;\n}\n@-webkit-keyframes fadeinR {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(150PX);\n            transform: translateX(150PX);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@keyframes fadeinR {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(150PX);\n            transform: translateX(150PX);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@-webkit-keyframes fadeinL {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(-150PX);\n            transform: translateX(-150PX);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}\n@keyframes fadeinL {\n0% {\n    opacity: 0;\n    -webkit-transform: translateX(-150PX);\n            transform: translateX(-150PX);\n}\n100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n}\n}'],sourceRoot:""}])},rXbU:function(t,e,n){function r(t,e){this.totalCount=t,this.dataCount=e}var a=n("LpmL");r.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r.getRSBlocks=function(t,e){var n=r.getRsBlockTable(t,e);if(void 0==n)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var a=n.length/3,i=new Array,o=0;o<a;o++)for(var s=n[3*o+0],A=n[3*o+1],u=n[3*o+2],h=0;h<s;h++)i.push(new r(A,u));return i},r.getRsBlockTable=function(t,e){switch(e){case a.L:return r.RS_BLOCK_TABLE[4*(t-1)+0];case a.M:return r.RS_BLOCK_TABLE[4*(t-1)+1];case a.Q:return r.RS_BLOCK_TABLE[4*(t-1)+2];case a.H:return r.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},t.exports=r},sX73:function(t,e,n){var r=n("rINi");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("rjj0")("4e3dd0da",r,!0,{})},tzRw:function(t,e){for(var n={glog:function(t){if(t<1)throw new Error("glog("+t+")");return n.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return n.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},r=0;r<8;r++)n.EXP_TABLE[r]=1<<r;for(var r=8;r<256;r++)n.EXP_TABLE[r]=n.EXP_TABLE[r-4]^n.EXP_TABLE[r-5]^n.EXP_TABLE[r-6]^n.EXP_TABLE[r-8];for(var r=0;r<255;r++)n.LOG_TABLE[n.EXP_TABLE[r]]=r;t.exports=n},u5CL:function(t,e){function n(){this.buffer=new Array,this.length=0}n.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var n=0;n<e;n++)this.putBit(1==(t>>>e-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=n},wpcj:function(t,e,n){"use strict";function r(t){return t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1}function a(t){return t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1}var i=n("0k+n"),o=n.n(i),s=n("LpmL"),A=n.n(s),u=(String,Number,String,String,String,String,{name:"qrcode",props:{value:String,size:{type:Number,default:160},level:{type:String,default:"L"},bgColor:{type:String,default:"#FFFFFF"},fgColor:{type:String,default:"#000000"},type:{type:String,default:"img"}},mounted:function(){var t=this;this.$nextTick(function(){t.render()})},data:function(){return{imgData:""}},watch:{value:function(){this.render()},size:function(){this.render()},level:function(){this.render()},bgColor:function(){this.render()},fgColor:function(){this.render()}},methods:{render:function(){var t=this;if(void 0!==this.value){var e=new o.a(-1,A.a[this.level]);e.addData(this.value),e.make();var n=this.$refs.canvas,r=n.getContext("2d"),i=e.modules,s=this.size/i.length,u=this.size/i.length,h=(window.devicePixelRatio||1)/a(r);n.height=n.width=this.size*h,r.scale(h,h),i.forEach(function(e,n){e.forEach(function(e,a){r.fillStyle=e?t.fgColor:t.bgColor;var i=Math.ceil((a+1)*s)-Math.floor(a*s),o=Math.ceil((n+1)*u)-Math.floor(n*u);r.fillRect(Math.round(a*s),Math.round(n*u),i,o)})}),"img"===this.type&&(this.imgData=n.toDataURL("image/png"))}}}}),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("canvas",{directives:[{name:"show",rawName:"v-show",value:"canvas"===t.type,expression:"type === 'canvas'"}],ref:"canvas",style:{height:t.size+"px",width:t.size+"px"},attrs:{height:t.size,width:t.size}}),t._v(" "),"img"===t.type?n("img",{style:{height:t.size+"px",width:t.size+"px"},attrs:{src:t.imgData}}):t._e()])},l=[],d={render:h,staticRenderFns:l},f=d,c=n("VU/8"),v=c(u,f,!1,null,null,null);e.a=v.exports}});
//# sourceMappingURL=25.d7b7c6c8f9f8f91ef813.js.map