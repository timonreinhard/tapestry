import Vue from 'vue'
import Vuex from 'vuex'
import esh from './modules/esh'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    esh
  },
  strict: debug
})
