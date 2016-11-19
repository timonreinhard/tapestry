<template>
  <div @pointerdown.prevent="dragStart" class="draggable" touch-action="none">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      proxy: null,
      drag: false,
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    }
  },
  mounted () {
    this.offset.width = this.$el.offsetWidth
    this.offset.height = this.$el.offsetHeight
  },
  watch: {
    drag (val) {
      const addOrRemove = val ? 'addEventListener' : 'removeEventListener'
      document.documentElement[addOrRemove]('pointermove', this._handleMove, false)
      document.documentElement[addOrRemove]('pointerup', this.dragEnd, false)
    }
  },
  methods: {
    dragStart (event) {
      const boundaries = event.target.getBoundingClientRect()
      this.offset.x = event.clientX - boundaries.left - window.scrollX
      this.offset.y = event.clientY - boundaries.top - window.scrollY
      this.position.x = event.clientX - this.offset.x
      this.position.y = event.clientY - this.offset.y
      this._createProxy()
      this.drag = true
    },
    dragEnd (event) {
      this.$nextTick(function () {
        // See https://github.com/jquery/PEP/issues/326
        document.body.removeChild(this.proxy)
      })
      this.drag = false
      this.$emit('drop', {
        x: this.position.x,
        y: this.position.y,
        width: this.offset.width,
        height: this.offset.height,
        name: this.name
      })
    },
    _handleMove (event) {
      this.position.x = event.clientX - this.offset.x
      this.position.y = event.clientY - this.offset.y
      this.proxy.style.left = this.position.x + 'px'
      this.proxy.style.top = this.position.y + 'px'
      this.$emit('move', {
        x: this.position.x,
        y: this.position.y,
        width: this.offset.width,
        height: this.offset.height,
        proxy: this.proxy
      })
    },
    _createProxy () {
      this.proxy = this.$el.cloneNode(true)
      this.proxy.style.position = 'absolute'
      this.proxy.style.opacity = 0.5
      this.proxy.style.left = this.position.x + 'px'
      this.proxy.style.top = this.position.y + 'px'
      document.body.appendChild(this.proxy)
    }
  }
}
</script>

<style scoped>
div {
  border: 1px solid white;
  width: 45px;
  height: 45px;
  transition: width 0.2s ease-in-out,
              height 0.2s ease-in-out,
              margin 0.2s ease-in-out;
}

img {
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  padding: 5px 0 5px 0;
  pointer-events: none;
}
</style>
