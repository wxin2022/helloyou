import { apiGetRandomHero } from '/src/api/hero.js'

const state = {
  id: '',
  longName: '', // 长名称
  shortName: '', // 短名称
  userImage: '' // 用户图片
}

const getters = {
}

const mutations = {
}

const actions = {
  init (context) {
    // 先从本地读取
    // let userId = localStorage.getItem('userId')
    // // if (!userId)

    context.dispatch('getRandomUser')
  },
  getRandomUser ({ state }) {
    apiGetRandomHero().then(hero => {
      state.longName = hero.longName
      state.shortName = hero.shortName
      state.userImage = hero.image
    })
  }
}

// 特别注意：
// 模块中的store不要直接导出 createStore后的对象，直接导出即可，否则无法访问action和mutations, state能访问
// export default createStore({})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
