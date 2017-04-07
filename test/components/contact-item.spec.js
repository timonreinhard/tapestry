import { expect } from 'chai'

import Vue from 'vue'
import ContactItem from '../../src/components/items/contact-item.vue'

describe('ContactItem', () => {
  it('displays human-friendly state', () => {
    const Constructor = Vue.extend(ContactItem)
    const vm = new Constructor({
      propsData: {
        item: {
          state: 'CLOSED'
        }
      },
      methods: {
        $t: (key) => key
      }
    }).$mount()
    expect(vm.$el.querySelector('.state').textContent).to.equal('item_states.closed')
  })
})
