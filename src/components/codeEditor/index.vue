<template>
  <div class="wrap">
    <editor class="editor" ref="editor"></editor>
    <console-component ref="console"></console-component>
    <div class="remark">
      备注：
      <yy-input type="textarea" v-model="remark"></yy-input>
    </div>
    <div class="btns">
      <button @click="execute">仅执行</button>
      <button @click="executeAndSave">执行保存</button>
      <button @click="saveCodeAndResult">保存</button>
      <button @click="goHistory">历史结果</button>
      <button @click="$refs.console.clear">清空结果</button>
    </div>
  </div>
</template>

<script>
import editor from './editor.vue'
import consoleComponent from './console.vue'
import { apiSaveCode } from '/src/api/codeDebug.js'
export default {
  components: {
    editor,
    'console-component': consoleComponent
  },
  data () {
    return {
      remark: ''
    }
  },
  methods: {
    getCode () {
      return this.$refs.editor.getCode()
    },
    getResult () {
      return this.$refs.console.getResult()
    },
    execute () {
      const code = this.getCode()
      this.$refs.console.execute(code)
    },
    saveCodeAndResult () {
      console.log(apiSaveCode)
      apiSaveCode({
        code: this.getCode(),
        result: this.getResult(),
        remark: this.remark
      }).then(() => {
        alert('保存成功')
      })
    },
    goHistory () {
      this.$router.push('/print/list')
    },
    executeAndSave () {
      this.execute()
      this.saveCodeAndResult()
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    overflow: auto;
  }
  .editor {
    height: 400px;
    margin-bottom: 20px;
  }
  .remark {
    height: 100px;
    display: flex;
    align-items: center;
    textarea {
      flex-grow: 1;
    }
  }
</style>
