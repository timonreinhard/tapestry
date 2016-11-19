<template>
  <div class="window-widget" :class="cssClass">
    <div v-if="edit">
      <form @submit.prevent>
        <input v-model="label" :placeholder="item.label">
        <select v-model="itemName">
          <option v-for="item in items" v-bind:value="item.name">
            {{ item.name }}
          </option>
        </select>
      </form>
      <button @click="remove">Delete</button>
      <button @click="close">Close</button>
    </div>
    <div v-else class="container">
      <div class="icon"><img src="~assets/icons/window.svg"></div>
      <p class="label">{{ widget.label }}</p>
    </div>
  </div>
</template>

<script>
import widget from './widget'
export default {
  mixins: [widget],
  data () {
    return {
    }
  },
  computed: {
    cssClass () {
      return typeof this.item.state === 'string' ? this.item.state.toLowerCase() : null
    }
  }
}
</script>

<style scoped>
.window-widget {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgba(30,30,30,0.5);
  border-radius: 4px;
  border: 1px solid rgb(100, 100, 100);
  padding: 10px;
  position: relative;

  &.open {
    background: rgb(255,48,0)
  }

  & h2 {
    margin: 0;
    padding: 0;
  }

  & .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;

    & .icon {
      align-self: stretch;
      flex: 1 1 0;
      overflow: hidden;
      position: relative;
      text-align: center;

      & img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    & .label {
      flex: 0 0 0;
      margin: 0;
      padding: 10px 0 0;
      text-align: center;
    }
  }
}
</style>
