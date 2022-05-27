<template>
  <!-- 控制台 -->
  <div class="console-wrap">
    <div class="result-wrap">
      <pre class="result" v-for="result in resultList" :key="result" v-text="result"></pre>
    </div>
    <div class="tools">
      <div class="tip">控制台</div>
      <div class="tip" v-show="execUseTime !== null">执行耗时：{{execUseTime}} 毫秒</div>
      <div class="tip" v-if="lastExecuteTime">上次执行：{{formatDate(lastExecuteTime)}}</div>
    </div>
  </div>
</template>

<script>
const resultList = []
const log = function () {
  console.log(arguments)
  const args = [...arguments]
  const isPrintObj = args[0] && args[0] === '__$$'
  isPrintObj && args.splice(0, 1)

  let result = ''
  args.forEach(value => {
    if (isPrintObj && Object.prototype.toString.call(value) === '[object Object]') {
      result += JSON.stringify(value) + '\t'
    } else {
      result += String(value) + '\t'
    }
  })
  resultList.push(result)
}

export default {
  data () {
    return {
      code: '',
      execUseTime: null, // 执行耗时
      lastExecuteTime: null, // 上次执行日期
      resultList: []
    }
  },
  methods: {
    /**
       * 执行代码 print(5/2) printObj({name: 555})
       */
    execute (code) {
      this.resultList.length = 0
      this.code = code
      console.log(this.code)
      if (!this.code) {
        this.resultList.push('请输入代码！')
        return
      }

      // 改造code, $有特殊意义，三个$ 其实为 两个
      let newCode = this.code.replace(/printObj\(/g, 'log("__$$$",')
      newCode = newCode.replace(/print\(/g, 'log(')
      newCode = newCode.replace(/console\.log\(/g, 'log(')
      newCode = newCode.replace(/console\.obj\(/g, 'log("__$$$",')

      if (newCode.indexOf('log') === -1) {
        newCode = `log(${newCode})`
      }
      console.log(newCode)

      const startTime = Date.now()
      try {
        eval(newCode)
      } catch (err) {
        console.log(err)
        log('执行失败：' + err.message)
      }
      this.execUseTime = Date.now() - startTime
      this.lastExecuteTime = Date.now()
      this.resultList = [...resultList]
      resultList.length = 0
    },
    /**
       * 打印对象
       */
    logObj () {
      let result = ''
      for (const value of arguments) {
        console.log(value)
        if (Object.prototype.toString.call(value) === '[object Object]') {
          result += JSON.stringify(value) + '\t'
        } else {
          result += value.toString() + '\t'
        }
      }
      this.resultList.push(result)
    },
    getResult () {
      return this.resultList.join(', ')
    },
    clear () {
      this.resultList.length = 0
      this.execUseTime = null
      this.lastExecuteTime = null
    }
  }
}
</script>

<style lang="less" scoped>
  .console-wrap {
    width: 100%;
    min-height: 120px;
    overflow: auto;
    background-color: #faf0ee;
    border-radius: 4px;
    padding: 14px 15px;
    padding-bottom: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 0 3px 2px #ffece9;

    .result-wrap {
      flex-grow: 1;
      max-height: 200px;
      overflow: auto;
      .result {
        font-size: 13px;
        font-family: sans-serif;
      }
    }

    .tools {
      border-top: 1px solid #e1d9f0;
      height: 30px;
      display: flex;
      align-items: center;
      .tip {
        padding-right: 20px;
        font-family: cursive;
        font-size: 13px;
      }
    }
  }

</style>
