import createApi from '/src/config/createApi.js'

/**
 * 随机获取一个英雄
 */
export const apiGetRandomHero = createApi({
  url: '/hero/getRandomHero'
})
