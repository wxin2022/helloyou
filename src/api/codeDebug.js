/**
 * 保存打印内容
 */
import createApi from '/src/config/createApi.js'

/**
 * 保存打印数据
 */
export const apiSaveCode = createApi({
  url: '/codeDebug/save',
  method: 'post'
})

/**
 * 打印数据分页列表
 */
export const apiListCode = createApi({
  url: '/codeDebug/page',
  method: 'post'
})
