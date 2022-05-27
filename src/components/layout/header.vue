<template>
  <div class="header-wrap">
    <yy-button
      type="text"
      v-for="menu in menuList"
      :key="menu.path"
      @click="goRoute(menu)">
      {{menu.title}}
    </yy-button>

    <div class="font-wrap">
      <yy-select v-model="font" @change="setFont">
        <yy-option v-for="font in fontList" :value="font" :key="font">{{font}}</yy-option>
      </yy-select>
    </div>
  </div>
</template>

<script>
import { routeList } from '/src/router/index.js'
import fontList from '/src/util/fontFamily.js'

export default {
  data () {
    return {
      font: '',
      menuList: [],
      currentFont: '',
      fontList: fontList
    }
  },
  created () {
    this.menuList = this.getMenuList()
  },
  methods: {
    getMenuList () {
      if (routeList[0] && routeList[0].children) {
        return routeList[0].children.reduce((menuList, route) => {
          if (route.meta && route.meta.isMenu) {
            menuList.push({
              title: route.meta.title || '未命名',
              path: route.path
            })
          }
          return menuList
        }, [])
      }
    },
    goRoute (menu) {
      this.$router.push(menu.path)
    },
    setFont (font) {
      document.body.style.fontFamily = font
    }
  }
}
</script>

<style lang="less" scoped>
  .header-wrap {
    width: 100%;
    height: 100%;
    border: 0.5px solid #ccc;

    .font-wrap {
      float: right;
      padding: 20px;
    }
  }

</style>
