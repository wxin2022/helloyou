<template>
  <div class="base-container">
    <div class="form-wrap">
        <yy-form-item
          v-for="field in searchColumns"
          :key="field.prop"
          :label="field.label">
          <yy-input v-model="formData[field.prop]"></yy-input>
        </yy-form-item>
    </div>

    <div class="btn-wrap">
      <yy-button @click="handleAdd">添加</yy-button>
    </div>

    <div class="data-list-wrap">
      <slot name="list" :tableData="tableData">
        <data-table :data="tableData">

          <!-- 序号列 -->
          <template v-if="showRowNumber">
            <table-column width="50px" label="序号">
              <template v-slot="{ index }">
                {{ pagination ? (current - 1) * size + index + 1 : index + 1 }}
              </template>
            </table-column>
          </template>

          <table-column
            :width="field.width || '30%'"
            v-for="field in tableColumns"
            :key="field.prop"
            :label="field.label"
            :prop="field.prop"
            :overHidden="field.overHidden"
            :contentType="field.type">
          </table-column>

          <table-column label="操作" width="120px">
            <template v-slot:default="{ row }">
              <yy-button type="text" @click="goEdit(row)">编辑</yy-button>
              <yy-button type="text" @click="remove(row)">删除</yy-button>
            </template>
          </table-column>
        </data-table>
      </slot>
      <yy-pagination
        v-if="pagination"
        :size="size"
        :current="current"
        :total="total"
        @change="handleChangePage"></yy-pagination>
    </div>

    <myDialog
      v-model:visible="dialog.visible"
      @submit="saveData">
      <yy-form-item
        v-for="field in formColumns"
        :key="field.prop"
        :label="field.label">

        <base64-image v-if="field.type === 'base64Image'" v-model="formData[field.prop]"></base64-image>

        <yy-input v-else v-model.trim="formData[field.prop]"></yy-input>

      </yy-form-item>
    </myDialog>
  </div>
</template>

<script>
import DataTable from '/src/components/dataTable/index.vue'
import TableColumn from '/src/components/dataTable/TableColumn.js'
import myDialog from '/src/components/dialog/index.vue'
import createApi from '/src/config/createApi.js'
import pagination from '/src/mixins/pagination.js'
import Base64Image from '/src/components/form/base64Image/index.vue'

export default {
  components: {
    'data-table': DataTable,
    'table-column': TableColumn,
    myDialog: myDialog,
    'base64-image': Base64Image
  },
  mixins: [pagination],
  props: {
    config: {
      type: Object,
      required: true
      // validator: (value) => {
      //   return !value.module || !value.fields
      // }
    },
    // 查询参数
    searchData: {
      type: Object
    }
  },
  data () {
    return {
      configDemo: {},
      dialog: {
        visible: false
      },
      formData: {}, // 表单
      tableData: [] // 表格数据
    }
  },
  computed: {
    /**
       * 查询表单列
       */
    searchColumns () {
      return this.config && this.config.fields ? this.config.fields.filter(field => field.isSearch !== false) : []
    },
    /**
       * 表格列
       */
    tableColumns () {
      return this.config && this.config.fields ? this.config.fields.filter(field => field.isColumn !== false) : []
    },
    /**
       * form表单列
       */
    formColumns () {
      return this.config && this.config.fields ? this.config.fields.filter(field => field.isForm !== false) : []
    },
    // 新增接口
    saveApi () {
      const url = this.config.saveURL || this.config.module + '/save'
      return createApi({ url })
    },
    // list 接口
    listApi () {
      const url = this.config.listURL || this.config.module + (this.pagination ? '/page' : '/list')
      return createApi({ url })
    },
    // 删除接口
    removeApi () {
      const url = this.config.removeURL || this.config.module + '/remove'
      return createApi({ url })
    },
    // 编辑接口
    editApi () {
      const url = this.config.editURL || this.config.module + '/update'
      return createApi({ url })
    },
    // 是否分页
    pagination () {
      return this.config.pagination === true
    },
    // 查询表格参数
    computedSearchData () {
      const data = Object.assign({}, this.searchData)
      if (this.pagination) {
        data.size = this.size
        data.current = this.current
      }
      return data
    },
    // 是否显示序号列
    showRowNumber () {
      return this.config.showRowNumber !== false
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    /**
       * 查询表格数据
       */
    async getTableData () {
      const data = await this.listApi(this.computedSearchData)

      if (this.pagination) {
        this.tableData = data.records
        this.total = data.total
      } else {
        this.tableData = data
      }
    },
    /**
       * 处理分页改变事件
       */
    handleChangePage ({ current, size }) {
      this.current = current
      this.size = size
      this.getTableData()
    },
    /**
       * 刷新
       */
    refresh () {
      this.getTableData()
    },
    /**
       * 处理添加
       */
    handleAdd () {
      this.createFormData()
      this.dialog.visible = true
    },
    /**
       * 创建一个 formData对象
       */
    createFormData (entity = {}) {
      const formData = this.formColumns.reduce((obj, current) => {
        obj[current.prop] = entity[current.prop]
        return obj
      }, {})
      formData.id = entity.id
      this.formData = formData
    },
    /**
       * 保存表单数据
       */
    async saveData () {
      const api = this.formData.id ? this.editApi : this.saveApi
      await api(this.formData)
      this.getTableData()
      this.dialog.visible = false
    },
    /**
       * 删除
       */
    async remove (row) {
      await this.removeApi({ id: row.id })
      this.getTableData()
    },
    goEdit (row) {
      this.createFormData(row)
      this.dialog.visible = true
    }
  }
}

</script>

<style lang="less" scoped>
  .form-wrap {
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .form-item-wrap {
      flex-shrink: 0;
    }
  }
  .btn-wrap {
    padding: 10px 0;
  }
</style>
