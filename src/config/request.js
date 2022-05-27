/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'

axios.defaults.baseURL = '/api'

// 请求超时时间
axios.defaults.timeout = 10000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // token && (config.headers.Authorization = token);
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const baseResult = response.data
      if (baseResult.code === 1) {
        return Promise.resolve(baseResult.data)
      }
      // 提示错误信息
      console.log('错误提示：', baseResult.msg)
      return Promise.reject(new Error(baseResult.msg))
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      return Promise.reject(error.response)
    }
  }
)

export default axios
