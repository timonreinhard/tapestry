import { expect } from 'chai'

import { mutations } from '../src/vuex/modules/esh'
import {
  ESH_ITEMS_RECEIVE
} from '../src/vuex/mutation-types'

describe('mutations', () => {
  it('mutate', () => {
    const state = { items: [] }
    const payload = [{ foo: 'bar' }]
    mutations[ESH_ITEMS_RECEIVE](state, payload)
    expect(state.items.length).to.equal(1)
  })
})
