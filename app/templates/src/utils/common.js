import VueCookie from "vue-cookie"

export const isWeiXin = (function () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.search(/MicroMessenger/i) > -1) {
    return true
  } else {
    return false
  }
})()

export const GetQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

export const checkLogin = function () {
  return !!localStorage['x-security-token'] || !!VueCookie.get('x-security-token')
}

export const isIphoneX = function () {
  return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
}

export const live800 = function () {
  window.location.href = 'http://chat8.live800.com/live800/chatClient/chatbox.jsp?companyID=901843&configID=152182&jid=8192606623'
}

