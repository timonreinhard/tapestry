<template>
  <div :style="style" class="grid-item" :class="{ 'out-of-constrains': outOfConstrains, 'resizing': resize, 'readonly': readonly }" @pointerdown="dragStart" touch-action="none">
    <slot></slot>
    <span v-show="!readonly" class="resize-handle" @pointerdown.stop.prevent="resizeStart"></span>
  </div>
</template>

<script>
export default {
  props: {
    gridSize: {
      default: 50
    },
    col: {
      default: 0
    },
    row: {
      default: 0
    },
    colSpan: {
      default: 3
    },
    rowSpan: {
      default: 3
    },
    constrain: {
      default: true
    },
    readonly: {
      default: false
    }
  },
  data () {
    return {
      drag: false,
      resize: false,
      movements: 0,
      outOfConstrains: false,
      position: {
        x: this.gridSize * this.col,
        y: this.gridSize * this.row,
        width: this.gridSize * this.colSpan,
        height: this.gridSize * this.rowSpan
      },
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    }
  },
  watch: {
    drag (val) {
      const addOrRemove = val ? 'addEventListener' : 'removeEventListener'
      document.documentElement[addOrRemove]('pointermove', this._handleMove, false)
      document.documentElement[addOrRemove]('pointerup', this.dragEnd, true)
    },
    resize (val) {
      const addOrRemove = val ? 'addEventListener' : 'removeEventListener'
      document.documentElement[addOrRemove]('pointermove', this._handleResize, false)
      document.documentElement[addOrRemove]('pointerup', this.resizeEnd, false)
    },
    gridSize (newSize, oldSize) {
      this.position.x = this.position.x / oldSize * newSize
      this.position.y = this.position.y / oldSize * newSize
      this.position.width = this.position.width / oldSize * newSize
      this.position.height = this.position.height / oldSize * newSize
    }
  },
  computed: {
    style () {
      return {
        left: this.position.x + 'px',
        top: this.position.y + 'px',
        width: this.position.width + 'px',
        height: this.position.height + 'px',
        cursor: (this.drag && (this.movements > 0)) ? 'move' : 'default'
      }
    }
  },
  methods: {
    _handleMove (event) {
      this.movements++
      const boundaries = this.$parent.$el.getBoundingClientRect()
      this.position.x = event.pageX - this.origin.x - boundaries.left
      this.position.y = event.pageY - this.origin.y - boundaries.top
      if (this.constrain) {
        this.constrainPosition(boundaries)
      }
    },
    _handleResize (event) {
      const boundaries = this.$parent.$el.getBoundingClientRect()
      this.position.width = this.origin.width + event.pageX - this.origin.x
      this.position.height = this.origin.height + event.pageY - this.origin.y
      if (this.constrain) {
        this.constrainDimensions(boundaries)
      }
      this.position.width = this._closestToGrid(this.position.width)
      this.position.height = this._closestToGrid(this.position.height)
    },
    _closestToGrid (position) {
      const roundOrFloor = (position % this.gridSize > (this.gridSize / 2)) ? 'round' : 'floor'
      return Math[roundOrFloor](position / this.gridSize) * this.gridSize
    },
    constrainPosition (boundaries) {
      let { x, y } = this.position
      if (this.position.x + this.position.width > boundaries.width) {
        x = boundaries.width - this.position.width
      } else if (this.position.x < 0) {
        x = 0
      }
      if (this.position.y + this.position.height > boundaries.height) {
        y = boundaries.height - this.position.height
      } else if (this.position.y < 0) {
        y = 0
      }
      this.outOfConstrains = (x !== this.position.x || y !== this.position.y)
      if (this.constrain && this.outOfConstrains) {
        this.position.x = x
        this.position.y = y
        this.outOfConstrains = false
      }
    },
    constrainDimensions (boundaries) {
      let { width, height } = this.position
      if (this.position.width + this.position.x > boundaries.width) {
        width = Math.abs(this.position.x - boundaries.width)
      } else if (this.position.width < this.gridSize) {
        width = this.gridSize
      }
      if (this.position.height + this.position.y > boundaries.height) {
        height = Math.abs(this.position.y - boundaries.height)
      } else if (this.position.height < this.gridSize) {
        height = this.gridSize
      }
      this.outOfConstrains = (width !== this.position.width || height !== this.position.height)
      if (this.constrain && this.outOfConstrains) {
        this.position.width = width
        this.position.height = height
        this.outOfConstrains = false
      }
    },
    dragStart (event) {
      if (this.readonly) return
      const boundaries = this.$parent.$el.getBoundingClientRect()
      this.origin.x = event.pageX - this.position.x - boundaries.left
      this.origin.y = event.pageY - this.position.y - boundaries.top
      this.drag = true
    },
    dragEnd (event) {
      this.drag = false
      if (this.movements > 0) {
        event.stopPropagation(true)
        this.movements = 0
        this.position.x = this._closestToGrid(this.position.x)
        this.position.y = this._closestToGrid(this.position.y)
        this.$emit('drag', {
          col: this.position.x / this.gridSize,
          row: this.position.y / this.gridSize,
          outside: this.outOfConstrains
        })
      }
    },
    resizeStart (event) {
      if (this.readonly) return
      this.origin.x = event.pageX
      this.origin.y = event.pageY
      this.origin.width = this.position.width
      this.origin.height = this.position.height
      this.resize = true
    },
    resizeEnd (event) {
      this.resize = false
      this.$emit('resize', {
        colSpan: this.position.width / this.gridSize,
        rowSpan: this.position.height / this.gridSize
      })
    }
  }
}
</script>

<style scoped>
  .grid-item {
    overflow: hidden;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, .5);
    &.readonly {
      border-color: transparent;
    }
  }

  .resize-handle {
    display: block;
    width: 25px;
    height: 25px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    cursor: se-resize;
  }

  .resize-handle::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    right: -50%;
    bottom: -50%;
    display: block;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, .5) 25%, transparent 25%,
  			transparent 50%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, .5) 75%,
  			transparent 75%, transparent);
    background-size: 8px 8px;
    transform: rotate(45deg);
  }
</style>
