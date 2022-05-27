<script lang='jsx'>
import { h } from 'vue'

export default {
  setup (props, context) {
    const nodes = context.slots.default()

    // 渲染函数写法
    // return () => {
    //   // return h(
    //   //   'div',
    //   //   { class: 'space-wrap' },
    //   //   nodes.map(node => { return h('div', { class: 'space-item'}, node) }
    //   //   )
    //   // )
    return () => {
      return <div class="space-wrap">
        {
          nodes.map(node => {
            return <div class="space-item">{ node }</div>
          })
        }
      </div>
    }
  }
}
</script>

<style lang="less" scoped>
  .space-wrap {
    .space-item {
      display: inline-block;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
