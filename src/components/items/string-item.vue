<template>
  <div class="__string-item">
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
.__string-item {
  background: rgb(152, 10, 88);
  color: white;
  border-radius: 4px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 9rem;

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
