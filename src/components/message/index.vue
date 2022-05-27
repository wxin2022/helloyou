<template>
  <div class="message-wrap">
    <div
      class="message-item move"
      v-for="(message, index) in messageList"
      :key="index">
      <div class="message-icon icon" :class="message.icon"></div>
      <div class="message-text">{{message.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // visible: false,
      // text: '', // 文本，
      // icon: '', // 字体图标class,
      messageList: [], // 消息列表 {text, icon}
      marginHeight: 20 // 间距高度
    }
  },
  methods: {
    success (text) {
      this.show(text, 'success')
    },
    show (text = '成功', icon = 'info') {
      const messageObject = {
        text,
        icon
      }
      this.messageList.push(messageObject)
      setTimeout(() => {
        this.close(messageObject)
      }, 5000)
    },
    close (messageObject) {
      this.messageList.splice(this.messageList.indexOf(messageObject), 1)
    }
  }
}
</script>

<style scoped lang="less">
  .message-wrap {
    position: fixed;
    width: 100vw;
    height: 0;
    top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .message-item {
      margin-bottom: 20px;
      background-color: #fff;
      padding: 12px 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      border-radius: 4px;
      animation-name: MessageMove;
      animation-duration: 0.3s;
      // &:first-child {

      // }
      &.move {
        animation-name: MessageMove;
        animation-duration: 0.3s;
      }
    }
  }

  @keyframes MessageMove {
    0% {
      max-height: 150px;
      padding: 8px;
      opacity: 1;
    }

    100% {
      max-height: 0;
      padding: 0;
      opacity: 0;
    }
  }

</style>
