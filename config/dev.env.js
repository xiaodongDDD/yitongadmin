'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://school-test.xiaoheiban.cn"',
  BASE_API: '"http://school-dev.xiaoheiban.cn/api"',
})
