<template>
  <div>
    <crud :config="config"></crud>
  </div>
</template>

<script>
import crud from '/src/components/crud/index.vue'
export default {
  components: {
    crud: crud
  },
  data () {
    return {
      config: {
        module: 'codeStandard',
        pagination: true,
        fields: [{
          label: '名称',
          prop: 'name',
          width: '15%'
        }, {
          label: '内容',
          prop: 'content'
        }, {
          label: '举例',
          prop: 'example'
        }]
      }
    }
  }
}
</script>
