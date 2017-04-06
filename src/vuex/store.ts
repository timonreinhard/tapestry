declare let process: any

import * as Vue from 'vue'
import * as Vuex from 'vuex'

import esh from './modules/esh'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    esh
  },
  strict: debug
})
