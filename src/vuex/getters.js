import cloneDeep from 'lodash/cloneDeep'

export const itemsInOrder = state => {
  return cloneDeep(state.esh.items).map(item => {
    item.index = state.settings.order.items.findIndex(el => el === item.name)
    return item
  }).sort((a, b) => a.index - b.index)
}
