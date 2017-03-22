<template>
  <div class="__number-item">
    <div class="icon"></div>
    <div class="text">
      <div v-if="item.label" class="label">{{ item.label }}</div>
      <div class="state">{{ tweenedState | sprintf(pattern) }}</div>
    </div>
  </div>
</template>

<script>
import TWEEN from 'tween.js'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  watch: {
    'item.state': function (newValue, oldValue) {
      const vm = this
      let animationFrame

      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 350)
        .onUpdate(function () {
          vm.tweenedState = this.tweeningNumber
        })
        .onComplete(function () {
          window.cancelAnimationFrame(animationFrame)
        })
        .start()

      function animate (time) {
        TWEEN.update(time)
        animationFrame = window.requestAnimationFrame(animate)
      }

      animationFrame = window.requestAnimationFrame(animate)
    }
  },
  computed: {
    pattern () {
      return this.item.stateDescription
        ? this.item.stateDescription.pattern
        : '%.2f'
    }
  },
  data () {
    return {
      tweenedState: this.item.state
    }
  }
}
</script>

<style lang="scss" scoped>
.__number-item {
  background: rgb(193, 16, 103);
  color: white;
  border-radius: 4px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 9rem;

  .icon {
    flex: 1 1 auto;
    align-self: center;
    height: 4rem;
    img {
      height: 100%;
      width: auto;
    }
  }

  .text {
    flex: 1 1 100%;
    align-self: center;
    padding: 0.5rem 1rem 0;
    white-space: nowrap;
  }

  .label {
    text-align: center;
    font-weight: bold;
  }

  .state {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
  }

}
</style>
