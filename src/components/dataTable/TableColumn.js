import { h } from 'vue'
export default {
  props: {
    // 属性名称
    prop: {
      type: String
    },
    // 列标题
    label: {
      type: String
    },
    // 宽度
    width: {
      type: String,
      default: 'auto'
    },
    // 格式化类型 date dateTime ...
    formatType: {
      type: String
    },
    // 类型， 文本， 图片 。。。
    contentType: {
      type: String,
      default: 'text'
    },
    // 溢出显示 ...
    overHidden: {
      type: Boolean,
      default: false
    }
  },
  render () {
    return h('div', this.$slots.default)
  },
  mounted () {
    // let render = this.$slots.default({name: '鱼鱼鱼'})
    const parent = this.$parent

    const children = parent.$refs.hiddenColumns.children
    const columnIndex = [].indexOf.call(children, this.$el)

    parent.insertColumn({
      columnIndex,
      label: this.label,
      prop: this.prop,
      width: this.width,
      render: this.$slots.default || null,
      formatType: this.formatType,
      contentType: this.contentType,
      overHidden: this.overHidden
    })
  }
}
