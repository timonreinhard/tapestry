import {
  CONFIGURE_WIDGET
} from '../mutation-types'

export const WIDGET_STORAGE_KEY = 'WIDGETS'
export const storage = window.localStorage

const localStoragePlugin = store => {
  store.subscribe(({ type }, { config }) => {
    if ([CONFIGURE_WIDGET].includes(type)) {
      storage.setItem(WIDGET_STORAGE_KEY, JSON.stringify(config.widgets))
    }
  })
}

export default [localStoragePlugin]
