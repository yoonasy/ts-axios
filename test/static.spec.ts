import axios from '../src'

describe('static', () => {
  it('should support all', function(done) {
    let fulfilled = false

    axios.all([true, false]).then(arg => {
      fulfilled = arg[0]
    })

    setTimeout(() => {
      expect(fulfilled).toBeTruthy()
      done()
    }, 100)
  })

  it('should support spread', function(done) {
    let sum = 0
    let fulfilled = false
    let result: any

    axios
      .all([123, 456])
      .then(
        axios.spread((a, b) => {
          sum = a + b
          fulfilled = true
          return 'hello world'
        })
      )
      .then(res => {
        result = res
      })

    setTimeout(() => {
      expect(fulfilled).toBeTruthy()
      expect(sum).toBe(123 + 456)
      expect(result).toBe('hello world')
      done()
    }, 100)
  })
})
