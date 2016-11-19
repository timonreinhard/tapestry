<template>
  <div class="edit-view" :class="{ editing: selected }">
    <grid-panel ref="panel" :grid-size="gridSize" :rows="rows" :cols="cols" show-gutter="show-gutter">
      <grid-item v-for="widget in widgets"
        @resize="onWidgetResize(widget, $event)" @drag="onWidgetDrag(widget, $event)"
        :row="widget.row" :col="widget.col" :row-span="widget.rowSpan" :col-span="widget.colSpan"
        :grid-size="gridSize">
        <component :is="widget.component" :widget="widget"></component>
      </grid-item>
    </grid-panel>
    <div class="widget-drawer">
      <draggable @drop="onDropFromDrawer" @move="onMoveFromDrawer" name="text-widget">
        <img src="../assets/icons/write.svg">
      </draggable>
      <draggable @drop="onDropFromDrawer" @move="onMoveFromDrawer" name="window-widget">
        <img src="~assets/icons/window.svg">
      </draggable>
    </div>
    <div v-if="selected" class="configure">
      <component :is="selected.component" :widget="selected" edit="edit"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import GridPanel from './grid/grid-panel'
import GridItem from './grid/grid-item'
import Draggable from './draggable'
import TextWidget from './widgets/text-widget'
import WindowWidget from './widgets/window-widget'

export default {
  components: {
    GridPanel,
    GridItem,
    Draggable,
    TextWidget,
    WindowWidget
  },
  data () {
    return {
      rows: 12,
      cols: 16,
      gridSize: 45
    }
  },
  computed: {
    ...mapGetters({
      widgets: 'getWidgets',
      selected: 'getSelectedWidget'
    })
  },
  methods: {
    ...mapActions([
      'configureWidget',
      'addWidget',
      'selectWidget'
    ]),
    onWidgetDrag (widget, { row, col }) {
      const position = { row, col }
      this.configureWidget({ ...widget, ...position })
    },
    onWidgetResize (widget, { rowSpan, colSpan }) {
      const dimensions = { rowSpan, colSpan }
      this.configureWidget({ ...widget, ...dimensions })
    },
    onDropFromDrawer (event) {
      const size = 3
      const proxyGrowth = this.gridSize * 3 / 2
      const { onDropZone, x, y } = this._mapToDropZone(event)
      if (onDropZone) {
        let col = this._snap(x - proxyGrowth, this.cols - size)
        let row = this._snap(y - proxyGrowth, this.rows - size)
        this.addWidget({
          widgetType: event.name,
          colSpan: size,
          rowSpan: size,
          col,
          row
        })
      }
    },
    onMoveFromDrawer (event) {
      const { proxy } = event
      const { onDropZone } = this._mapToDropZone(event)
      if (onDropZone) {
        proxy.style.cursor = 'move'
        proxy.style.width = this.gridSize * 3 + 'px'
        proxy.style.height = this.gridSize * 3 + 'px'
        proxy.style.marginLeft = this.gridSize * 3 / -2 + 'px'
        proxy.style.marginTop = this.gridSize * 3 / -2 + 'px'
      } else {
        proxy.style.width = null
        proxy.style.height = null
        proxy.style.margin = null
      }
    },
    _mapToDropZone ({ x, y, width, height }) {
      const dropZone = this.$refs.panel.$el.getBoundingClientRect()
      const leftCenter = x + width / 2
      const topCenter = y + height / 2
      const onDropZone = (leftCenter > dropZone.left + window.scrollX && leftCenter < dropZone.right + window.scrollX &&
          topCenter > dropZone.top + window.scrollY && topCenter < dropZone.bottom + window.scrollY)
      return {
        x: x - dropZone.left - window.scrollX,
        y: y - dropZone.top - window.scrollY,
        onDropZone
      }
    },
    _snap (position, boundary) {
      const roundOrFloor = (position % this.gridSize > (this.gridSize / 2)) ? 'round' : 'floor'
      const cell = Math[roundOrFloor](position / this.gridSize)
      return (cell < 0) ? 0 : Math.min(cell, boundary)
    }
  }
}
</script>

<style scoped>
.edit-view {
  padding: 50px;
  transition: transform 0.3s ease-in-out;
  &.editing {
    transform: translateX(-300px);
  }
}

.widget-drawer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 30px 0 0 -15px;

  & .draggable {
    position: relative;
    height: 45px;
    width: 45px;
    border: 1px solid rgba(255,255,255,.15);
    margin: 5px;
  }
}

.configure {
  position: absolute;
  width: 300px;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
