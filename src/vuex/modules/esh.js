import esh from '../../api/esh'
import {
  ESH_ITEMS_RECEIVE,
  ESH_ITEM_STATE,
  ESH_ITEM_UPDATE,
  ESH_ITEM_ADD,
  ESH_ITEM_REMOVE,
  API_ERROR
} from '../mutation-types'

const state = {
  items: []
}

const getters = {
  items: state => state.items
}

const actions = {
  subscribe ({ commit, state }) {
    return esh.subscribe(event => {
      const payload = JSON.parse(event.payload)
      const [,, uid] = event.topic.split('/')

      switch (event.type) {
        case 'ItemStateEvent':
          commit(ESH_ITEM_STATE, {
            name: uid,
            value: payload.value
          })
          break
        case 'ItemUpdatedEvent':
          commit(ESH_ITEM_UPDATE, payload[0])
          break
        case 'ItemAddedEvent':
          commit(ESH_ITEM_ADD, payload)
          break
        case 'ItemRemovedEvent':
          commit(ESH_ITEM_REMOVE, payload)
          break
        default:
          // console.log('Unhandled Event', event)
      }
    })
  },
  fetchItems ({ commit, state }) {
    return esh.getItems()
    .then(items => commit(ESH_ITEMS_RECEIVE, items))
    .catch(error => commit(API_ERROR, error))
  }
}

export const mutations = {
  [ESH_ITEMS_RECEIVE] (state, items) {
    state.items = items
  },
  [ESH_ITEM_STATE] (state, { name, value }) {
    const item = state.items.find(item => item.name === name)
    if (item) {
      item.state = value
    }
  },
  [ESH_ITEM_UPDATE] (state, item) {
    const index = state.items.findIndex(({ name }) => item.name === name)
    if (index !== -1) {
      state.items.splice(index, 1, Object.assign({}, state.items[index], item))
    }
  },
  [ESH_ITEM_ADD] (state, item) {
    // Add missing state property to make it reactive
    state.items.push({ ...item, state: null })
  },
  [ESH_ITEM_REMOVE] (state, item) {
    const index = state.items.findIndex(({ name }) => item.name === name)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
