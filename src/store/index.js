import { createStore } from 'vuex'
import user from './user.js'

const state = {
  websiteName: 'ylang blog'
}

const getters = {
  getWebsiteName (state) {
    return state.websiteName
  }
}

const mutations = {
  setWebsiteName (state, newName) {
    state.websiteName = newName
  }
}

const actions = {
  test () {
    console.log(22222)
  }
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  }
})
