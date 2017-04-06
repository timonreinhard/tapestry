import * as Vue from 'vue'

import App from './app.vue'
import store from './vuex/store'
// import './i18n'

// import SprintfFilter from './filters/sprintf-filter'
// import LowercaseFilter from './filters/lowercase-filter'
//
// Vue.filter('sprintf', SprintfFilter)
// Vue.filter('lowercase', LowercaseFilter)

Vue.config.devtools = true

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
