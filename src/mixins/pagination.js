/**
 * 分页相关 js
 */
export default {
  data () {
    return {
      size: 15,
      current: 1,
      total: 0,
      tableData: [],
      tableLoading: false
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    /**
     * 加载表格数据
     * 需要存在 tableApi
     */
    async loadTableData () {
      if (!this.tableApi) {
        return console.log('没有查询数据的请求api')
      }
      this.tableLoading = true
      const res = await this.tableApi(this.searchData || {
        size: this.size,
        current: this.current
      })
      this.total = res.total
      this.tableData = res.records
      // console.log(this.tableData)
      this.tableLoading = false
    },
    /**
     * 页码，size改变
     */
    changePage ({ current, size }) {
      this.current = current
      this.size = size
      this.loadTableData()
    }
  }
}
