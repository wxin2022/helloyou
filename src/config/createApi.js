import request from './request'

export default function (apiConfig) {
  apiConfig.method = apiConfig.method || 'post'
  const api = (data) => {
    apiConfig.data = data
    return request(apiConfig)
  }
  api.url = apiConfig.url
  return api
}
