<template>
  <!-- 颜色面板 -->
  <div>
    <div class="color-panel"></div>

    <div class="color-line"></div>

    <div class="box1"></div>

    <div class="box2"></div>

    <div class="box3">22</div>
  </div>
</template>

<script>
/**
 * 16 进制颜色转为 255
 */
function color16Convert255(hexColor) {
  if (!hexColor) {
    throw new Error('颜色为空！')
  }

  hexColor = hexColor.length === 3 ? hexColor + hexColor : hexColor
  console.log(hexColor)
  const hexArray = [hexColor[0] + hexColor[1], hexColor[2] + hexColor[3], hexColor[4] + hexColor[5]]
  return [parseInt(hexArray[0], 16), parseInt(hexArray[1], 16), parseInt(hexArray[2], 16)]
}

let r = color16Convert255('fff')
console.log(r)
export default {
  setup() {
    // TODO
  },
  created() {
    const colorArray = []
    // 
  },
}
</script>

<style scoped lang="less">
  .color-panel {
    width: 300px;
    height: 300px;
    background: linear-gradient(to right top, #000, #fff, #ff0000);
  }

  .color-line {
    width: 300px;
    height: 30px;
    margin-top: 20px;
    background: linear-gradient(to right,#f00, #f0f, #00f,#0ff, #0f0, #ff0,  #f00);
  }

  .box1 {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    float:left;
  }

  .box2 {
    width: 100px;
    height: 100px;
    border: 1px solid #00f;
  }

  .box3 {
    width: 50px;
    height: 50px;
    background: rgb(250, 148, 148);
  }
</style>
