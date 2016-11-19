import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins/local-storage'
import esh from './modules/esh'
import config from './modules/config'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    esh,
    config
  },
  strict: debug,
  plugins
})
