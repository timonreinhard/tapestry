<template>
  <div class="__switch-item" :data-state="item.state | lowercase">
    <div class="text">
      <div v-if="item.label" class="label">{{ item.label }}</div>
      <div class="state">{{ item.state }}</div>
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
.__switch-item {
  background: rgb(124, 179, 37);
  color: white;
  border-radius: 4px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 9rem;

  &[data-state="on"] {
    background-color: rgb(216, 84, 31);
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
