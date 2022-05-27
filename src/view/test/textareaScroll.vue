<template>
  <div>
    <div class="editor-root">
      <div class="editor editor-show" ref="editorShow"></div>
      <textarea
        v-model="code"
        ref="editor"
        class="editor"
        @scroll="handleScroll"
        @keydown.tab.stop.prevent="tab2Space"
        @keydown.enter.stop.prevent="handleEnter"
        @input="handleInput"></textarea>

      <div class="row-number" ref="rowNumber">
        <div class="number" v-for="number in rowCount" :key="number">{{number}}</div>
      </div>
    </div>
  </div>
  <button @click="autoInput('function test() { if a> 10 a ++ }', 200)">自动输入</button>
</template>

<script>
export default {
  data () {
    return {
      code: ''
    }
  },
  computed: {
    rowCount () {
      if (!this.code) return 0

      return (this.code.match(/\n/g) || []).length + 1
    }
  },
  methods: {
    getCode () {
      return this.code
    },
    handleInput (e) {
      const code = e.target.value
      const html = this.$hljs.highlightAuto(code).value
      this.$refs.editorShow.innerHTML = html
    },
    handleScroll (e) {
      this.$refs.editorShow.scrollTop = e.target.scrollTop
      this.$refs.editorShow.scrollLeft = e.target.scrollLeft
      this.$refs.rowNumber.style.top = -e.target.scrollTop + 'px'
    },
    /**
       * 处理按下tab, 转换为输入2个空格
       */
    tab2Space (e) {
      // this.code = this.code + "  "
      document.execCommand('insertText', false, '  ')
    },
    handleEnter (e) {
      const element = e.target
      const index = this.getPosition(element)
      const code = element.value
      // console.log(index)
      // console.log(code[index - 1], code[index + 1])

      // 判断光标位置前后 是否为 {}， 是则插入两行
      if (
        (code[index - 1] === '{' && code[index] === '}') ||
          (code[index - 1] === '[' && code[index] === ']') ||
          (code[index - 1] === '(' && code[index] === ')')
      ) {
        // 获取所在位置上一行的缩进数量
        let preSpace = this.getLastRowSpace(element.value, index)
        // console.log(preSpace)

        // document.execCommand("insertText", false, '\n\n');

        let spaceStr = ''

        while (preSpace > 0) {
          spaceStr += ' '
          preSpace--
        }
        console.log(spaceStr.length)
        const content = '\n' + spaceStr + '  ' + '\n' + spaceStr

        // console.log(content)
        // console.log(...Array.from(content).map(char => char.charCodeAt()))

        // console.log(spaceStr.length)
        // 设置 右大括号的缩进
        // this.setPosition(element, index + 2)
        // document.execCommand("insertText", false, spaceStr);

        // spaceStr += ''

        // spaceStr += '  ' // 两个空格
        document.execCommand('insertText', false, content)
        this.setPosition(element, index + spaceStr.length + 3)
        return
      } else {
        let preSpace = this.getLastRowSpace(element.value, index)
        let spaceStr = ''
        while (preSpace > 0) {
          spaceStr += ' '
          preSpace--
        }
        // console.log(spaceStr.length)

        document.execCommand('insertText', false, '\n' + spaceStr)
      }

      // let allHeight = e.target.scrollHeight
      // let domHeight = e.target.offsetHeight
      // let scrollHeight =  e.target.scrollTop
      // console.log('实际高度', e.target.offsetHeight)
      // console.log('scrollHeight', e.target.scrollHeight)
      // console.log('scrollTop', e.target.scrollTop)
      // console.log('所有 - dom', allHeight - domHeight)

      // 使光标始终在 可视区域内, 曲线救国, 不好
      this.$refs.editor.blur()
      this.$refs.editor.focus()
    },
    // 获取光标位置
    getPosition (element) {
      let cursorPos = 0
      if (document.selection) { // IE
        var selectRange = document.selection.createRange()
        selectRange.moveStart('character', -element.value.length)
        cursorPos = selectRange.text.length
      } else if (element.selectionStart || element.selectionStart == '0') {
        cursorPos = element.selectionStart
      }
      return cursorPos
    },
    // 设置光标位置
    setPosition (ctrl, pos) {
      if (ctrl.setSelectionRange) {
        ctrl.focus()
        ctrl.setSelectionRange(pos, pos)
      } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    },
    /**
       * 获取上一行缩进数量
       * // 1111\n--1111()\n222222
       */
    getLastRowSpace (code, index) {
      // console.log(index)
      const lastRowStartIndex = code.lastIndexOf('\n', index - 1)
      if (lastRowStartIndex === -1) return 0
      // console.log(lastRowStartIndex)
      let num = 0
      for (let i = lastRowStartIndex + 1; i < index; i++) {
        // console.log(code[i], code[i] === ' ', code[i].charCodeAt())
        if (code[i] === ' ') {
          num++
        } else {
          return num
        }
      }
      return num
    },
    autoInput (code, initDelay) {
      code = `function test() {
          const a = 100;
          if(a> 10) {
            console.log(232)
          }
        }`

      initDelay = 200

      let delay = initDelay
      const element = this.$refs.editor

      const arr = code.split('')

      element.focus()

      for (const str of arr) {
        setTimeout(() => {
          document.execCommand('insertText', false, str)
        }, delay)
        delay = delay + initDelay
      }
    },
    /**
       * 设置缩进, 先获取上一行缩进，再设置该行应该的缩进
       */
    setSpace (position) {
      // 获取所在位置上一行的缩进数量
      let preSpace = this.getLastRowSpace(element.value, position)
      // console.log(preSpace)

      // document.execCommand("insertText", false, '\n\n');

      let spaceStr = ''
      while (preSpace > 0) {
        spaceStr += ' '
        preSpace--
      }

      // console.log(spaceStr.length)
      // 设置 右大括号的缩进
      this.setPosition(element, index + 2)
      document.execCommand('insertText', false, spaceStr)
    },
    /**
       * 设置内容
       */
    setContent (position, content) {
      this.setPosition(this.$refs.editor, index)
      document.execCommand('insertText', false, content)
    }
  }
}
</script>

<style scoped lang="less">
  @rowNumberWidth: 50px;
  @lineHeight: 24px;

  .editor-root {
    position: relative;
    width: 100%;
    height: 250px;
    // border: 1px solid red;
    box-sizing: border-box;
    resize: both;
    overflow: hidden;

    .editor {
      position: absolute;
      box-sizing: border-box;
      width: ~"calc(100% - @{rowNumberWidth})";
      height: 100%;
      font: 500 15px Consolas;
      line-height: @lineHeight;
      top: 0;
      right:0;
      background-color: transparent;
      overflow: auto;
      outline: none;
      color: transparent;
      background-color: transparent;
      caret-color: red; // 光标颜色
      resize: none;
      white-space: pre;
      margin: 0;
      padding: 10px;
      border: none;
      border-radius: 0;

      // background-color: #23241f;
      // color: #fff;

      &-show {
        color: rgb(240, 221, 221);
        background-color: #23241f;

        // top: 300px;
      }
    }

    .row-number {
      position: absolute;
      top: 0;
      left:0;
      min-height: 100%;
      width: @rowNumberWidth;
      background-color: #23241f;
      box-sizing: border-box;
      border-right: 0.5px solid #484747;
      padding: 10px 0;
      overflow: visible;
      .number {
        height: @lineHeight;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #958e8e;
      }
    }
  }
</style>
