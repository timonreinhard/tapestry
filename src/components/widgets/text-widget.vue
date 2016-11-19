<template>
  <div class="text-widget">
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
    <div v-else>
      <small>{{ widget.label }}</small>
      <h2>{{ item.state }}</h2>
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
  }
}
</script>

<style scoped>
.text-widget {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgba(30,30,30,0.5);
  border-radius: 4px;
  border: 1px solid rgb(100, 100, 100);
  padding: 10px;

  & h2 {
    margin: 0;
    padding: 0;
  }
}
</style>
