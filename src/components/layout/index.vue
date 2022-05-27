<template>
  <div class="layout-wrap">
    <div class="header">
      <Header></Header>
    </div>
    <div class="center">
      <div class="aside">
        <Aside></Aside>
      </div>
      <div class="page-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'
import Aside from './aside.vue'

export default {
  components: {
    Header,
    Aside
  }
}
</script>

<style lang="less" scoped>
  .layout-wrap {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .header {
      height: 80px;
      flex-grow: 0;
    }
    .center {
      width: 100%;
      flex-grow: 1;
      display: flex;
      .aside {
        width: @asideWidth;
        flex-grow: 0;
      }
      .page-content {
        flex-grow: 1;
      }
    }
  }
</style>
