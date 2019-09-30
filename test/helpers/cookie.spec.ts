import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
  it('should read cookies', function() {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  it('should return null if cookie name is not exist', function() {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
