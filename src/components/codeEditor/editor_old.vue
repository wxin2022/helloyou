<template>
  <div class="yy-parent-wrap">

    <div class="yy-row-number-wrap" ref="rowNumber">
      <div class="yy-row-number" v-for="(seq) in rowNumbers" :key="`rowNumber${seq}`">
        {{seq}}
      </div>
    </div>

    <!-- @keydown.enter.stop.prevent="handleEnter" -->
    <!-- contenteditable="true" -->
    <textarea
      class="yy-editor"
      ref="editor"
      @scroll="handleScroll"
      @paste="handlePaste"
      @keydown.tab.stop.prevent="tab2Space"

      @focus="handleFocus"
      @blur="handleBlur"
      @compositionstart="handleCompositionstart"
      @compositionend="handleCompositionend"
      @input="handleInput"></textarea>

    <div class="yy-editor yy-editor-show" ref="editorShow">
    </div>
      <!-- <div class="yy-row" v-for="rowHtml in codeRowList" :key="rowHtml" v-html="rowHtml"></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      codeRowList: [],
      pasteTast: null,
      delayScroll: null,
      rowNumbers: 0
    }
  },
  created () {
    //  this.handlePaste()
    this.pasteTast = this.debounce(this.handleInput4, 10)
    this.delayScroll = this.debounce(this.syncScroll, 5)
  },
  methods: {
    /**
       * 修改默认粘贴事件
       */
    handlePaste () {
      var e = event || window.event
      // 阻止默认粘贴
      e.preventDefault()
      // 粘贴事件有一个clipboardData的属性，提供了对剪贴板的访问
      // clipboardData的getData(fomat) 从剪贴板获取指定格式的数据
      var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('请输入')
      // 除去字符串13 回车符
      text = text.replace(/\r/g, '')
      // 插入
      document.execCommand('insertText', false, text)
    },
    set (val) {
      console.log(val)
    },
    /**
       * 处理按下tab, 转换为输入2个空格
       */
    tab2Space (e) {
      // this.code = this.code + "  "
      document.execCommand('insertText', false, '  ')
    },
    delyTask (fn, delay) {
      let last = 0
      return (...args) => {
        const now = Date.now()
        if (now - last > delay) {
          last = now
          fn.apply(this, args)
        }
      }
    },
    debounce (fn, delay) {
      let timer
      return function (...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
      }
    },
    handleInput () {
      this.pasteTast()
    },
    handleInput4 () {
      const dom = this.$refs.editor
      const code = dom.value
      console.log(code)

      const len = (code.match(/\n/g) || []).length

      console.log(len)
      this.rowNumbers = len + 1
      // for(let char in Array.from(code)) {

      // }

      // console.log(...Array.from(code).map(char => char.charCodeAt()))

      const html = this.$hljs.highlightAuto(code).value
      this.$refs.editorShow.innerHTML = html
    },
    handleInput3 () {
      const dom = this.$refs.editor
      console.dir(dom)

      const domHtml = this.$refs.editor.innerHTML
      const newHtml = domHtml.replace(/<div><br><\/div>/g, '\n')
      console.log(newHtml)
      const newDom = document.createElement('div')
      newDom.innerHTML = newHtml

      console.dir(newDom)
      const code = newDom.innerText

      // let code = dom.innerText
      console.log(code)

      const html = this.$hljs.highlightAuto(code).value
      this.$refs.editorShow.innerHTML = html
    },
    /**
       * 监听输入
       */
    handleInput2 (e) {
      const dom = this.$refs.editor

      let count = 0
      const heigLightRows = [].map.call(dom.childNodes, (node, index) => {
        count++
        const t1 = Date.now()
        const text = node.nodeType === 3 ? node.nodeValue : node.innerText
        // if()
        let html = this.$hljs.highlightAuto(text).value
        // console.log(text)
        for (let i = 0; i < text.length; i++) {
          if (text[i].charCodeAt() === 9) { // tab
            html = `<span style="white-space:pre">${String.fromCharCode(9)}</span>` + html
            continue
          }
          if (text[i].charCodeAt() === 32) { // 空格
            html = '&nbsp;' + html
            continue
          }
          break
        }
        const t2 = Date.now()
        console.log('执行耗时', t2 - t1)
        return html
      })
      console.log('执行次数', count)
      this.codeRowList = heigLightRows
    },
    handleFocus () {
      //   console.log('获得焦点')
    },
    handleBlur () {
      //   console.log('失去焦点')
    },
    handleCompositionstart () {
      //   console.log('开始输入一段内容')
    },
    handleCompositionend () {
      //   console.log('结束输入一段内容')
    },
    getCode () {
      return this.$refs.editor.innerText
    },
    getHtmlCode () {
      // todo
    },
    handleEnter () {
      console.log('按下enter')
      document.execCommand('insertText', false, '\n')
    },
    handleScroll (e) {
      this.delayScroll(e)
    },
    /**
       * 同步滚动条，
       * TODO 使用延迟
       */
    syncScroll (e) {
      console.log(e)
      const scrollTop = e.target.scrollTop
      this.$refs.editorShow.scrollTop = scrollTop

      this.$refs.rowNumber.scrollTop = scrollTop
    }
  }
}
</script>

<style lang="less">
  @rowNumberWidth: 50px;
  @rowHeight: 25px;
  @padding:0px; // 编辑器外围padding
  .yy-parent-wrap {
    width: 100%;
    height: 100%;
    min-height: 200px;
    padding: @padding 0;
    box-sizing: border-box;
    position: relative;
    // border: 1px solid #a3e7db;
    overflow: auto;
    .yy-row-number-wrap {
      width: @rowNumberWidth;
      // min-height: 100%;
      // height: 100%;
      background-color: #3e3f42;
      padding: 10px;
      // overflow: auto;
      .yy-row-number {
        width: 100%;
        height: @rowHeight;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b4abab;
      }
    }
    .yy-editor {
      display: block;
      position: absolute;
      left: @rowNumberWidth;
      top: @padding;
      width: ~"calc(100% - @{rowNumberWidth})";
      // min-height: ~"calc(100% - @{padding} * 2)";
      min-height: 100%;
      // white-space: nowrap;
      font: 500 15px Consolas;
      outline: none;
      caret-color: red; // 光标颜色
      color: transparent;
      background-color: transparent;
      line-height: @rowHeight;
      box-sizing: border-box;
      padding-left: 10px;
      padding: 10px;
      border: 0;
      border-radius: 0;
      // overflow: visible;
      // overflow: auto;
      // white-space: pre;
      // overflow-y:visible;

      color: rgb(219, 190, 190);
      // border: 1px solid #ccc;

      &.yy-editor-show {
        // display: none;
        // top: 500px;
        z-index: -1;
        color: #dfe1e0;
        background-color: #23241f;
        white-space: pre;
        &>.yy-row {
          height: @rowHeight;
        }
      }
    }
  }
</style>
