<template>
  <div class="aside-wrap">
    <div class="user-wrap">
      <!-- <yy-image class="user-image" :url="userImage"></yy-image> -->
      <div class="user-name-wrap">
        <!-- <div class="short-name">{{ shortName }}</div>
        <div class="long-name">{{ longName }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // userImage: '', // 用户头像
      // longName: '',
      // shortName: ''
    }
  },
  computed: {
    ...mapState('user', ['shortName', 'longName', 'userImage'])
  },
  mounted () {
    // todo
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .aside-wrap {
    width: @asideWidth;
    height: 100%;
    // border: 0.5px solid rgb(37, 86, 245);
    border-right: 1px solid #ccc;

    .user-wrap {
      width: 90%;
      margin: 0 auto;
      display: flex;
      padding-top: 30px;

      .user-image {
        // img {
        //   max-width: 65px;
        //   max-height: 65px;

        // }
        max-width: 65px;
        max-height: 65px;
        border-radius: 50%;
      }

      .user-name-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 30px;

        .short-name {
          font-size: 16px;
          font-weight: 600;
        }

        .long-name {
          font-size: 15px;
          color: #696464;
        }
      }
    }
  }
</style>
