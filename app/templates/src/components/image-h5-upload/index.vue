<template>
  <div>
    <label :for="fileId" class="upload-button">
      <img :src="previewImg" v-show="previewImg"/>
      <input class="input-file" type="file" :id="fileId" accept="image/*" @change="changeImage($event)"/>
    </label>
  </div>
</template>
<script>
  // import EXIF from 'exif-js';
  import httpConfig from "@/http/config";
  import crypto from 'crypto';
  import * as Loading from '@/components/loading';
  import VueCookie from "vue-cookie";
  export default{
    name:"image-html5-upload",
    // mixins: [propsync],
    props:{
      imgUrl:{
        type: String,
        default: ''
      },
      imgNumLimit:{//一次最多可以上传多少张照片
        type:Number,
        default:1
      },
      sizeLimit: {
        type: Number,
        default: 5
      }
    },
    mounted() {
      // console.log(httpConfig.getRequestUrl('upload-api'));
    },
    data() {
      return {
        previewImg: '',
        fileList: [],
        fileId: 'img-upload-' + Math.random().toString().slice(2)
      }
    },
    methods:{
      getmd5(str){
        var a;
        var md5 = crypto.createHash("md5");
        //update("中文", "utf8")
        md5.update(str);
        var a = md5.digest('hex');
        console.log(a);
        //47bce5c74f589f4867dbd57e9ca9f808
        return a;
      },
      "changeImage": function(e){
        let tag = e.target;
        let fileList = tag.files;
        let imgNum = fileList.length;
        let _this = this;
        console.log(fileList);
        if(imgNum>0 && fileList.size > 1024*1024*_this.sizeLimit){
          alert('图片大小')
        }
        for(let i=0;i<imgNum;i++){
          let reader = new FileReader();
          reader.readAsDataURL(fileList[i]);
          reader.onload = function(pe){
            console.log(pe);
            _this.previewImg = pe.target.result;
            _this.$emit('update:imgUrl', pe.target.result);
          }
        }
        _this.fileList = fileList;

      },
      upload() {
        var _this = this;
        Loading.show();
        return new Promise((resolve, reject) => {
          _this.uploadImg(_this.fileList, function (res) {
            if(res.msgCode == 200){
              _this.$emit('update:imgUrl', res.data[0].url);
              resolve(res);
            }else {
              reject();
              alert(res.message);
            }
          })
        });

      },
      uploadImg(fileObjList, callback) {
        var currTime = new Date().getTime();
        var t_token = VueCookie.get('x-security-token');
        var signature = this.getmd5(t_token + "ever$!@grande*&" + currTime).toUpperCase();

        var xhr = new XMLHttpRequest();
        var uploadInterface = '';
        switch (process.env.HT_ENV) {
          case 'dev':
            uploadInterface = 'http://dev.upload-api.hd/upload/img';
            break;
          case 'sit':
            uploadInterface = 'https://ht-upload-api-sit.htmimi.com/upload/img';
            break;
          case 'test':
            uploadInterface = 'https://ht-upload-api-test.htmimi.com/upload/img';
            break;
          case 'fix':
            uploadInterface = 'http://fix.upload-api.hd/upload/img';
            break;
          case 'stg':
            uploadInterface = 'https://ht-upload-api-stg.htmimi.com/upload/img';
            break;
          case 'release':
            uploadInterface = 'https://ht-upload-api.htmimi.com/upload/img';
            break;
        }
        xhr.open("POST", uploadInterface, true);
        xhr.setRequestHeader("x-client-type", "wechat");
        xhr.setRequestHeader("x-client-os", "wechat");
        xhr.setRequestHeader("x-client-id", "-1");
        xhr.setRequestHeader("x-client-os-version", "0");
        xhr.setRequestHeader("x-client-channel", "0");
        xhr.setRequestHeader("x-client-hardware", "0");
        xhr.setRequestHeader("x-client-version-name", "0");
        xhr.setRequestHeader("x-client-version-code", "0");
        xhr.setRequestHeader("x-request-time", currTime);
        xhr.setRequestHeader("x-security-token", t_token);
        xhr.setRequestHeader("x-security-timestamp", currTime);
        xhr.setRequestHeader("x-security-signature", signature);
        var fd = new FormData();
        fd.append("type", 2);
        fd.append("token", t_token);
        fd.append("loginType", 4);
        //如果上传多张图片，则append多个file
        for (var i = 0; i < fileObjList.length; i++) {
          fd.append("file", fileObjList[i]);
        }
        xhr.send(fd);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            callback(JSON.parse(xhr.responseText));
          }

        };
      }
    }
  }
</script>

<style lang="less" scoped>
  .upload-button{
    height: 100px;
    width: 100px;
    display: inline-block;
    background: url("button.png") no-repeat;
    background-size: cover;
    img{
      width: 100%;
      height: 100%;
      display: inline-block;
      border: 0;
    }
    .input-file {
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      border: 0;
      opacity: 0;
    }
  }
</style>
