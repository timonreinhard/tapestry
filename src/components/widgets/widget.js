import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['edit', 'widget'],
  data () {
    return {}
  },
  mounted () {
    this.$el.addEventListener('pointerup', this.onClick, false)
  },
  beforeDestroy () {
    this.$el.removeEventListener('pointerup', this.onClick, false)
  },
  computed: {
    ...mapGetters({
      items: 'getItems'
    }),
    item () {
      return this.items.find(item =>
        item.name === this.widget.itemName
      ) || {}
    },
    itemName: {
      get () {
        return this.widget.itemName
      },
      set (itemName) {
        this.configureWidget({...this.widget, itemName})
      }
    },
    label: {
      get () {
        return this.widget.label
      },
      set (label) {
        this.configureWidget({...this.widget, label})
      }
    }
  },
  methods: {
    ...mapActions([
      'configureWidget',
      'selectWidget',
      'removeWidget'
    ]),
    onClick (event) {
      this.selectWidget(this.widget.id)
    },
    close (event) {
      this.selectWidget(null)
    },
    remove () {
      this.removeWidget(this.widget)
    }
  }
}
