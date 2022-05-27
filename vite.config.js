import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from '@rollup/plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 全局引入 less文件
          hack: `true; @import (reference) "${path.resolve('src/style/theme.less')}";`
        },
        javascriptEnabled: true
      }
    }
  },
  plugins: [vue(), vueJsx({}), eslint()],
  server: {
    port: 80,
    host: '0.0.0.0',
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'http://122.51.146.188:8088', // 后端服务实际地址
        changeOrigin: true, // 开启代理
        rewrite: (path) => path.replace(/^\/api/, '/')
      }
    }
  }
})
