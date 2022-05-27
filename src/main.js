import { createApp } from 'vue'
import App from './App.vue'
import store from '/src/store/index.js'
import defineGlobalComponent from '/src/components/index.js'
import router from '/src/router/index.js'
import hljs from 'highlight.js/lib/common'
import baseMixin from './mixins'
import('/src/style/reset.css')
import('/src/style/base.less')
import('/src/style/theme.less')
import('highlight.js/styles/monokai-sublime.css')

// import hljs from 'highlight.js';
const app = createApp(App)

// 定义 hljs 为全局变量
app.config.globalProperties.$hljs = hljs
app.mixin(baseMixin)
app.use(router)
app.use(store)

// 引入自定义的全局组件
defineGlobalComponent(app)
app.mount('#app')
