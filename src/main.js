import 'babel-polyfill'
import 'pepjs'

import Vue from 'vue'
import App from 'src/app'
import store from 'src/vuex/store'
import './i18n'

import SprintfFilter from 'src/filters/sprintf-filter'
import LowercaseFilter from 'src/filters/lowercase-filter'

Vue.filter('sprintf', SprintfFilter)
Vue.filter('lowercase', LowercaseFilter)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
