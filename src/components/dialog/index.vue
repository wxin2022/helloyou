<template>
  <div class="yy-dialog-root" v-if="visible">
    <div class="yy-dialog-mask"></div>
    <div class="yy-dialog-body">
      <yy-button class="close-icon" type="close" @click="close"></yy-button>
      <div class="yy-dialog-head">
        窗口标题
      </div>
      <div class="yy-dialog-content">
        <slot></slot>
      </div>

      <div class="yy-dialog-footer">
        <yy-button type="default" @click="close">取 消</yy-button>
        <yy-button type="primary" @click="handleClickOk">确 定</yy-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    handleClickOk () {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped lang="less">
  .yy-dialog-root {
    .yy-dialog-mask {
      position: fixed;
      top:0;
      right:0;
      bottom: 0;
      left:0;
      background-color: #00000073;
      z-index: 1000;
    }

    .yy-dialog-body {
      position: fixed;
      width: 50%;
      left: 0;
      right:0;
      margin: auto;
      background-color: #fff;
      z-index: 1000;
      border-radius: 4px;
      // transform: translate(0, -50%);
      top: 10%;
      .close-icon {
        position: absolute;
        right:0;
        top:0;
        height: 56px;
      }
      .yy-dialog-head {
        padding: 16px 24px;
        color: @titleTextColor;
        font-weight: 500;
        background: #fff;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 4px;
        font-size: 16px;
        line-height: 22px;
      }

      .yy-dialog-content {
        padding: 20px;
      }

      .yy-dialog-footer {
        padding: 10px 16px;
        text-align: right;
        background: transparent;
        border-top: 1px solid #e8e8e8;
        border-radius: 0 0 4px 4px;
        button {
          margin-right: 6px;
        }
      }
    }
  }
</style>
