import axios, { AxiosRequestConfig } from '../../src/index'
import qs from 'qs'

// Axios.request.use(config => {
//   config.headers.test += '1'
//   return config
// })
// Axios.request.use(config => {
//   config.headers.test += '2'
//   return config
// })
// Axios.request.use(config => {
//   config.headers.test += '3'
//   return config
// })


axios.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config.headers)
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/config/post',
  method: 'post',
  headers: {
    test: ''
  },
  data: qs.stringify({ a: 1 })
}).then((res) => {
  console.log(res.data)
})
