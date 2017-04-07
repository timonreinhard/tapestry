import { expect } from 'chai'

import { itemsInOrder } from '../../src/vuex/getters'

describe('getters', () => {
  describe('itemsInOrder', () => {
    it('gets items ordered as in settings', () => {
      const state = {
        esh: {
          items: [{
            name: 'item_foo'
          }, {
            name: 'item_bar'
          }, {
            name: 'item_batz'
          }]
        },
        settings: {
          order: {
            items: [
              'item_batz',
              'item_foo',
              'item_bar'
            ]
          }
        }
      }
      const result = itemsInOrder(state)
      expect(result).to.deep.equal([
        { name: 'item_batz', index: 0 },
        { name: 'item_foo', index: 1 },
        { name: 'item_bar', index: 2 }
      ])
    })
  })
})
