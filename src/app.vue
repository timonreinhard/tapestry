<template>
  <div id="app">
    <dashboard-view></dashboard-view>
  </div>
</template>

<script>
import DashboardView from './components/dashboard-view'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    DashboardView
  },
  created () {
    this.subscribe()
    this.fetchItems()
  },
  methods: {
    ...mapActions([
      'fetchItems',
      'subscribe'
    ])
  }
}
</script>

<style lang="scss">
@import 'scss/palette.scss';
@import 'scss/icons.scss';
@import 'scss/transitions.scss';
@import 'scss/typography.scss';

html, body, ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

html {
  font-size: 75%;
}

body {
  font-size: 1.33rem;
  background-color: #0a1c2e;
}

</style>
