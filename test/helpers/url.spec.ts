import { buildURL, combineURL, isAbsoluteURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    it('should support null params', function() {
      expect(buildURL('/foo')).toBe('/foo')
    })

    it('should support params', function() {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })

    it('should ignore if some param value is null', function() {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          baz: null
        })
      ).toBe('/foo?foo=bar')
    })

    it('should ignore if the only param value is null', function() {
      expect(
        buildURL('/foo', {
          baz: null
        })
      ).toBe('/foo')
    })

    it('should support object params', function() {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })

    it('should support data params', function() {
      const date = new Date()

      expect(
        buildURL('/foo', {
          date: date
        })
      ).toBe('/foo?date=' + date.toISOString())
    })

    it('should support array params', function() {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    it('should support special char params', function() {
      expect(
        buildURL('/foo', {
          foo: '@:$, '
        })
      ).toBe('/foo?foo=@:$,+')
    })

    it('should support existing params', function() {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    it('should correct discard url hash mark', function() {
      expect(
        buildURL('/foo?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/foo?foo=bar&query=baz')
    })

    it('should use serializer if provided', function() {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })

      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    it('should support URLSearchParams', function() {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })

  describe('isAbsoluteURL', () => {
    it('should return true if URL begins with valid scheme name', function() {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })

    it('should return false if URL begins with invalid scheme name', function() {
      expect(isAbsoluteURL('123://example.com/')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com/')).toBeFalsy()
    })

    it('should return true if URL is protocol-relative', function() {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    it('should return false if URL is relative', function() {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    it('should combine URL', function() {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })

    it('should remove duplicate slashes', function() {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })

    it('should insert missing slash', function() {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })

    it('should not insert slash when relative url missing/empty', function() {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })

    it('should allow a single slash for relative url', function() {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })

  describe('isURLSameOrigin', () => {
    it('should detect same origin', function() {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    it('should detect different origin', function() {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})
