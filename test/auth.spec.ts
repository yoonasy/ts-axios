import axios from '../src'
import { getAjaxRequest } from './helper'

describe('auth', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should accept HTTP Basic auth with username/password', function() {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })

  it('should fail to encode HTTP Basic auth credentials with non-Latin1 characters', function() {
    return axios('/foo', {
      auth: {
        username: 'Ala¥∆©˙din',
        password: 'open sesame'
      }
    })
      .then(() => {
        throw new Error(
          'Should not succeed  to make a HTTP Basic auth request with non-latin1 chars in credentials.'
        )
      })
      .catch(error => {
        expect(error.message).toContain('character')
      })
  })
})
