import clone from 'clone'
import esh from '../../api/esh'
import {
  ESH_THINGS_RECEIVE,
  ESH_CHANNEL_TYPES_RECEIVE,
  ESH_ITEMS_RECEIVE,
  ESH_ITEM_STATE_CHANGE,
  API_ERROR
} from '../mutation-types'

const state = {
  things: [],
  channelTypes: [],
  items: []
}

const getters = {
  getThingsWithItems: state => {
    const things = clone(state.things)
    return things.map(thing => {
      things.channels = thing.channels.map(channel => {
        channel.channelType = state.channelTypes.find(
          channelType => channel.channelTypeUID === channelType.UID
        )
        channel.linkedItems = channel.linkedItems.map(linkedItem =>
          state.items.find(item => item.name === linkedItem)
        )
        return channel
      })
      return thing
    })
  },
  getItems: state => state.items
}

const actions = {
  subscribe ({ commit, state }) {
    return esh.subscribe(event => {
      if (event.type === 'ItemStateEvent') {
        const payload = JSON.parse(event.payload)
        const [, item] = event.topic.match(/smarthome\/items\/(.*)\/.+/)
        commit(ESH_ITEM_STATE_CHANGE, {
          name: item,
          value: payload.value
        })
      }
    })
  },
  fetchThings ({ commit, state }) {
    return esh.getThings()
    .then(things => commit(ESH_THINGS_RECEIVE, things))
    .catch(error => commit(API_ERROR, error))
  },
  fetchChannelTypes ({ commit, state }) {
    return esh.getChannelTypes()
    .then(channelTypes => commit(ESH_CHANNEL_TYPES_RECEIVE, channelTypes))
    .catch(error => commit(API_ERROR, error))
  },
  fetchItems ({ commit, state }) {
    return esh.getItems()
    .then(items => commit(ESH_ITEMS_RECEIVE, items))
    .catch(error => commit(API_ERROR, error))
  }
}

const mutations = {
  [ESH_THINGS_RECEIVE] (state, things) {
    state.things = things
  },
  [ESH_CHANNEL_TYPES_RECEIVE] (state, channelTypes) {
    state.channelTypes = channelTypes
  },
  [ESH_ITEMS_RECEIVE] (state, items) {
    state.items = items
  },
  [ESH_ITEM_STATE_CHANGE] (state, { name, value }) {
    const item = state.items.find(item => item.name === name)
    if (item) {
      item.state = value
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
