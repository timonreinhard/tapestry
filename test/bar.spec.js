import { expect } from 'chai'

import Vue from 'vue'
import NumberItem from '../src/components/items/number-item.vue'

describe('NumberItem', () => {
  it('batz', () => {
    const Constructor = Vue.extend(NumberItem)
    const vm = new Constructor({
      propsData: {
        item: {
          label: 'Foo',
          stateDescription: {
            pattern: 'Blubb'
          }
        }
      }
    }).$mount()
    expect(vm.pattern).to.equal('Blubb')
    expect(vm.$el.querySelector('.label').textContent).to.equal('Foo')
  })
})
