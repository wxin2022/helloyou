<template>
  <input
    v-if="type === 'text'"
    :value="modelValue"
    @input="handleInput"
    type="text"
    class="yy-input"
    :placeholder="placeholder"/>
  <textarea v-else-if="type === 'textarea'" :value="modelValue" @input="handleInput" class="yy-input textarea" :placeholder="placeholder"></textarea>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    placeholder: {
      type: String,
      default: '请输入'
    },
    type: {
      type: String, // text, textarea
      default: 'text'
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput ($event) {
      this.$emit('update:modelValue', $event.target.value)
    }
  }
}
</script>

<style scoped lang="less">
  .yy-input {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 4px 11px;
    color: #000000a6;
    font-size: 14px;
    border-radius: 4px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    transition: all .3s;
    &:hover,
    &:focus {
      border-color: #40a9ff;
      border-right-width: 1px!important;
    }
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px #1890ff33;
    }

    &.textarea {
      min-height: 80px;
      padding: 12px;
      resize: vertical;
    }
  }
</style>
