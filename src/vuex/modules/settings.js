import {
  SET_ITEM_ORDER
} from '../mutation-types'

const state = {
  order: {
    items: []
  }
}

const getters = {
  order: state => state.order.items
}

const actions = {
  reorderItems ({ commit, state }, order) {
    commit(SET_ITEM_ORDER, order)
  }
}

export const mutations = {
  [SET_ITEM_ORDER] (state, order) {
    state.order.items = order
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
