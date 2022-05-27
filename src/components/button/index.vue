<template>
  <button class="yy-button" :class="className">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary' // text
    },
    size: {
      type: String, // mini
      default: 'standard'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
       * 计算类名
       */
    className () {
      let className = null
      switch (this.type) {
        case 'close': className = 'close iconfont icon-yuyinguanbi'; break
        default: className = this.type; break
      }

      className += ' ' + this.size

      this.disabled && (className += ' disabled')
      return className
    }
  }
}
</script>

<style scoped lang="less">
  .yy-button {
    line-height: 1.499;
    font-weight: 400;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    // text-shadow: 0 -1px 0 rgba(0,0,0,.12);
    // box-shadow: 0 2px 0 rgba(0,0,0,.045);
    background-image: none;
    font: 400 13.3333px Arial;
    outline: none;
    background-color: #fff;
    border-color: #fff;
    text-transform: none;
    user-select: none;
    touch-action: manipulation;
    border:none;

    &.default {
      border: 1px solid #d9d9d9;
      color: #000000a6;
      &:not(.disabled):hover,
      &.active {
        color: @primaryColorHover;
        border-color: @primaryColorHover;
      }
    }

    // 主 按钮
    &.primary {
      color: #fff;
      background-color: @primaryColor;
      border: 1px solid @primaryColor;
      &:not(.disabled):hover {
        background-color: @primaryColorHover;
        border-color: @primaryColorHover;
      }
    }

    &.text {
      color: @primaryColor;
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
      &:hover {
        color: @primaryColorHover;
      }
    }

    &.close {
      background-color: transparent;
      color: #00000073;
      font-size: 15px;
      &:hover {
        color: #000000bf;
      }
    }

    &.mini {
      font-size: 11px;
      padding: 0 8px;
      height: 26px;
      line-height: 26px;
    }

    &.disabled {
      color: #00000040;
      background: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
      cursor: not-allowed;
    }
  }
</style>
