require('../build/check-versions')()
var fs = require('fs')

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

var isProd = process.env.NODE_ENV === 'production'
var config = require('../config')[isProd ? 'build' : 'dev']

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = require('../config/dev.env').NODE_ENV
}

var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'production'
  ? require('../build/webpack.prod.conf')
  : require('../build/webpack.dev.conf')
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.proxyTable
var request = require('request')
var cookieParser = require('cookie-parser')

var appid = '<%= appid %>'
var appsecret = '<%= appsecret %>'

var app = express()

// session相关
var identityKey = 'skey'
app.use(cookieParser())

var cookiesConfig = {maxAge:600000, path:'/'}

if (!isProd) {
  var opn = require('opn')
  var webpack = require('webpack')

  // automatically open browser, if not set will be false
  var autoOpenBrowser = !!config.autoOpenBrowser

  var compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true, // 让webpack-dev-middleware拥有服务端渲染的钩子
    quiet: true
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
  })
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  app.use('/static', express.static(path.resolve(__dirname, '../static'), {maxAge: 60 * 12 * 24 * 360 * 100}))
  app.get('/favicon.ico', (req, res) => { res.sendFile(path.resolve(__dirname, '../static') + '/favicon.ico') })

  // serve webpack bundle output
  app.use(devMiddleware)

  // app.use(require('connect-history-api-fallback')({verbose:true}))

  app.use(/.*/, ssr)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // serve pure static assets
  var uri = 'http://localhost:' + port

  var _resolve
  var readyPromise = new Promise(resolve => {
    _resolve = resolve
  })
} else {
  app.use('/static', express.static(config.assetsRoot + '/static', {maxAge: 60 * 12 * 24 * 360 * 100}))
  // 微信域名验证用
  app.get('/<%= wxCheckServer %>', (req, res) => {
    res.sendFile(config.assetsRoot + '/<%= wxCheckServer %>')
  }
  )

  app.get('/favicon.ico', (req, res) => { res.sendFile(config.assetsRoot + '/static/favicon.ico') })

  app.get(/.*/, ssr)
}


// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }

  options.onProxyRes = (proxyRes, req, res) => {
	const format = req.headers['x-format']
	const mock = req.headers['x-mock']

		  var body = new Buffer('')
		  proxyRes.on('data', function (data) {
			  body = Buffer.concat([body, data])
		  })
		  proxyRes.on('end', function () {
			  body = body.toString()
			  console.log('res from proxied server:', proxyRes.req.path)

			  for (const [key, value] of Object.entries(proxyRes.headers)) {
				  res.setHeader(key, value);
			  }

			  res.end(body)
		  })
  }

  //允许修改返回值
  options['selfHandleResponse'] = true
  app.use(proxyMiddleware(options.filter || context, options))
})

var staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory)
// app.use('/static', express.static(__dirname + '../static'))

var server = app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

function getWxAccess (req, res) {
  return new Promise(function (resolve, reject) {
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + appsecret + '&code=' + req.query.code + '&grant_type=authorization_code'

    request(url, function (error, response, data) {
      data = JSON.parse(data)
      //res.cookie('access_token', data.access_token, cookiesConfig)
      //res.cookie('openid', data.openid, cookiesConfig)
      console.log("request", data)

      var url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + data.access_token + '&openid=' + data.openid + '&lang=zh_CN'
      request(url, function (error, response, data) {
        resolve(data)
      })
    })
  })
}

function ssr (req, res, next) {
  var headers = req.headers
  var isWeiXin = (function () {
    var ua = headers['user-agent']
    if (ua.search(/MicroMessenger/i) > -1) {
      return true
    } else {
      return false
    }
  })()

  // 参考connect-history-api-fallback的匹配写法
  if (req.method !== 'GET') {
    return next()
  } else if (!acceptsHtml(headers.accept,	{})) {
    return next()
  }

  if (config.wxLogin && isWeiXin) {
    if (!req.cookies.unionid) {
      // const fullURL = req.protocol + '://' + req.host + ":"+ port + req.originalUrl
      let fullURL = req.protocol + '://' + req.get('host') + req.url
      let authorize_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(fullURL) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'

      if (req.query.code) {
        getWxAccess(req, res).then(info => {
          console.log(info)
          info = JSON.parse(info)
          res.cookie('unionid', info.unionid, cookiesConfig)
          res.redirect(302, fullURL.replace(/\?.*$/, ''))
        })
      } else {
        res.redirect(302, authorize_url)
      }
      return
    }
  }

  sendFile()

  function sendFile () {
    // 输出index.html ,任意地址都指向html文件

    var indexPath = isProd ? path.join(__dirname, '../dist', 'index.html') : path.join(__dirname, '../', 'index.html')

    var html = fs.readFile(indexPath, function (err, data) {
      if (err) {
        next(err)
      } else {
        data = data.toString()
        if (!isProd) {
          const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName

          data = data.replace('</body>', `</body>
					${
  normalizeAssets(assetsByChunkName.main)
    .filter(path => path.endsWith('.js'))
    .map(path => `<script src="/${path}"></script>`).join('')
}`)
        }

        /*
		  req.session.wxInfo = JSON.parse('{"openid":"oE7oAs5quk_Ab_zt5rkS8f2E0XtI","nickname":"GaX_","sex":1,"language":"zh_CN","city":"广州","province":"广东","country":"中国","headimgurl":"http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Gej1lNReb2dJFUQQvGOdIuScCGYgbVhGp5G4ZvknWicKF3CfVU0TUianPe7Qian77GJ9fSnQtfID99A3qeibI5rO0w\/132","privilege":[]}');

		  let wxInfo = {
			nickname:req.session.wxInfo.nickname,
			headimgurl:req.session.wxInfo.headimgurl,
			openid:req.session.wxInfo.openid,
			unionid:req.session.wxInfo.unionid,
			sex:req.session.wxInfo.sex,
		  };

		  data = data.replace('</head>', "</head><script>window.wxInfo="+ JSON.stringify(wxInfo)+"</script>")
		  */

        // console.log(data.toString());
        res.send(data)
	  }
    })
  }

  function normalizeAssets (assets) {
    return Array.isArray(assets) ? assets : [assets]
  }

  function acceptsHtml (header, options) {
    options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*']
    for (var i = 0; i < options.htmlAcceptHeaders.length; i++) {
      if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
        return true
      }
    }
    return false
  }
}
