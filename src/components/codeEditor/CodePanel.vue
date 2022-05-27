<template>
  <div class="wrap">
    <div class="code-content" v-html="codeHtml"></div>
    <div class="code-result" v-if="result">{{result}}</div>
    <div class="btns">
      <yy-button size="mini" @click="copyCode">复 制</yy-button>
      <yy-button size="mini">调 试</yy-button>
      <!-- <yy-button>编辑</yy-button>  -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    code: String, // 传入代码
    result: String // 运行结果
  },
  data () {
    return {

    }
  },
  computed: {
    codeHtml () {
      const html = this.$hljs.highlight(this.code, { language: 'js' }).value
      // console.log(html)
      return html
    }
  },
  methods: {
    copyCode () {
      this.executeCopy(this.code)
      this.$message.success('复制成功')
    }
  }
  // watch: {
  //   code(){

  //   }
  // },
  // methods: {
  //   convert() {

  //   }
  // }
}
</script>

<style lang="less" scoped>
  .wrap {
    position: relative;
    margin-bottom: 18px;
    border-radius: 4px;
    max-height: 500px;
    resize: vertical;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .code-content {
      flex-grow: 1;
      width: 100%;
      padding: 12px;
      background-color: #23241f;
      white-space: pre;
      line-height: 25px;
      font-family: Consolas;
      font-size: 14px;
      color: #dfe1e0;
    }
    .btns {
      position: absolute;
      right: 10px;
      top: 10px;
      button {
        margin-right: 5px;
      }
    }

    .code-result {
      padding: 10px 12px;
      background-color: #e2d5d1;
      color: #8b6c6c;
      font-size: 13px;
      font-family: sans-serif;
      white-space: pre;
    }
  }

</style>
