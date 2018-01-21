'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')//引入express模拟从后台接口获取数据


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})


//交互方法一：引入json-server
/*const jsonServer=require('json-server');
const jsonApiServer = jsonServer.create()
const jsonApiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

jsonApiServer.use(middlewares)
jsonApiServer.use('/api',jsonApiRouter)
jsonApiServer.listen(3000, () => {
  console.log('JSON Server is running')
});*/

//交互方法二：express设置实现模拟远程接口实现ajax交互
const apiServer = express()    //名称apiServer根据项目自定义，避免冲突为原则
const bodyParser = require('body-parser')  //express必须要进行的配置
apiServer.use(bodyParser.urlencoded({ extended: true }))  //插件
apiServer.use(bodyParser.json())//设置数据格式为json
const apiRouter = express.Router()  //配置路由，名称同样可以自拟
const fs = require('fs')
apiRouter.route('/:apiName')    //apiName为接口名称
  .all(function (req, res) {    // .all即支持包括get\post在内的所有xhr请求
    fs.readFile('./db.json', 'utf8', function (err, data) {   //db.json 自己配置的模拟数据需要放置到
      if (err) throw err
      var data = JSON.parse(data)   //将从服务器端获取到的json对象转换为普通js对象
      if (data[req.params.apiName]) {
        res.json(data[req.params.apiName])
      }
      else {
        res.send('no such api name')
      }
    })
  })
apiServer.use('/api', apiRouter);   //   配置 '/api'是因为做了服务器代理，所有要指明代理地址
apiServer.listen(3000, function (err) {  //配置接口端口号，为了方便查看，一般取前端口号+1
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:3000/')
})
