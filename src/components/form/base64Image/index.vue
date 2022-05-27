<template>
  <!-- 组件， 选择图片，获取其 base64 -->
  <div class="image-wrap">
    <input class="hidden" type="file" @change="handleSelectImage">

    <img v-if="modelValue" class="show-image" :src="modelValue">
    <template v-else >选择图片</template>
  </div>
</template>

<script>
import { getBase64ByImage } from '/src/util/convert.js'

export default {
  props: {
    modelValue: {
      type: String
    }
  },
  methods: {
    async handleSelectImage (e) {
      // ev.target.files
      const image = e.target.files[0]
      const dataURL = await getBase64ByImage(image)
      this.$emit('update:modelValue', dataURL)
    }
  }
}
</script>

<style lang="less" scoped>
  .image-wrap {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    align-items: center;
    justify-content: center;
    position: relative;

    .hidden {
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0;
    }

    .show-image {
      width: 100%;
      max-height: 100%;
    }
  }
</style>
