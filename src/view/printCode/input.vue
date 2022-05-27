<template>
  <div class="base-container">
    <div class="code-debug">
      <code-debug ref="code-debug"></code-debug>
    </div>

    <!-- <div class="code-show">
      <yy-code-panel
        v-for="record in tableData"
        :key="record.id"
        :code="record.code"
        :result="record.result">
      </yy-code-panel>

      <yy-pagination :total="total" :size="size" :current="current" @change="changePage"></yy-pagination>
    </div> -->
  </div>
</template>

<script>
import { apiListCode } from '/src/api/codeDebug.js'
import CodeDebug from '/src/components/codeEditor/index.vue'
import pagination from '/src/mixins/pagination.js'

export default {
  mixins: [pagination],
  components: {
    'code-debug': CodeDebug
  },
  data () {
    return {
      code: 'function tett() {}',
      tableApi: apiListCode
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .base-container {
    display: flex;
    .code-debug {
      box-sizing: border-box;
      width: 100%;

    }
    .code-show {
      box-sizing: border-box;
      width: 55%;
      padding-left: 20px;
    }
  }
</style>
