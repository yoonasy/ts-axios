import { AxiosRequestConfig, AxiosResponse } from '../../src/types'
import { createError } from '../../src/helpers/error'

describe('helpers::error', () => {
  it('should create an Error with message, config, code, request, response and isAxiosError', function() {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }

    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('SOMETHING')
    expect(error.request).toEqual(request)
    expect(error.response).toEqual(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
