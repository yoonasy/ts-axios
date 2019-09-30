import { flattenHeaders, parseHeaders, processHeaders } from '../../src/helpers/headers'

describe('helpers:header', () => {
  describe('parseHeaders', () => {
    it('should parse headers', function() {
      const parsed = parseHeaders(
        `
          Content-Type: application/json\r\n
          Connection: keep-alive\r\n
          Transfer-Encoding: chunked\r\n
          Date: Tue, 21 May 2019 09:23:44 GMT\r\n
          :aa\r\n
          key:
        `
      )

      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['transfer-encoding']).toBe('chunked')
      expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
      expect(parsed['transfer-encoding']).toBe('chunked')
      expect(parsed['key']).toBe('')
    })

    it('should return empty object if headers is empty string', function() {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('processHeaders', () => {
    it('should normalize Content-Type header name', function() {
      const headers: any = {
        'conTenT-Type': 'foo/bar',
        'Content-length': 1024
      }

      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('foo/bar')
      expect(headers['conTenT-Type']).toBeUndefined()
      expect(headers['Content-length']).toBe(1024)
    })

    it('should set Content-Type if not set and data is PlainObject', function() {
      const headers: any = {}
      processHeaders(headers, { a: 1 })
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })

    it('should not set Content-Type if not set and data is not PlainObject', function() {
      const headers: any = {}
      processHeaders(headers, new URLSearchParams('a=b'))
      expect(headers['Content-Type']).toBeUndefined()
    })

    it('should do nothing if headers is undefined or null', function() {
      expect(processHeaders(undefined, {})).toBeUndefined()
      expect(processHeaders(null, {})).toBeNull()
    })
  })

  describe('flattenHeaders', () => {
    it('should flatten the headers and include common headers', function() {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })

    it('should flatten the headers without common headers', function() {
      const headers = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'patch')).toEqual({
        Accept: 'application/json'
      })
    })

    it('should do nothing if headers is undefined or null', function() {
      expect(flattenHeaders(undefined, 'get')).toBeUndefined()
      expect(flattenHeaders(null, 'post')).toBeNull()
    })
  })
})
