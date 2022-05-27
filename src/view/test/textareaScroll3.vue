<template>
  <div>
    <div class="editor-root">
      <textarea class="editor common" ref="editor" @input="handleInput" @scroll="handleScroll"></textarea>

      <div class="show-wrap" ref="root">
        <div class="row-number-wrap"></div>
        <div class="editor-show common" ref="editorShow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleInput (e) {
      const code = e.target.value

      console.log(code)

      console.log(...Array.from(code).map(char => char.charCodeAt()))

      // let html = this.$hljs.highlightAuto(code).value

      this.$refs.editorShow.innerHTML = code

      // this.$refs.root.scrollTop = e.target.scrollTop
    },
    handleScroll (e) {
      const scrollTop = e.target.scrollTop
      // this.$refs.editorShow.style.top = -scrollTop + 'px'
      // console.log(scrollTop)
      // this.$refs.root.style.top = scrollTop + 'px'

      this.$refs.root.scrollTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped lang="less">
  @rowNumberWidth: 50px;
  @lineHeight: 26px;

  .editor-root {
    width: 100%;
    height: 100%;
    height: 150px;
    position: relative;
    overflow: auto;

    // overflow: auto;

    .common {
      // font属性会对font-style;font-variant;font-weight;font-size/line-height;font-family这几个属性进行设置
      // line-height的属性必须在font的下面，否则无效！

      font: 500 15px Consolas;
      line-height: @lineHeight;
      box-sizing: border-box;
      padding: 0;
      border: 0;
      margin: 0;
      white-space: pre;
      // overflow: auto;
    }

    .editor {
      position: absolute;
      width: ~"calc(100% - @{rowNumberWidth})";
      height: 100%;
      top:0;
      right:0;
      z-index: 999;
      color: transparent;
      outline: none;
      background-color: transparent;
      caret-color: red; // 光标颜色
      resize: none;
      color: rgba(133, 58, 231, 0.9);
      // background-color: #ccc;
    }

    .show-wrap {
      // position: relative;
      overflow: auto;
      display: flex;
      align-items: stretch;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      line-height:  @lineHeight;

      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      // overflow: visible;
      overflow: auto;

      background-color: #23241f;

    }

    .row-number-wrap {
      width: @rowNumberWidth;
      min-height: 100%;
      height: auto;
      flex-grow: 0;
      flex-shrink: 0;
      box-sizing: border-box;

    }
    .editor-show {
      // z-index: 0;
      flex-grow: 1;
      color: #fff;
      box-sizing: border-box;
      white-space: pre;
      // background-color: rgb(124, 219, 243);
    }
  }
</style>
