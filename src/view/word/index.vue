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
        module: 'word',
        fields: [{
          label: '词语',
          prop: 'value',
          width: '15%'
        }, {
          label: '描述',
          prop: 'description'
        }, {
          label: '类型',
          prop: 'type'
        }]
      }
    }
  }
}
</script>
