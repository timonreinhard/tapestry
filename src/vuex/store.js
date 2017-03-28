import Vue from 'vue'
import Vuex from 'vuex'

import esh from './modules/esh'
import settings from './modules/settings'
import plugins from './plugins'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug

export default new Vuex.Store({
  getters,
  modules: {
    esh,
    settings
  },
  plugins,
  strict: debug
})
