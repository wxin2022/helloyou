<template>
  <div class="wrap">
    <yy-form-item label="活动编号">
      <yy-input v-model="code" @input="createQRCode"></yy-input>
    </yy-form-item>
    <!-- <yy-button @click="createQRCode">生成二维码</yy-button> -->
    <canvas class="qr-code" ref="qrCodeContainer"></canvas>
    

    <!-- <yy-button @click="testMixin">测试</yy-button>
    <yy-button @click="testRequest">测试testRequest</yy-button>
    <span>{{getGroupName}}</span>
    {{getCode}} -->
  <!-- <audio id="bgmMusic" controls :src="audioUrl" autoplay="autoplay" loop="loop" preload="auto"></audio> -->
  </div>
</template>

<script>
import QRCode from 'qrcode'
import axios from 'axios'
window.process = {}
window.process.env = {}
// import pdf from 'vue-pdf'
const minxinA = {
  methods: {
    testMixin() {
      console.log('A mixin')
    }
  }
}

const minxinB = {
  methods: {
    testMixin() {
      console.log('B mixin')
    }
  }
}
export default {
  mixins: [minxinA, minxinB],
  // components: {
  //   pdf: pdf
  // },
  data() {
    return {
      code: '',
      user: {
        group: {
          name: 1234
        }
      },
      
    }
  },
  computed: {
    getGroupName() {
      console.log('执行computed')
      return this.getCode + this.user.group.name
    },
    getCode() {
      return this.getGroupName + this.code
    }
  },
  methods: {
    testComputed() {
      console.log(2)
      this.user = {
        group: {
          name: 2223
        }
      }
    },
    createQRCode() {
      if (!this.code) {
        return alert('请输入活动编码')
      }
      const canvas = this.$refs.qrCodeContainer
      const text = `https://open.weixin.qq.com/sns/getexpappinfo?appid=wxe262dde30e125056&path=pages%2Findex%2Findex.html%3FconfigCode%3D${this.code}#wechat-redirect`
      QRCode.toCanvas(canvas, text, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
    },
    testRequest() {
      let d = {
        name: 555
      }

      const url = ''
      axios.request(url, {
        url,
        method: 'post',
        data: {
          namet: 55
        },
        // application/x-www-form-urlencoded
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => {
        console.log(data)
      })
    }
    // testMixin() {
    //   console.log('自己')
    // }
  }
}
</script>

<style scoped lang="less">
  .wrap {
    margin: 30px 50px;
  }
  .qr-code {
    display: block;
    width: 500px;
    height: 500px;
    margin: 20px 50px;
  }
</style>
