import axios from '../../src/index'

const instance = axios.create({
  baseURL: 'https://img.mukewang.com'
})

instance.get('32164781648hfu2.jpg')

instance.get('https://img.mukewang.com/szing/21y89fh8390fjoe2qpjp3okej.jpg')
