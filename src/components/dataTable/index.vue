<template>
  <!-- 数据表格组件 -->
  <div>
    <div class="hiddenColumns" ref="hiddenColumns">
      <slot></slot>
    </div>

    <table class="data-table">
      <tr class="row head-row">
        <td class="ceil head-ceil" v-for="column in columns" :key="column.label" :style="{ width: column.width }">
          {{ column.label }}
        </td>
      </tr>

      <tr class="row body-row" v-for="(row, index) in data" :key="index + Date.now()">
        <td class="ceil body-ceil" v-for="column in columns" :key="column.label" :class="getCeilClass(column)">
           <template v-if="!column.render">

              <template v-if="column.formatType === 'date'">
                {{ formatDate(row[column.prop]) }}
              </template>

              <template v-else-if="column.formatType === 'dateTime'">
                {{ formatDate(row[column.prop], 'yyyy-MM-dd HH:mm:ss') }}
              </template>

              <template v-else-if="/image/i.test(column.contentType)">
                <img class="table-image" :src="row[column.prop]"/>
              </template>

              <template v-else>
                {{ row[column.prop] }}
              </template>
          </template>
          <template v-else>
            <render-ceil :render="column.render" :row="row" :index="index"></render-ceil>
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { h } from 'vue'
export default {
  components: {
    // 使用渲染函数渲染单元格
    'render-ceil': {
      props: {
        render: {
          type: Function
        },
        row: {
          type: Object
        },
        index: {
          type: Number
        }
      },
      setup (props) {
        const render = props.render
        const body = render({
          row: props.row,
          index: props.index
        })
        return () => h('pre', body)
      }
    }
  },
  data () {
    return {
      columns: [] // {label, prop, render, width}
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    /**
       * 插入列 , config 就是 column
       * label
       * prop
       * render
       */
    insertColumn (config) {
      this.columns.splice(config.columnIndex, 0, config)
    },
    /**
       * 获取 单元格class
       */
    getCeilClass (column) {
      let className = ''

      if (column.overHidden) {
        className += 'overHidden '
      }

      return className
    }
  }
}
</script>

<style lang="less" scoped src="./tableStyle.less">
  // .data-table {
  //   width: 100%;
  //   border-collapse: collapse;
  //   text-align: center;
  //   .row {
  //     height: 40px;
  //   }
  //   .head-row {
  //     background-color: #ccc;
  //   }
  //   .ceil {
  //     border: 1px solid #ccc;
  //     padding: 15px 0;
  //   }
  // }
</style>
