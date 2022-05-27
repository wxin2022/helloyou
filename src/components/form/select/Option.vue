<template>
  <div
    class="yy-option"
    @click="handleClickOption"
    :class="{ active: isActive }">
    <slot>{{ currentLabel }}</slot>
  </div>
</template>

<script>
export default {
  props: ['value', 'label'],
  inject: ['selectNode'],
  computed: {
    /**
       * 是否活跃
       */
    isActive () {
      return this.value === this.selectNode.modelValue
    },
    /**
       * 计算option 标签显示文本
       *  */
    currentLabel () {
      return this.label || this.$slots.default()[0].children
    }
  },
  created () {
    this.selectNode.optionList.push(this)
  },
  beforeUnmount () {
    this.selectNode.optionList.slice(this.selectNode.optionList.indexOf(this), 1)
  },
  methods: {
    handleClickOption () {
      this.selectNode.handleClickItem(this.value)
    }
  }
}
</script>

<style lang="less" scoped>
  .yy-option {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 5px 14px;
    &:hover {
      background-color: #e6f7ff;
    }
  }
</style>
