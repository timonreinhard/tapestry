import 'pepjs'

import Vue from 'vue'
import App from './app'
import store from './vuex/store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
