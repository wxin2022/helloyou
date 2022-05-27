<template>
  <div class="form-item-wrap">
    <div class="item-label">{{ label }}：</div>
    <div class="item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '字段'
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .form-item-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    .item-label {
      width: 90px;
      text-align: right;
      padding-right: 12px;
    }
    .item-content {
      flex-grow: 1;
    }
  }
</style>
