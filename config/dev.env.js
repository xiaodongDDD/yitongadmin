'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://yt-dev.xiaoheiban.cn/api"',
  BASE_API: '"https://yt-test.xiaoheiban.cn/api"',
})
