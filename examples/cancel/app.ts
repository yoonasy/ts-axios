import axios, { Canceler } from '../../src/index'
import CancelToken from '../../src/cancel/CancelToken'

let source = CancelToken.source()

axios({
  method: 'get',
  url: '/cancel/get',
  cancelToken: source.token
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log('Request canceled', err.message, '===== 1')
})

setTimeout(() => {
  source.cancel('Request canceled by the user.')

  setTimeout(() => {
    axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(err => {
      console.log(err.message, '=====2')
    })
  })
}, 800)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 500)
