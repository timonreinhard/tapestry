<template>
  <div id="app">
    <transition name="grow">
      <dashboard-view v-if="!editMode"></dashboard-view>
    </transition>
    <transition name="shrink">
      <edit-view v-if="editMode"></edit-view>
    </transition>
    <button class="edit-button" @click="toggleEditMode">Toggle Edit</button>
  </div>
</template>

<script>
import DashboardView from './components/dashboard-view'
import EditView from './components/edit-view'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    DashboardView,
    EditView
  },
  created () {
    this.subscribe()
    this.fetchItems()
  },
  computed: {
    ...mapGetters({
      editMode: 'getEditMode'
    })
  },
  methods: {
    ...mapActions([
      'toggleEditMode',
      'fetchItems',
      'subscribe'
    ])
  }
}
</script>

<style>
@import './css/transitions.css';
@import './css/typography.css';

html, body, ul, li {
  margin:0;
  padding:0;
}

body {
  background-color: #0a1c2e;
}

#app {
  width: 1024px;
  height: 768px;
  margin: 0 auto 0;
  position: relative;
}

.edit-button {
  position: absolute;
  top: 5px;
  left: 5px;
  margin: 0;
  padding: 0;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 100%;
  background: #333 url('./assets/icons/gear.svg') center center no-repeat;
  background-size: 15px 15px;
  text-indent: 100%;
  overflow: hidden;
  color: transparent;
  outline: none;
  cursor: pointer;
}

.edit-view,
.dashboard-view {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 600px;
}
</style>
