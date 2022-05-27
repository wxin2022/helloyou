<template>
  <div class="yy-select-wrap" tabindex="1">
    <div class="yy-select">{{ showText }}</div>
    <div class="yy-option-panel">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="jsx">
import { computed } from 'vue'

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean]
    }
  },
  data () {
    return {
      optionList: [] // 存 option this 实例 (在option created事件中 push)
    }
  },
  computed: {
    showText () {
      const option = this.optionList.find(option => option.value === this.modelValue)
      if (option) {
        return option.currentLabel
      }

      return this.modelValue
    }
  },
  emits: ['update:modelValue', 'change'],
  provide () {
    return {
      selectNode: this
    }
  },
  methods: {
    setText (text) {
      this.text = text
    },
    handleClickItem (value) {
      const changeFlag = value !== this.modelValue
      this.$emit('update:modelValue', value)
      changeFlag && (this.$emit('change', value))
      this.$el.blur()
    }
  },
  setup (props, { slots }) {
    // const nodeList = slots.default()
    // console.log(nodeList)

    // const handleClickOption = (e) => {
    //   console.log('点击面板', e)
    // }

    // return () => {
    //   return (
    //     <div class="yy-select-wrap">
    //       <yy-input></yy-input>
    //       <div class="panel-wrap">
    //         {
    //           nodeList.map((node, index) => {
    //             return <div class="yy-option" onClick={ () => { handleClickOption(node.props.value) } }>{ node.children }</div>
    //           })
    //         }
    //       </div>
    //     </div>
    //   )
    // }
  }
}
</script>

<style lang="less" scoped>
  .yy-select-wrap {
    display: inline-block;
    width: 200px;
    height: 32px;
    position: relative;
    cursor: pointer;

    .yy-select {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 12px;
      border: 1px solid #ccc;
    }

    &:focus, &:hover {

      .yy-select {
        border: 1px solid  #40a9ff;
      }
    }

    &:focus > .yy-option-panel {
        display: block;
    }

    .yy-option-panel {
      display: none;
      position: absolute;
      z-index: 999;
      min-width: 100%;
      top: 102%;
      left:0;
      background-color: #fff;
      border: 1px solid #ccc;
      border-top: none;
    }
  }
</style>
