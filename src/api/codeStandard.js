import createApi from '/src/config/createApi.js'

/**
 * 代码标准数据列表
 */
export const apiListCodeStandard = createApi({
  url: '/codeStandard/list',
  method: 'post'
})
