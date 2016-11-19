import clone from 'clone'
import {
  SET_EDIT_MODE,
  SELECT_WIDGET,
  ADD_WIDGET,
  REMOVE_WIDGET,
  CONFIGURE_WIDGET
} from '../mutation-types'

import {
  WIDGET_STORAGE_KEY,
  storage
} from '../plugins/local-storage'

const state = {
  editMode: false,
  selected: null,
  widgets: JSON.parse(storage.getItem(WIDGET_STORAGE_KEY) || '[]')
}

const getters = {
  getEditMode: state => state.editMode,
  getWidgets: clone(state => state.widgets),
  getSelectedWidget: state => state.widgets.find(widget => widget.id === state.selected)
}

const actions = {
  toggleEditMode ({ commit, state }) {
    if (state.editMode) {
      commit(SELECT_WIDGET, null)
    }
    commit(SET_EDIT_MODE, !state.editMode)
  },
  addWidget ({ commit, state }, { widgetType, row, col, rowSpan, colSpan }) {
    const widget = {
      id: state.widgets.length + 1,
      component: widgetType,
      itemName: null,
      label: null,
      rowSpan,
      colSpan,
      row,
      col
    }
    commit(ADD_WIDGET, widget)
  },
  removeWidget ({ commit, state }, widget) {
    commit(REMOVE_WIDGET, widget)
  },
  selectWidget ({ commit, state }, id) {
    commit(SELECT_WIDGET, id)
  },
  configureWidget ({ commit, state }, widget) {
    commit(CONFIGURE_WIDGET, widget)
  }
}

const mutations = {
  [SET_EDIT_MODE] (state, editMode) {
    state.editMode = editMode
  },
  [ADD_WIDGET] (state, widget) {
    state.widgets.push(widget)
  },
  [REMOVE_WIDGET] (state, payload) {
    const index = state.widgets.findIndex(widget => widget.id === payload.id)
    if (index !== -1) {
      state.widgets.splice(index, 1)
    }
  },
  [SELECT_WIDGET] (state, id) {
    const widget = state.widgets.find(widget => widget.id === id)
    state.selected = widget ? widget.id : null
  },
  [CONFIGURE_WIDGET] (state, payload) {
    const index = state.widgets.findIndex(widget => widget.id === payload.id)
    if (index !== -1) {
      state.widgets[index] = Object.assign(state.widgets[index], payload)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
