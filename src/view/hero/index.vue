<template>
  <div>
    <crud ref="crud" :config="config">
    </crud>

  </div>
</template>

<script>
import crud from '/src/components/crud/index.vue'
import { apiLearnWord } from '/src/api/englishWord.js'

export default {
  components: {
    crud: crud
  },
  data () {
    return {
      config: {
        module: 'hero',
        fields: [{
          label: '图片',
          prop: 'image',
          width: '15%',
          type: 'base64Image'
        }, {
          label: '长名称',
          prop: 'longName'
        }, {
          label: '短名称',
          prop: 'shortName'
        }, {
          label: '公共名称',
          prop: 'commonName'
        }, {
          label: '详情链接',
          prop: 'detailUrl',
          overHidden: true
        }]
      }
    }
  },
  methods: {
    /**
       * 跳转百度翻译
       */
    goBaiduTranslate (item) {
      const url = `https://fanyi.baidu.com/#en/zh/${item.name}`
      window.open(url)
      // this.dialogUrl = url
      // this.dialogVisible = true

      // if(this.baiduTranslateWindow) {
      //   this.baiduTranslateWindow.close()
      // } else {
      //   let vo = window.open(url);
      //   this.baiduTranslateWindow = vo
      // }

      this.learnWord(item.id)
    },
    /**
       * 学习次数加 1
       */
    async learnWord (id) {
      await apiLearnWord({ id })
      this.$refs.crud.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    box-sizing: border-box;
    .list-item  {
      min-width: 90px;
      margin-right: 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      .name {
        padding: 10px 20px;
        background-color: #38e1fe;
        border-radius: 4px 4px 0 0;
        font-size: 15px;
      }
      .description {
        padding: 8px 20px;
        background-color: #fff0f1;
        color: #717070;
        border-radius: 0 0 4px 4px;
      }
    }
  }
</style>
