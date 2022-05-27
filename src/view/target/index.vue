<template>
  <div>
    <crud :config="config"></crud>
  </div>
</template>

<script>
import crud from '/src/components/crud/index.vue'
export default {
  components: {
    crud
  },
  data () {
    return {
      config: {
        module: 'target',
        fields: [{
          label: '名称',
          prop: 'name'
        }, {
          label: '内容',
          prop: 'content'
        }, {
          label: '状态',
          prop: 'status'
        }, {
          label: '进度',
          prop: 'progress'
        }]
      }
    }
  }
}
</script>
