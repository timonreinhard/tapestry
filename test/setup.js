const browserEnv = require('browser-env')
const hook = require('vue-node')
const { join } = require('path')
const { addAlias } = require('module-alias')
const { config } = require('vue')

// Setup a fake browser environment
browserEnv()
// Pass an absolute path to your webpack configuration to the hook function.
hook(join(__dirname, '../build/webpack.test.conf.js'))

// Add alias to resolve vue to the dist build that supports templates
addAlias('vue', 'vue/dist/vue.min')

config.productionTip = false
