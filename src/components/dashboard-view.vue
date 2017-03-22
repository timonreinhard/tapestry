<template>
  <div class="__dashboard-view">
    <ul>
      <li class="item" v-for="item in items" :key="item.name">
        <contact-item v-if="item.type === 'Contact'" :item="item"></contact-item>
        <number-item v-else-if="item.type === 'Number'" :item="item"></number-item>
        <string-item v-else-if="item.type === 'String'" :item="item"></string-item>
        <switch-item v-else-if="item.type === 'Switch'" :item="item"></switch-item>
        <pre v-else-if="debug">{{ item }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StringItem from 'src/components/items/string-item'
import NumberItem from 'src/components/items/number-item'
import SwitchItem from 'src/components/items/switch-item'
import ContactItem from 'src/components/items/contact-item'

const debug = process.env.NODE_ENV !== 'production'

export default {
  components: {
    StringItem,
    NumberItem,
    SwitchItem,
    ContactItem
  },
  data () {
    return {
      debug
    }
  },
  computed: {
    ...mapGetters([
      'items'
    ])
  },
  methods: {
    ...mapActions([
      'addWidget'
    ])
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  margin: 0;
  padding: 0;
  list-style: none;
}

li:empty {
  display: none;
}

.item {
  margin: 5px;
  padding: 0;
  flex: 1 0 auto;
}
</style>
