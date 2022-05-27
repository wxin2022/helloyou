<template>
  <div>
    <div class="wrap">

      <div class="text-wrap">
        <textarea @input="handleInput"></textarea>
      </div>

      <div class="show-wrap">
        <div class="rowNumber"></div>
        <div class="code-wrap" ref="show"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleInput (e) {
      const value = e.target.value
      this.$refs.show.innerText = value
    }
  }
}
</script>

<style scoped lang="less">
  @rowNumberWidth: 50px;

  .wrap {
    border: 1px solid red;
    width: 600px;
    height: 100px;
    margin: 30px;
    position: relative;
    display: flex;
    justify-content: flex-end;

    overflow: auto;
    .text-wrap {
      width: 100%;
      height: 100%;
      // overflow: visible;
    }
    textarea {
      box-sizing: border-box;
      width: 100%;
      // min-height: 100%;
      height: 100%;
      // height: inherit;
      width: ~"calc(100% - @{rowNumberWidth})";
      float: right;
      position: absolute;
      // overflow: hidden;
      resize: none;

      top: 0;
      right:0;

      z-index: 999;

      color: transparent;
      background-color: transparent;

      // color: rgb(172, 65, 65)
    }

    .show-wrap {
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      background-color: #f5f5f5;

      display: flex;
      flex-wrap: nowrap;
      .rowNumber {
        width: @rowNumberWidth;
      }
      .code-wrap {
        flex-grow: 1;
        background-color: #aef599;
        color: rgb(211, 82, 32);
      }
    }
  }
</style>
