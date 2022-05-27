<template>
  <div class="pagination-wrap" ref="wrap">
    <div class="page-btn page-item">
      <yy-button type="default" :disabled="current <= 1" @click="prevPage"><i class="iconfont icon-fanye1"></i></yy-button>
    </div>

    <div class="page-list page-item">
      <yy-button
        :type="`default ${num === this.current ? 'active': ''}`"
        class="page-item"
        v-for="num in showPages"
        :key="num"
        @click="handleChangeCurrent(num)"
        >
        {{ num === -1 ? '···' : num }}
      </yy-button>
    </div>

    <div class="page-btn page-item">
      <yy-button type="default" :disabled="current >= pages" @click="nextPage"><i class="iconfont icon-fanye"></i></yy-button>
    </div>

    <div class="size-select page-item">选择页码&nbsp;</div>

    <div class="jump-page page-item">
      <!-- page -->
      <!--   -->
      跳至&nbsp;<yy-input v-model="inputPage" @keyup.enter.stop.prevent="handleInputPage" class="text-input" placeholder="页码"></yy-input>&nbsp;页
    </div>

  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ['change'],
  data () {
    return {
      // current: 8,
      // total: 120,
      // size: 10,
      maxBlock: 7, // 最大能显示的页码块数量, 不包含省略块
      inputPage: null // 输入的页码
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.total / this.size)
    },
    showPages () {
      console.log(this.pages)
      if (this.pages <= this.maxBlock) {
        const showPage = Array.from({ length: this.pages }, (x, i) => ++i)
        return showPage
      }

      // 最大显示 7 块
      // 判断当前 current 是否在中间，
      const showPage = []

      const rightDiff = this.pages - this.current
      let center = Math.floor(this.maxBlock / 2)
      rightDiff <= center // 循环右侧

      // current <= center   // 循环左侧
      const current = this.current

      if (current <= center + 2) {
        for (let i = 0; i <= center; i++) {
          showPage[i] = i + 1
        }
      } else {
        for (let i = center; i >= 1; i--) {
          showPage[i] = this.current - center + i
        }
        showPage[0] = 1
        showPage.splice(1, 0, -1) // 添加 -1 表示 省略号
        center = center + 1
      }

      if (rightDiff <= center - 1) {
        for (let i = 1; i <= rightDiff; i++) {
          showPage[center + i] = current + i
        }
      } else {
        for (let i = 1; i < center - 1; i++) {
          showPage[center + i] = showPage[center + i - 1] + 1
        }
        showPage.push(-1)
        showPage.push(this.pages)
      }
      return showPage
    }
  },
  mounted () {
    // this.computedMaxNum()
  },
  methods: {
    /**
       * 计算最大能显示的页码块
       */
    computedMaxNum () {
      const wrap = this.$refs.wrap
      console.dir(wrap.offsetWidth)
    },
    /**
       * 点击页码，处理改变事件
       */
    handleChangeCurrent (page) {
      if (page !== this.current && page !== -1) {
        page = page > this.pages ? this.pages : (page >= 1 ? page : 1)
        this.$emit('change', {
          current: page,
          size: this.size
        })
        return page
      }
    },
    /**
       * 下一页
       */
    nextPage () {
      this.handleChangeCurrent(this.current + 1)
    },
    /**
       * 上一页
       */
    prevPage () {
      this.handleChangeCurrent(this.current - 1)
    },
    /**
       * 处理页码输入
       */
    handleInputPage () {
      const current = this.handleChangeCurrent(parseInt(this.inputPage, 10))
      this.inputPage = current
    }
  }
}
</script>

<style scoped lang="less">
  .pagination-wrap {
    margin: 15px 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #000000a6;
    .page-item {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
    // .page-btn {

    // }

    // .page-list {

    // }

    // .size-select {

    // }

    .jump-page {
      display: flex;
      align-items: center;
      .text-input {
        width: 65px;
      }
    }
  }
</style>
