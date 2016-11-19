<template>
  <div class="grid-panel" :class="{ 'show-gutter': showGutter }" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    gridSize: {
      type: Number,
      default: 50
    },
    rows: {
      default: 16
    },
    cols: {
      default: 12
    },
    showGutter: {
      default: false
    }
  },
  computed: {
    style () {
      return {
        'background-size': this.gridSize + 'px ' + this.gridSize + 'px',
        'width': this.gridSize * this.cols + 'px',
        'height': this.gridSize * this.rows + 'px'
      }
    }
  }
}
</script>

<style scoped>
.grid-panel {
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  &.show-gutter {
    border: 1px solid rgba(255,255,255,.15);
    background-image:
      linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px);
  }
}
</style>
