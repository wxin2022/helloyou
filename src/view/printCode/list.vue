<template>
  <div>

    <yy-space>
      <yy-button>ceshi 1</yy-button>
      <yy-button>222</yy-button>
    </yy-space>

    <data-table :data="tableData">
      <table-column label="标题" prop="title" width="40%">
        <template v-slot:default="{ row }">
          <pre><code>{{ row.code }} </code></pre>
        </template>
      </table-column>

      <table-column label="内容" prop="result"></table-column>
      <table-column label="备注" prop="remark"></table-column>
      <table-column label="日期" prop="createTime" formatType="date"></table-column>
    </data-table>

    <yy-pagination :size="size" :current="current" :total="total" @change="changePage"></yy-pagination>
  </div>
</template>

<script>
import { apiListCode } from '/src/api/codeDebug.js'
import pagination from '/src/mixins/pagination.js'

import DataTable from '/src/components/dataTable/index.vue'
import TableColumn from '/src/components/dataTable/TableColumn.js'

export default {
  components: {
    'data-table': DataTable,
    'table-column': TableColumn
  },
  mixins: [pagination],
  data () {
    return {
      tableApi: apiListCode
    }
  },
  mounted () {
    // console.log(this.tableData)
  },
  methods: {

  }
}
</script>
