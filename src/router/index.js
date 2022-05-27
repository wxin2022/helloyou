import { createRouter, createWebHistory } from 'vue-router'

import Layout from '/src/components/layout/index.vue'

export const routeList = [{
  path: '/',
  redirect: '/print',
  component: Layout,
  children: [{
    path: '/demo',
    name: 'demo',
    component: () => import('/src/view/demo.vue')
  }, {
    path: '/print',
    component: () => import('/src/view/printCode/input.vue'),
    meta: {
      isMenu: true,
      title: '写代码'
    }
  },
  // {
  //   path: '/print',
  //   component: () => import('/src/view/printCode/input.vue')
  // },

  {
    path: '/codeStandard',
    component: () => import('/src/view/codeStandard/index.vue'),
    meta: {
      isMenu: true,
      title: '代码优化'
    }
  },
  {
    path: '/target',
    component: () => import('/src/view/target/index.vue'),
    meta: {
      isMenu: true,
      title: '备忘录'
    }
  },
  // {
  //   path: '/word',
  //   component: () => import('/src/view/word/index.vue'),
  //   meta: {
  //     isMenu: true,
  //     title: '常用名称'
  //   }
  // }, {
  //   path: '/englishWord',
  //   component: () => import('/src/view/englishWord/index.vue'),
  //   meta: {
  //     isMenu: true,
  //     title: '单词记录'
  //   }
  // }, 
  {
    path: '/hero',
    component: () => import('/src/view/hero/index.vue'),
    meta: {
      isMenu: true,
      title: '人物'
    }
  }, {
    path: '/random',
    component: () => import('/src/view/random/index.vue'),
    meta: {
      isMenu: true,
      title: '随机数据'
    }
  }, {
    path: '/color',
    component: () => import('/src/view/colorPanel/index.vue'),
    meta: {
      isMenu: true,
      title: '颜色'
    }
  }, {
    path: '/qrcode',
    component: () => import('/src/view/xlgQRCode/index.vue'),
    meta: {
      isMenu: true,
      title: '二维码'
    }
  }]
},
{
  path: '/desc1',
  component: () => import('/src/view/desc/xiaolinggouPrivacy.vue')
},
{
  path: '/desc2',
  component: () => import('/src/view/desc/xiaolinggouService.vue')
},
{
  path: '/desc3',
  component: () => import('/src/view/desc/xiaolinggouPrivacy1.vue')
},
{
  path: '/scroll',
  component: () => import('/src/view/test/textareaScroll.vue')
},
{
  path: '/textDiff',
  component: () => import('/src/view/textDiff/index.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeList
})

export default router
