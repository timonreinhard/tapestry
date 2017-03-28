import createPersistedState from 'vuex-persistedstate'
import {
  SET_ITEM_ORDER
} from './mutation-types'

const plugins = [
  createPersistedState({
    paths: ['settings'],
    filter: mutation => [SET_ITEM_ORDER].includes(mutation.type)
  })
]

export default plugins
