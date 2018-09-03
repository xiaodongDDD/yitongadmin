'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://schoolapi-test.xiaoheiban.cn"',
  BASE_API: '"http://growth-dev.xiaoheiban.cn"',
  buckets: '"quandev"',
  tempurl: '"http://quan-dev.xiaoheiban.cn"'
})
