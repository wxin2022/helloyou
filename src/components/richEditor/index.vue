<template>
  <!-- 富文本编辑器 -->
  <div class="rich-editor-wrap">
    <div class="editor-menu-wrap">
      <yy-space>
        <yy-button @click="execCommand('bold')">标题</yy-button>
        <yy-button @click="getPosition">文本</yy-button>
        <yy-button>代码</yy-button>
        <yy-button>加粗</yy-button>
        <yy-button @click="test">测试</yy-button>
        <yy-button @click="test2">测试2</yy-button>
        <!-- <yy-button>
          <input type="file" @change="insertImage">
        </yy-button> -->
      </yy-space>
    </div>
    <!--  @keydown.enter.stop.prevent="handleEnter" -->
    <div
      class="editor-content"
      contenteditable
      ref="content"
      @blur="handleFocus"
     >
      <p><br></p>
    </div>
  </div>
</template>

<script>
import { getBase64ByImage } from '/src/util/convert.js'

export default {
  setup() {
    // TODO
  },
  methods: {
    /**
     * 执行命令
     */
    execCommand(cmd) {
      // document.execCommand('bold', false, null)

      let s = window.getSelection()
      console.log(s)
      let s2 = window.getSelection().getRangeAt(0)
      console.log(s2)

      // focusNode , 可能是， 可能是文本节点

      s.focusNode.parentNode.style.fontWeight = 'bold'
      s.focusNode.parentNode.style.fontSize = '18px'
    },
    insertImage(e) {
      // content
      //  document.execCommand("", true);
      console.log(e.target.files[0])
      let file = e.target.files[0]
      getBase64ByImage(file).then(base64Str => {
        let imgElement = document.createElement('img')
        imgElement.src = base64Str
        this.$refs.content.append(imgElement)
      })
    },
    handleEnter() {
      // &ZeroWidthSpace;
      document.execCommand('insertText', false, '\n')
    },
    // 获取光标位置
    getPosition () {
      let element = this.$refs.content

      let cursorPos = 0
      if (document.selection) { // IE
        var selectRange = document.selection.createRange()
        selectRange.moveStart('character', -element.value.length)
        cursorPos = selectRange.text.length
      } else if (element.selectionStart || element.selectionStart === '0') {
        console.log(222)
        cursorPos = element.selectionStart
      }
      console.log(cursorPos)
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
    handleFocus() {
      console.log('获得焦点')
      this.getPosition()
    },
    test() {
      console.log(document.selection)
      let s = window.getSelection()
      console.log(s)
      // getSelection 对象
      /*  sss               后两个ss
      anchorNode: node,     -   , 选中开始的节点
      anchorOffset: 3,      3     位移，从1开始， +1 表示开始选中位置
      baseNode, node,       -
      baseOffset: 3,        3
      extentNode: node,      -   选中结束的节点
      extentOffset: 0,      0    选中结束的位置
      focusNode: text,
      focusOffset: 0,
      isCollapsed: false,
      rangeCount: 1,        1
      type: Range,
      */
      let s2 = window.getSelection().getRangeAt(0)
      console.log(s2)
    },
    test2() {
      window.getSelection().getRangeAt(0).moveStart('character', 2)
    }
  }
}
</script>

<style lang="less">
  .rich-editor-wrap {
    .editor-menu-wrap {
      margin-bottom: 20px;
    }

    .editor-content {
      width: 500px;
      height: 500px;
      border: 1px solid #ccc;
      white-space: pre;
      font-size: 14px;
      letter-spacing: 1px;
      padding: 10px;
    }
  }
</style>
