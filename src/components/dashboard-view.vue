<template>
  <div class="dashboard-view">
    <grid-panel :grid-size="gridSize" :rows="row" :cols="cols">
      <grid-item v-for="widget in widgets"
        :row="widget.row" :col="widget.col"
        :row-span="widget.rowSpan" :col-span="widget.colSpan"
        :grid-size="gridSize" readonly="readonly">
        <component :is="widget.component" :widget="widget"></component>
      </grid-item>
    </grid-panel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import GridPanel from './grid/grid-panel'
import GridItem from './grid/grid-item'
import TextWidget from './widgets/text-widget'
import WindowWidget from './widgets/window-widget'

export default {
  components: {
    GridPanel,
    GridItem,
    TextWidget,
    WindowWidget
  },
  data () {
    return {
      rows: 12,
      cols: 16,
      gridSize: 50
    }
  },
  computed: {
    ...mapGetters({
      widgets: 'getWidgets'
    })
  },
  methods: {
    ...mapActions([
      'addWidget'
    ])
  }
}
</script>

<style scoped>
.dashboard-view {
  background: transparent;
}
</style>
