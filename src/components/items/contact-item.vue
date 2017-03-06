<template>
  <div class="__contact-item" :data-state="item.state | lowercase">
    <div class="icon" :data-category="item.category | lowercase"></div>
    <div class="text">
      <div v-if="item.label" class="label">{{ item.label }}</div>
      <div class="state">
        <span v-if="item.state === 'OPEN'">{{ $t('item_states.open') }}</span>
        <span v-else-if="item.state === 'CLOSED'">{{ $t('item_states.closed') }}</span>
        <span v-else>{{ $t('item_states.unknown') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.__contact-item {
  background: #309c9c;
  color: white;
  border-radius: 4px;
  padding: 1rem;
  height: 9rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.25s;

  &[data-state="open"] {
    background-color: #da466e;
  }

  .icon {
    flex: 1 1 auto;
    align-self: center;
    height: 4rem;
    width: 4rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
