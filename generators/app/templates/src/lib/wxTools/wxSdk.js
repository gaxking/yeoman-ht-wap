import axios from 'axios'
import wx from 'weixin-js-sdk'

function wxShare () {
  var config = {}
  var jsSdkSign = new FormData()
  var wxDomain = ''
  switch (process.env.HT_ENV) {
    case 'test':
      wxDomain = 'ht-mjwx-test.htmimi.com'
      jsSdkSign.append('token', '<%= jsSdk_PHP_token %>')
      jsSdkSign.append('url', location.href)
      break
    case 'release':
      wxDomain = 'ht-mjwx-test.htmimi.com'
      jsSdkSign.append('token', '<%= jsSdk_PHP_token %>')
      jsSdkSign.append('url', location.href)
      break
    default:
      wxDomain = 'ht-mmwx-test.htmimi.com'
      break
  }

  // https://ht-mjwx-test.htmimi.com/index.php/Api/Wxapi/JsSignPackage/token/gh_e8a7b9983c24?url=https://ht-jj-h5-test.htmimi.com/

  axios({
    url: 'https://' + wxDomain + '/index.php/Api/Wxapi/JsSignPackage',
    data: jsSdkSign,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: 'POST'
  }).then(function (res) {
    var wxConfig = res.data
    delete wxConfig.url
    wxConfig.jsApiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideOptionMenu',
      'showOptionMenu',
      'hideMenuItems',
      'showMenuItems',
      'chooseWXPay',
      'hideOptionMenu',
      'showOptionMenu',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem'
    ]

    wx.config(wxConfig)
    wx.error(function (res) {
      console.log('验证失败：' + JSON.stringify(res))
    })
    /* 分享页面 */
    wx.ready(function () {
      // 分享朋友
      wx.onMenuShareAppMessage(config.toFriend)
      // 分享朋友圈
      wx.onMenuShareTimeline(config.toTimeLine)

      if (config.BaseMenuDisplay === 'hide') {
        wx.hideAllNonBaseMenuItem()
      } else if (config.BaseMenuDisplay === 'show') {
        wx.showAllNonBaseMenuItem()
      }
    })
  })

  return {
    toFriend: (opt) => {
      config.toFriend = opt
      wx.onMenuShareAppMessage(opt)
    },
    toTimeLine: (opt, isInit) => {
      config.toTimeLine = opt
      wx.onMenuShareTimeline(opt)
    },
    pay: (params) => {
      wx.chooseWXPay(params)
    },
    hideAllNonBaseMenuItem: () => {
      config.BaseMenuDisplay = 'hide'
      if (wx) {
        wx.hideAllNonBaseMenuItem()
      }
    },
    showAllNonBaseMenuItem: () => {
      config.BaseMenuDisplay = 'show'
      if (wx) {
        wx.showAllNonBaseMenuItem()
      }
    }
  }
}

export default wxShare()
