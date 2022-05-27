<template>
  <!-- <div class="image-wrap" >

  </div> -->

  <img  :src="url" alt="加载中" @click="fullScreen = true">

  <!-- <div class="image-mask-wrap" v-if="fullScreen" @click.self="fullScreen = false">
    <img :src="url">

  </div> -->
</template>

<script>
export default {
  props: ['url'],
  data () {
    return {
      fullScreen: false
    }
  },
  methods: {
    showDetail () {
      this.fullScreen = true
    }
  }
}
</script>

<style lang="less">
  .image-wrap {
    border: 2px solid #ccc;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .image-mask-wrap {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #dadadaba;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
