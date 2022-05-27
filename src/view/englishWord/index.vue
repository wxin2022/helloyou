<template>
  <div>
    <crud ref="crud" :config="config">
      <template v-slot:list="{ tableData }">
        <div class="list-wrap">
          <div
            class="list-item"
            v-for="item in tableData"
            :key="item.id">
            <yy-menu>
              <div class="name" title="去百度翻译" @click="goBaiduTranslate(item)">{{ item.name }}</div>
              <div class="description" :title="`学习次数：${item.learningTimes}`" @click="learnWord(item.id)">{{ item.description }}</div>

              <template v-slot:menu>
                <div @click="$refs.crud.goEdit(item)">修改</div>
                <div @click="$refs.crud.remove(item)">删除</div>
              </template>
            </yy-menu>
          </div>
        </div>
      </template>
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
        module: 'englishWord',
        fields: [{
          label: '词语',
          prop: 'name',
          width: '15%'
        }, {
          label: '描述',
          prop: 'description'
        }, {
          label: '来源',
          prop: 'source'
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
